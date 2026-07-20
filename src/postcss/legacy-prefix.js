const fs = require('fs');
const path = require('path');

const DEFAULT_EXTENSIONS = new Set([
  '.erb',
  '.html',
  '.js',
  '.jsx',
  '.rb',
  '.slim',
  '.css',
  '.ts',
  '.tsx'
]);

function splitVariants(token) {
  const parts = [];
  let start = 0;
  let bracketDepth = 0;
  let parenDepth = 0;

  for (let index = 0; index < token.length; index += 1) {
    const char = token[index];

    if (char === '[') bracketDepth += 1;
    if (char === ']' && bracketDepth > 0) bracketDepth -= 1;
    if (char === '(') parenDepth += 1;
    if (char === ')' && parenDepth > 0) parenDepth -= 1;

    if (char === ':' && bracketDepth === 0 && parenDepth === 0) {
      parts.push(token.slice(start, index));
      start = index + 1;
    }
  }

  parts.push(token.slice(start));
  return parts;
}

function legacyToVariantCandidate(token) {
  const parts = splitVariants(token);
  let base = parts[parts.length - 1];
  const variants = parts.slice(0, -1);

  if (base.startsWith('!elv-')) {
    base = `!${base.slice(5)}`;
  } else if (base.startsWith('-elv-')) {
    base = `-${base.slice(5)}`;
  } else if (base.startsWith('elv-')) {
    base = base.slice(4);
  } else {
    return null;
  }

  return ['elv', ...variants, base].join(':');
}

function escapeString(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function hasInvalidCharsOutsideBrackets(token) {
  let bracketDepth = 0;

  for (const char of token) {
    if (char === '[') bracketDepth += 1;
    if (char === ']' && bracketDepth > 0) bracketDepth -= 1;

    if (bracketDepth === 0 && /[()=#]/.test(char)) {
      return true;
    }
  }

  return false;
}

function escapeClassName(value) {
  return value.replace(/(^-?[0-9])|[^a-zA-Z0-9_-]/g, (char, leadingDigit) => {
    if (leadingDigit) {
      if (char.startsWith('-')) {
        return `-\\${char.charCodeAt(1).toString(16)} `;
      }

      return `\\${char.charCodeAt(0).toString(16)} `;
    }

    return `\\${char}`;
  });
}

function splitOutsideBrackets(text, delimiters) {
  const parts = [];
  let current = '';
  let bracketDepth = 0;
  let parenDepth = 0;

  for (const char of text) {
    if (char === '[') bracketDepth += 1;
    if (char === ']' && bracketDepth > 0) bracketDepth -= 1;
    if (char === '(') parenDepth += 1;
    if (char === ')' && parenDepth > 0) parenDepth -= 1;

    if (bracketDepth === 0 && parenDepth === 0 && delimiters.includes(char)) {
      if (current) parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current) parts.push(current);
  return parts;
}

const PERCENT_LITERAL_SIGIL = /^%[wiWI][([{<]$/;

function tokenizeContent(text) {
  const tokens = [];
  let current = '';
  let bracketDepth = 0;
  const delimiters = /[\s`"'<>]/;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    // Ruby array literals (%w(...), %i[...], %W{...}, ...) otherwise glue
    // their sigil onto the first element when the source has no whitespace
    // right after the opening delimiter, e.g. `%w(elv-flex elv-block)`. Treat
    // the sigil itself as its own token so the array contents tokenize
    // normally.
    if (bracketDepth === 0 && char === '%' && PERCENT_LITERAL_SIGIL.test(text.slice(index, index + 3))) {
      if (current) tokens.push(current);
      current = '';
      tokens.push(text.slice(index, index + 3));
      index += 2;
      continue;
    }

    if (char === '[') bracketDepth += 1;
    if (char === ']' && bracketDepth > 0) bracketDepth -= 1;

    if (bracketDepth === 0 && delimiters.test(char)) {
      if (current) tokens.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current) tokens.push(current);
  return tokens;
}

function walkFiles(dir, extensions, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, extensions, files);
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripStrayDelimiters(token) {
  let start = 0;
  while (start < token.length && '({,'.includes(token[start])) start += 1;

  let end = token.length;
  while (end > start) {
    const char = token[end - 1];

    if (char === ']') {
      // Only strip a trailing ] when it isn't the real closer for an earlier
      // [ in this token (e.g. a Tailwind arbitrary value like elv-w-[355px]
      // must keep its ]; a stray one from a %w[...] sigil must not).
      const remaining = token.slice(start, end - 1);
      const opens = (remaining.match(/\[/g) || []).length;
      const closes = (remaining.match(/\]/g) || []).length;
      if (opens > closes) break;
      end -= 1;
      continue;
    }

    if (')};,>'.includes(char)) {
      end -= 1;
      continue;
    }

    break;
  }

  return token.slice(start, end);
}

function extractLegacyCandidates({ cwd, directories = [], extensions = DEFAULT_EXTENSIONS }) {
  const candidates = new Map();
  const roots = directories.map((dir) => path.resolve(cwd, dir));
  const files = roots.flatMap((root) => walkFiles(root, extensions));
  const tokenPattern = /^(?:[!a-zA-Z0-9_[\]=&#%/()~.,':;|*@^+-]+:)*!?-?elv-[!a-zA-Z0-9_[\]=&#%/()~.,':;|*@^+-]+$/;

  for (const file of files) {
    const contents = fs.readFileSync(file, 'utf8');
    const tokens = tokenizeContent(contents);

    for (const rawToken of tokens) {
      const cleaned = stripStrayDelimiters(rawToken);
      const legacyTokens = splitOutsideBrackets(cleaned, ['.']);

      for (const legacy of legacyTokens) {
        if (hasInvalidCharsOutsideBrackets(legacy)) continue;
        if (!tokenPattern.test(legacy)) continue;

        const modern = legacyToVariantCandidate(legacy);
        if (modern) candidates.set(modern, legacy);
      }
    }
  }

  return candidates;
}

function addLegacySources(options = {}) {
  const cwd = options.cwd || process.cwd();
  const directories = options.directories || [];
  const extensions = options.extensions || DEFAULT_EXTENSIONS;

  return {
    postcssPlugin: 'elevate-legacy-prefix-sources',
    Once(root, { result }) {
      const css = root.toString();
      if (!css.includes('tailwindcss') && !css.includes('@config')) return;

      const candidates = [...extractLegacyCandidates({ ...options, cwd }).keys()].sort();
      const chunkSize = 150;

      for (let index = candidates.length; index > 0; index -= chunkSize) {
        const chunk = candidates.slice(Math.max(index - chunkSize, 0), index);
        root.prepend({
          type: 'atrule',
          name: 'source',
          params: `inline("${escapeString(chunk.join(' '))}")`
        });
      }

      // The classes above are injected as *inline* @source candidates, which
      // have no backing file for a bundler's watcher or Tailwind's own
      // mtime-based rebuild cache to track. Registering each scanned file as
      // a PostCSS `dependency` message (matching the convention
      // @tailwindcss/postcss uses for its own @source scanning) fixes dev
      // rebuilds: without it, editing a scanned file never invalidates this
      // CSS and new/changed elv- classes only appear after a full restart.
      const roots = directories.map((dir) => path.resolve(cwd, dir));
      const files = roots.flatMap((dir) => walkFiles(dir, extensions));

      for (const file of files) {
        result.messages.push({
          type: 'dependency',
          plugin: 'elevate-legacy-prefix-sources',
          file,
          parent: result.opts.from
        });
      }
    }
  };
}

function aliasLegacySelectors(options = {}) {
  const cwd = options.cwd || process.cwd();

  return {
    postcssPlugin: 'elevate-legacy-prefix-selector-aliases',
    OnceExit(root) {
      const candidates = extractLegacyCandidates({ ...options, cwd });
      const replacements = [...candidates.entries()].map(([modern, legacy]) => [
        `.${escapeClassName(modern)}`,
        `.${escapeClassName(legacy)}`
      ]);

      root.walkRules((rule) => {
        let selector = rule.selector;

        for (const [modernSelector, legacySelector] of replacements) {
          selector = selector.split(modernSelector).join(legacySelector);
        }

        rule.selector = selector;
      });
    }
  };
}

function unwrapComponentLayers() {
  return {
    postcssPlugin: 'elevate-unwrap-component-layers',
    OnceExit(root) {
      root.walkAtRules('layer', (atRule) => {
        if (atRule.params.trim() !== 'components' || !atRule.nodes) return;

        atRule.replaceWith(...atRule.nodes);
      });
    }
  };
}

module.exports = {
  addLegacySources,
  aliasLegacySelectors,
  extractLegacyCandidates,
  legacyToVariantCandidate,
  unwrapComponentLayers
};

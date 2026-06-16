const fs = require('fs');
const path = require('path');

const DEFAULT_EXTENSIONS = new Set(['.erb', '.html', '.js', '.rb', '.slim', '.css']);

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

function extractLegacyCandidates({ cwd, directories = [], extensions = DEFAULT_EXTENSIONS }) {
  const candidates = new Map();
  const roots = directories.map((dir) => path.resolve(cwd, dir));
  const files = roots.flatMap((root) => walkFiles(root, extensions));
  const tokenPattern = /^(?:[!a-zA-Z0-9_[\]=&#%/()~-]+:)*!?-?elv-[!a-zA-Z0-9_[\]=&#%/()~-]+$/;

  for (const file of files) {
    const contents = fs.readFileSync(file, 'utf8');
    const tokens = contents.split(/[\s`"',<>]+/);

    for (const rawToken of tokens) {
      const legacyTokens = rawToken
        .replace(/^[({]+|[)};]+$/g, '')
        .split('.')
        .filter(Boolean);

      for (const legacy of legacyTokens) {
        if (/[()=#]/.test(legacy)) continue;
        if (!tokenPattern.test(legacy) || legacy.includes('[')) continue;

        const modern = legacyToVariantCandidate(legacy);
        if (modern) candidates.set(modern, legacy);
      }
    }
  }

  return candidates;
}

function addLegacySources(options = {}) {
  const cwd = options.cwd || process.cwd();

  return {
    postcssPlugin: 'elevate-legacy-prefix-sources',
    Once(root) {
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
  legacyToVariantCandidate,
  unwrapComponentLayers
};

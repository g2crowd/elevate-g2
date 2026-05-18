// examples/token-editor.js
const TOKENS = [
  // Backgrounds
  { name: '--elv-bg-primary-5', group: 'Backgrounds', light: '#f5f4fb', dark: '#1a1730' },
  { name: '--elv-bg-primary-10', group: 'Backgrounds', light: '#f2f0f9', dark: '#1e1b36' },
  { name: '--elv-bg-primary-20', group: 'Backgrounds', light: '#ebe9f6', dark: '#221f3d' },
  { name: '--elv-bg-primary-30', group: 'Backgrounds', light: '#dedaf1', dark: '#2a2650' },
  { name: '--elv-bg-primary-40', group: 'Backgrounds', light: '#c3bde5', dark: '#3d3768' },
  { name: '--elv-bg-primary-60', group: 'Backgrounds', light: '#988ed2', dark: '#6b5fa8' },
  { name: '--elv-bg-primary-80', group: 'Backgrounds', light: '#7769c4', dark: '#8a7ec8' },
  { name: '--elv-bg-primary', group: 'Backgrounds', light: '#5746b2', dark: '#a89ee8' },
  { name: '--elv-bg-primary-120', group: 'Backgrounds', light: '#45388f', dark: '#c3bde5' },
  { name: '--elv-bg-neutral-0', group: 'Backgrounds', light: '#ffffff', dark: '#0e0c1a' },
  { name: '--elv-bg-neutral-1', group: 'Backgrounds', light: '#fcfcfd', dark: '#111020' },
  { name: '--elv-bg-neutral-5', group: 'Backgrounds', light: '#fafafa', dark: '#16132b' },
  { name: '--elv-bg-neutral-10', group: 'Backgrounds', light: '#f2f2f3', dark: '#1e1b36' },
  { name: '--elv-bg-neutral-20', group: 'Backgrounds', light: '#dfdfe2', dark: '#2a2740' },
  { name: '--elv-bg-neutral', group: 'Backgrounds', light: '#dfdfe2', dark: '#2a2740' },
  { name: '--elv-bg-neutral-40', group: 'Backgrounds', light: '#b0afb6', dark: '#4a4570' },
  { name: '--elv-bg-neutral-100', group: 'Backgrounds', light: '#201f23', dark: '#f5f4fb' },
  { name: '--elv-bg-info-20', group: 'Backgrounds', light: '#dbecff', dark: '#0d1f3d' },
  { name: '--elv-bg-info', group: 'Backgrounds', light: '#0073f5', dark: '#5296ff' },
  { name: '--elv-bg-critical-20', group: 'Backgrounds', light: '#fff6f5', dark: '#2d1b1b' },
  { name: '--elv-bg-critical-40', group: 'Backgrounds', light: '#FFD7D1', dark: '#4a1a1a' },
  { name: '--elv-bg-critical', group: 'Backgrounds', light: '#eb2000', dark: '#f87171' },
  { name: '--elv-bg-critical-140', group: 'Backgrounds', light: '#b21800', dark: '#fca5a5' },
  { name: '--elv-bg-warning-20', group: 'Backgrounds', light: '#fff9e5', dark: '#2d2600' },
  { name: '--elv-bg-warning', group: 'Backgrounds', light: '#ffc800', dark: '#ffd747' },
  { name: '--elv-bg-success-20', group: 'Backgrounds', light: '#d0f6f1', dark: '#0d2924' },
  { name: '--elv-bg-success-40', group: 'Backgrounds', light: '#a9efe5', dark: '#153d35' },
  { name: '--elv-bg-success', group: 'Backgrounds', light: '#1fa896', dark: '#27d3bc' },
  { name: '--elv-bg-brand', group: 'Backgrounds', light: '#ff492c', dark: '#ff492c' },
  { name: '--elv-bg-inverted', group: 'Backgrounds', light: '#ffffff', dark: '#0e0c1a' },

  // Foregrounds
  { name: '--elv-text-default', group: 'Foregrounds', light: '#201f23', dark: '#f5f4fb' },
  { name: '--elv-text-subtle', group: 'Foregrounds', light: '#4c4b53', dark: '#c4c2cc' },
  { name: '--elv-text-nonessential', group: 'Foregrounds', light: '#6f6d78', dark: '#827ea5' },
  { name: '--elv-text-disabled', group: 'Foregrounds', light: '#dfdfe2', dark: '#4a4570' },
  { name: '--elv-text-inverted', group: 'Foregrounds', light: '#ffffff', dark: '#0e0c1a' },
  { name: '--elv-text-link', group: 'Foregrounds', light: '#0073f5', dark: '#66aeff' },
  { name: '--elv-text-link-hover', group: 'Foregrounds', light: '#005bc2', dark: '#9eccff' },
  { name: '--elv-text-link-visited', group: 'Foregrounds', light: '#2e90ff', dark: '#5296ff' },
  { name: '--elv-text-primary', group: 'Foregrounds', light: '#5746b2', dark: '#a89ee8' },
  { name: '--elv-text-primary-hover', group: 'Foregrounds', light: '#45388f', dark: '#c3bde5' },
  { name: '--elv-text-neutral', group: 'Foregrounds', light: '#4c4b53', dark: '#c4c2cc' },
  { name: '--elv-text-info', group: 'Foregrounds', light: '#002b5c', dark: '#dbecff' },
  { name: '--elv-text-success', group: 'Foregrounds', light: '#0f5249', dark: '#d0f6f1' },
  { name: '--elv-text-success-data', group: 'Foregrounds', light: '#1fa896', dark: '#27d3bc' },
  { name: '--elv-text-warning', group: 'Foregrounds', light: '#665000', dark: '#fff9e5' },
  { name: '--elv-text-critical', group: 'Foregrounds', light: '#b21800', dark: '#f87171' },

  // Borders
  { name: '--elv-border-whisper', group: 'Borders', light: '#f2f2f3', dark: '#1e1b36' },
  { name: '--elv-border-light', group: 'Borders', light: '#dfdfe2', dark: '#2a2740' },
  { name: '--elv-border-medium', group: 'Borders', light: '#b0afb6', dark: '#4a4570' },
  { name: '--elv-border-dark', group: 'Borders', light: '#4c4b53', dark: '#c4c2cc' },
  { name: '--elv-border-inverted', group: 'Borders', light: '#ffffff', dark: '#0e0c1a' },
  { name: '--elv-border-neutral', group: 'Borders', light: '#dfdfe2', dark: '#2a2740' },
  { name: '--elv-border-info', group: 'Borders', light: '#0073f5', dark: '#5296ff' },
  { name: '--elv-border-success', group: 'Borders', light: '#1fa896', dark: '#27d3bc' },
  { name: '--elv-border-critical', group: 'Borders', light: '#eb2000', dark: '#f87171' },
  { name: '--elv-border-warning', group: 'Borders', light: '#ffc800', dark: '#ffd747' },
  { name: '--elv-border-primary', group: 'Borders', light: '#5746b2', dark: '#a89ee8' },
  { name: '--elv-border-focus', group: 'Borders', light: '#c3bde5', dark: '#6b5fa8' },
  { name: '--elv-border-data-secondary-1', group: 'Borders', light: '#ffa394', dark: '#ff7761' },
];

(function() {
  const STORAGE_KEY = 'elv-token-overrides';

  function getOverrides() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function setOverrides(overrides) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  }

  function applyStylesToDOM() {
    const isDark = document.documentElement.classList.contains('dark');
    const overrides = getOverrides();
    
    TOKENS.forEach(token => {
      if (isDark) {
        const val = overrides[token.name] || token.dark;
        document.documentElement.style.setProperty(token.name, val);
      } else {
        document.documentElement.style.removeProperty(token.name);
      }
    });
  }

  function updateChangesCount() {
    const countSpan = document.getElementById('te-changes-count');
    if (countSpan) {
      const overrides = getOverrides();
      const count = Object.keys(overrides).length;
      countSpan.textContent = \`Changes: \${count}/\${TOKENS.length}\`;
    }
  }

  function applyToken(varName, value) {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.style.setProperty(varName, value);
    }
    
    const overrides = getOverrides();
    overrides[varName] = value;
    setOverrides(overrides);
    updateChangesCount();

    const hexInput = document.getElementById(\`te-hex-\${varName}\`);
    const colorInput = document.getElementById(\`te-color-\${varName}\`);
    const swatch = document.getElementById(\`te-swatch-\${varName}\`);
    const resetBtn = document.getElementById(\`te-reset-\${varName}\`);

    if (hexInput) hexInput.value = value;
    if (colorInput) colorInput.value = value;
    if (swatch) swatch.style.backgroundColor = value;
    if (resetBtn) resetBtn.classList.add('te-active');
  }

  function resetToken(varName) {
    const overrides = getOverrides();
    delete overrides[varName];
    setOverrides(overrides);
    
    const token = TOKENS.find(t => t.name === varName);
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      document.documentElement.style.setProperty(varName, token.dark);
    } else {
      document.documentElement.style.removeProperty(varName);
    }
    
    updateChangesCount();

    const hexInput = document.getElementById(\`te-hex-\${varName}\`);
    const colorInput = document.getElementById(\`te-color-\${varName}\`);
    const swatch = document.getElementById(\`te-swatch-\${varName}\`);
    const resetBtn = document.getElementById(\`te-reset-\${varName}\`);

    if (hexInput) hexInput.value = token.dark;
    if (colorInput) colorInput.value = token.dark;
    if (swatch) swatch.style.backgroundColor = token.dark;
    if (resetBtn) resetBtn.classList.remove('te-active');
  }

  function renderEditor() {
    const overrides = getOverrides();
    const groups = {};
    
    TOKENS.forEach(token => {
      if (!groups[token.group]) {
        groups[token.group] = [];
      }
      groups[token.group].push(token);
    });

    const panel = document.createElement('div');
    panel.className = 'te-panel';
    panel.id = 'te-panel';

    let contentHTML = '';
    
    Object.keys(groups).forEach(groupName => {
      const groupTokens = groups[groupName];
      contentHTML += \`
        <div class="te-group" id="te-group-\${groupName.replace(/\\s+/g, '-')}">
          <div class="te-group-header" onclick="this.parentElement.classList.toggle('te-collapsed')">
            \${groupName} (\${groupTokens.length})
          </div>
          <div class="te-group-content">
      \`;

      groupTokens.forEach(token => {
        const val = overrides[token.name] || token.dark;
        const shortName = token.name.replace('--elv-', '');
        const hasOverride = !!overrides[token.name];
        
        contentHTML += \`
          <div class="te-row">
            <div class="te-swatch" id="te-swatch-\${token.name}" style="background-color: \${val}"></div>
            <div class="te-name" title="\${token.name}">\${shortName}</div>
            <input type="text" class="te-input-hex" id="te-hex-\${token.name}" value="\${val}" maxlength="7" spellcheck="false" />
            <input type="color" class="te-input-color" id="te-color-\${token.name}" value="\${val}" />
            <button class="te-reset-btn \${hasOverride ? 'te-active' : ''}" id="te-reset-\${token.name}" title="Reset to default">⟳</button>
          </div>
        \`;
      });

      contentHTML += \`
          </div>
        </div>
      \`;
    });

    panel.innerHTML = \`
      <div class="te-header">
        <h2>Token Editor</h2>
        <div class="te-header-actions">
          <button class="te-btn te-btn-primary" id="te-export-btn">Export</button>
          <button class="te-close-btn" id="te-close-btn">×</button>
        </div>
      </div>
      <div class="te-content">
        \${contentHTML}
      </div>
      <div class="te-footer">
        <button class="te-btn" id="te-reset-all-btn">Reset All</button>
        <span class="te-footer-text" id="te-changes-count">Changes: 0/\${TOKENS.length}</span>
      </div>
    \`;

    document.body.appendChild(panel);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'te-toggle-btn';
    toggleBtn.innerHTML = '⚙️';
    toggleBtn.title = 'Toggle Token Editor';
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('te-open');
    });

    document.getElementById('te-close-btn').addEventListener('click', () => {
      panel.classList.remove('te-open');
    });

    TOKENS.forEach(token => {
      const hexInput = document.getElementById(\`te-hex-\${token.name}\`);
      const colorInput = document.getElementById(\`te-color-\${token.name}\`);
      const resetBtn = document.getElementById(\`te-reset-\${token.name}\`);

      hexInput.addEventListener('change', (e) => {
        let val = e.target.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
          applyToken(token.name, val);
        } else {
          const current = getOverrides()[token.name] || token.dark;
          hexInput.value = current;
        }
      });

      colorInput.addEventListener('input', (e) => {
        applyToken(token.name, e.target.value);
      });

      resetBtn.addEventListener('click', () => {
        resetToken(token.name);
      });
    });

    document.getElementById('te-export-btn').addEventListener('click', (e) => {
      const currentOverrides = getOverrides();
      let cssString = '.dark {\\n';
      TOKENS.forEach(token => {
        const val = currentOverrides[token.name] || token.dark;
        cssString += \`  \${token.name}: \${val};\\n\`;
      });
      cssString += '}\\n';

      navigator.clipboard.writeText(cssString).then(() => {
        const btn = e.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1500);
      });
    });

    document.getElementById('te-reset-all-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all token overrides?')) {
        TOKENS.forEach(token => {
          if (getOverrides()[token.name]) {
            resetToken(token.name);
          }
        });
      }
    });

    updateChangesCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    applyStylesToDOM();
    renderEditor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          applyStylesToDOM();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
  }
})();
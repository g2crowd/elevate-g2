const NAV_HTML = `
<nav class="sidebar">
  <div class="sidebar-header">
    <h1><a href="./index.html" style="color: inherit; text-decoration: none;">Elevate</a></h1>
    <button id="dark-mode-toggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
      <span class="theme-toggle-icon theme-toggle-icon--sun">☀️</span>
      <span class="theme-toggle-icon theme-toggle-icon--moon">🌙</span>
    </button>
  </div>

  <h3>Reference</h3>
  <a href="./colors.html">Colors</a>

  <h3>Actions</h3>
  <a href="./buttons.html">Button</a>
  <a href="./button-groups.html">Button Group</a>
  <a href="./control-buttons.html">Control Button</a>
  <a href="./icon-buttons.html">Icon Button</a>
  <a href="./links.html">Link</a>

  <h3>Chips &amp; Tags</h3>
  <a href="./chips.html">Chip</a>

  <h3>Containers</h3>
  <a href="./content-cards.html">Content Card</a>
  <a href="./inset-cards.html">Inset Card</a>
  <a href="./tables.html">Table</a>

  <h3>Data Display</h3>
  <a href="./number-changes.html">Number Change</a>
  <a href="./progress-bars.html">Progress Bar</a>
  <a href="./star-ratings.html">Star Rating</a>
  <a href="./status-badges.html">Status Badge</a>

  <h3>Forms</h3>
  <a href="./checkboxes.html">Checkbox</a>
  <a href="./file-uploads.html">File Upload</a>
  <a href="./helper-text.html">Helper Text</a>
  <a href="./typography.html">Label</a>
  <a href="./number-inputs.html">Number Input</a>
  <a href="./radio-buttons.html">Radio Button</a>
  <a href="./search-inputs.html">Search Input</a>
  <a href="./selects.html">Select</a>
  <a href="./inputs.html">Text Input</a>
  <a href="./textareas.html">Text Area</a>
  <a href="./toggles.html">Toggle</a>

  <h3>Layout</h3>
  <a href="./accordions.html">Accordion</a>
  <a href="./notification-badges.html">Notification Badge</a>
  <a href="./spin-loaders.html">Spin Loader</a>
  <a href="./typography.html">Typography</a>

  <h3>Media</h3>
  <a href="./avatars.html">Avatar</a>
  <a href="./icons.html">Icon</a>

  <h3>Navigation</h3>
  <a href="./breadcrumbs.html">Breadcrumbs</a>
  <a href="./index-nav.html">Index Nav</a>
  <a href="./pagination.html">Pagination</a>
  <a href="./tabs.html">Tab</a>

  <h3>Overlays</h3>
  <a href="./dropdown-menus.html">Dropdown Menu</a>
  <a href="./filter-dropdowns.html">Filter Dropdown</a>
  <a href="./modals.html">Modal</a>
  <a href="./slide-out-panels.html">Slide-Out Panel</a>
  <a href="./notifications.html">Notification</a>
  <a href="./popovers.html">Popover</a>
  <a href="./toasts.html">Toast</a>
  <a href="./tooltips.html">Tooltip</a>

</nav>
`;

document.addEventListener('DOMContentLoaded', function() {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.style.display = 'flex';
  document.body.style.maxWidth = 'none';
  document.body.style.padding = '0';

  var main = document.querySelector('.main');
  if (!main) {
    var content = document.createElement('div');
    content.className = 'main';
    while (document.body.children.length > 1) {
      content.appendChild(document.body.children[1]);
    }
    document.body.appendChild(content);
  }

  var current = location.pathname.split('/').pop();
  var links = document.querySelectorAll('.sidebar a[href]');
  links.forEach(function(link) {
    var href = link.getAttribute('href').replace('./', '');
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.add('ported');
    }
  });

  var darkToggle = document.getElementById('dark-mode-toggle');
  var root = document.documentElement;
  var STORAGE_KEY = 'elevate-dark-mode';

  if (localStorage.getItem(STORAGE_KEY) === 'dark') {
    root.classList.add('dark');
  }

  darkToggle.addEventListener('click', function() {
    root.classList.toggle('dark');
    localStorage.setItem(STORAGE_KEY, root.classList.contains('dark') ? 'dark' : 'light');
  });

});

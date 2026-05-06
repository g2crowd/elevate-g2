const NAV_HTML = `
<nav class="sidebar">
  <h1><a href="./index.html" style="color: inherit; text-decoration: none;">Elevate</a></h1>

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
  <a class="planned">Table</a>

  <h3>Data Display</h3>
  <a class="planned">Number Change</a>
  <a href="./progress-bars.html">Progress Bar</a>
  <a class="planned">Star Rating</a>
  <a href="./status-badges.html">Status Badge</a>

  <h3>Forms</h3>
  <a class="planned">Checkbox</a>
  <a class="planned">File Input</a>
  <a class="planned">Helper Text</a>
  <a class="planned">Label</a>
  <a class="planned">Number Input</a>
  <a class="planned">Radio Button</a>
  <a class="planned">Search Input</a>
  <a href="./selects.html">Select</a>
  <a href="./inputs.html">Text Input</a>
  <a class="planned">Text Area</a>
  <a class="planned">Toggle</a>

  <h3>Layout</h3>
  <a class="planned">Accordion</a>
  <a href="./notification-badges.html">Notification Badge</a>
  <a href="./spin-loaders.html">Spin Loader</a>
  <a class="planned">Typography</a>

  <h3>Media</h3>
  <a href="./avatars.html">Avatar</a>
  <a href="./icons.html">Icon</a>

  <h3>Navigation</h3>
  <a href="./breadcrumbs.html">Breadcrumbs</a>
  <a class="planned">Index Nav</a>
  <a href="./pagination.html">Pagination</a>
  <a href="./tabs.html">Tab</a>

  <h3>Overlays</h3>
  <a class="planned">Dropdown Menu</a>
  <a class="planned">Filter Dropdown</a>
  <a class="planned">Modal</a>
  <a class="planned">Notification</a>
  <a class="planned">Popover</a>
  <a class="planned">Toast</a>
  <a class="planned">Tooltip</a>

  <div class="legend">
    <span><strong style="color: #5746b2;">Purple</strong> = ported</span>
    <span><strong style="color: #6f6d78;">Gray</strong> = planned</span>
  </div>
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
});

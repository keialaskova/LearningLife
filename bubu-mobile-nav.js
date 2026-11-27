/* Theme 7 mobile More tray. Does not alter navigation for the original six themes. */
(() => {
  'use strict';
  const layoutCss = document.createElement('link');
  layoutCss.rel = 'stylesheet';
  layoutCss.href = './layout-system-v59.css?v=59';
  document.head.appendChild(layoutCss);
  const nav = document.querySelector('.layout > nav');
  if (!nav || nav.querySelector('.bubu-more-toggle')) return;
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'navbtn bubu-more-toggle';
  more.setAttribute('aria-expanded', 'false');
  more.innerHTML = '<span class="ico">⌘</span><span>More</span>';
  more.addEventListener('click', () => {
    const open = nav.classList.toggle('more-open');
    more.setAttribute('aria-expanded', String(open));
    more.querySelector('span:last-child').textContent = open ? 'Close' : 'More';
  });
  nav.appendChild(more);
  nav.querySelectorAll('.navbtn').forEach(button => {
    button.addEventListener('click', () => {
      if (button !== more) {
        nav.classList.remove('more-open');
        more.setAttribute('aria-expanded', 'false');
        more.querySelector('span:last-child').textContent = 'More';
      }
    });
  });
})();

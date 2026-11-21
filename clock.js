(() => {
  'use strict';
  const dateEl = document.getElementById('headerDate');
  if (!dateEl || document.getElementById('headerClock')) return;

  const clock = document.createElement('span');
  clock.id = 'headerClock';
  clock.style.cssText = 'display:inline-block;margin-left:10px;font-size:inherit;font-weight:inherit;line-height:inherit;font-variant-numeric:tabular-nums;white-space:nowrap';
  clock.setAttribute('aria-label', 'Current Philippine time');
  dateEl.insertAdjacentElement('afterend', clock);

  const formatter = new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  const update = () => { clock.textContent = formatter.format(new Date()); };
  update();
  window.setInterval(update, 1000);
})();

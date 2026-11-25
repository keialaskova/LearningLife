/* Working Life 1.0 — calendar visibility fix
   Loaded after the app's existing scripts by sw.js.
   Uses the existing calendar data and click handler; does not change saved data. */
(function () {
  window.renderCalendar = function () {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    $('monthLabel').textContent = calDate.toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric'
    });

    const grid = $('calendarGrid');
    grid.innerHTML = '';

    const styles = getComputedStyle(document.body);
    const ink = styles.getPropertyValue('--ink').trim() || '#30332d';
    const muted = styles.getPropertyValue('--muted').trim() || '#777';
    const panel = styles.getPropertyValue('--panel').trim() || '#ffffff';
    const line = styles.getPropertyValue('--line').trim() || '#e5e5e5';
    const accent = styles.getPropertyValue('--accent2').trim() || '#e9eee6';
    const todayKey = today();

    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(day => {
      const label = document.createElement('b');
      label.textContent = day;
      label.style.setProperty('display', 'block', 'important');
      label.style.setProperty('color', muted, 'important');
      label.style.setProperty('-webkit-text-fill-color', muted, 'important');
      label.style.setProperty('font-weight', '700');
      grid.append(label);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const dayCount = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('span');
      blank.setAttribute('aria-hidden', 'true');
      grid.append(blank);
    }

    for (let day = 1; day <= dayCount; day++) {
      const key = dateKey(year, month, day);
      const hasItems = calendarEntries.some(entry => entry.date === key);
      const isToday = key === todayKey;
      const button = document.createElement('button');

      button.type = 'button';
      button.textContent = String(day) + (hasItems ? ' ·' : '');
      button.title = hasItems ? 'Has saved notes or schedules' : 'Select date';
      button.setAttribute('aria-label',
        new Date(year, month, day).toLocaleDateString(undefined, {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        }) + (hasItems ? ', has saved items' : '')
      );

      button.style.setProperty('display', 'flex', 'important');
      button.style.setProperty('align-items', 'center', 'important');
      button.style.setProperty('justify-content', 'center', 'important');
      button.style.setProperty('width', '100%', 'important');
      button.style.setProperty('min-height', '44px', 'important');
      button.style.setProperty('padding', '8px 0', 'important');
      button.style.setProperty('border', '1px solid ' + line, 'important');
      button.style.setProperty('border-radius', '10px', 'important');
      button.style.setProperty('background', isToday ? accent : panel, 'important');
      button.style.setProperty('color', ink, 'important');
      button.style.setProperty('-webkit-text-fill-color', ink, 'important');
      button.style.setProperty('font-size', '15px', 'important');
      button.style.setProperty('font-weight', hasItems ? '750' : '500', 'important');
      button.style.setProperty('opacity', '1', 'important');
      button.style.setProperty('visibility', 'visible', 'important');
      button.style.setProperty('cursor', 'pointer', 'important');

      button.addEventListener('click', () => openCalendarDate(key));
      grid.append(button);
    }
  };
})();

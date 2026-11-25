/* Learning Life — accessible text size setting.
   Keeps planner records and existing appearance preferences unchanged. */
(() => {
  const KEY = 'learninglife_text_size';
  const sizes = {
    small: { label: 'Small', zoom: '0.90' },
    medium: { label: 'Medium', zoom: '1' },
    large: { label: 'Large', zoom: '1.12' }
  };

  function applySize(value) {
    const size = sizes[value] ? value : 'medium';
    document.documentElement.dataset.textSize = size;
    document.body.style.zoom = sizes[size].zoom;
    localStorage.setItem(KEY, size);
    document.querySelectorAll('[data-text-size-option]').forEach(button => {
      const selected = button.dataset.textSizeOption === size;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('selected', selected);
    });
  }

  function addSetting() {
    const appearance = document.querySelector('.appearance-panel');
    const modeRow = document.querySelector('.appearance-panel .mode-row');
    if (!appearance || !modeRow || document.getElementById('textSizeSetting')) return;

    const wrap = document.createElement('div');
    wrap.id = 'textSizeSetting';
    wrap.className = 'mode-row';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'stretch';
    wrap.innerHTML = `
      <div>
        <strong>Text Size</strong>
        <p class="sub">Adjust the reading size throughout Learning Life.</p>
      </div>
      <div class="listtools" role="group" aria-label="Text size">
        <button type="button" class="btn secondary" data-text-size-option="small" aria-pressed="false">Small</button>
        <button type="button" class="btn secondary" data-text-size-option="medium" aria-pressed="false">Medium</button>
        <button type="button" class="btn secondary" data-text-size-option="large" aria-pressed="false">Large</button>
      </div>`;
    modeRow.insertAdjacentElement('afterend', wrap);
    wrap.querySelectorAll('[data-text-size-option]').forEach(button => {
      button.addEventListener('click', () => applySize(button.dataset.textSizeOption));
    });
    applySize(localStorage.getItem(KEY) || 'medium');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSetting, { once: true });
  } else {
    addSetting();
  }
})();

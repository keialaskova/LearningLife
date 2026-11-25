/* Learning Life — responsive text sizing, including large themed headings. */
(() => {
  const KEY = 'learninglife_text_size';
  const values = ['small', 'medium', 'large'];

  const css = `
    /* Text size is scoped to the app and overrides theme-specific fixed headings. */
    html[data-wl-text-size="small"] body { font-size: 13px !important; }
    html[data-wl-text-size="small"] .brand { font-size: 19px !important; }
    html[data-wl-text-size="small"] .welcome h1 { font-size: 25px !important; line-height: 1.22 !important; letter-spacing: -.4px !important; }
    html[data-wl-text-size="small"] h2 { font-size: 16px !important; }
    html[data-wl-text-size="small"] h3 { font-size: 14px !important; }
    html[data-wl-text-size="small"] .navbtn { font-size: 12px !important; padding: 8px 9px !important; }
    html[data-wl-text-size="small"] .sub,
    html[data-wl-text-size="small"] .today,
    html[data-wl-text-size="small"] .rowitem small,
    html[data-wl-text-size="small"] .transaction small { font-size: 11px !important; }
    html[data-wl-text-size="small"] .panel { padding: 15px !important; }
    html[data-wl-text-size="small"] .stat { padding: 13px !important; }
    html[data-wl-text-size="small"] .welcome { margin: 4px 0 16px !important; }
    html[data-wl-text-size="small"] .welcome h1 { overflow-wrap: anywhere; }

    html[data-wl-text-size="medium"] body { font-size: 16px !important; }
    html[data-wl-text-size="medium"] .welcome h1 { font-size: 30px !important; line-height: 1.2 !important; }
    html[data-wl-text-size="medium"] h2 { font-size: 20px !important; }
    html[data-wl-text-size="medium"] .navbtn { font-size: 14px !important; }

    html[data-wl-text-size="large"] body { font-size: 18px !important; }
    html[data-wl-text-size="large"] .brand { font-size: 27px !important; }
    html[data-wl-text-size="large"] .welcome h1 { font-size: 40px !important; line-height: 1.2 !important; }
    html[data-wl-text-size="large"] h2 { font-size: 23px !important; }
    html[data-wl-text-size="large"] .navbtn { font-size: 16px !important; }

    @media (max-width: 720px) {
      html[data-wl-text-size="small"] .app { padding: 14px 12px 34px !important; }
      html[data-wl-text-size="small"] header { margin-bottom: 18px !important; }
      html[data-wl-text-size="small"] .layout { gap: 10px !important; }
      html[data-wl-text-size="small"] nav { padding: 6px !important; gap: 2px !important; }
      html[data-wl-text-size="small"] .navbtn { padding: 7px 8px !important; gap: 6px !important; }
      html[data-wl-text-size="small"] .panel { padding: 13px !important; margin-bottom: 12px !important; }
      html[data-wl-text-size="small"] .welcome h1 { font-size: 23px !important; }
      html[data-wl-text-size="medium"] .welcome h1 { font-size: 28px !important; }
      html[data-wl-text-size="large"] .welcome h1 { font-size: 36px !important; }
    }
  `;

  function apply(value) {
    const size = values.includes(value) ? value : 'medium';
    document.documentElement.setAttribute('data-wl-text-size', size);
    localStorage.setItem(KEY, size);
    document.querySelectorAll('[data-text-size-option]').forEach(button => {
      const selected = button.dataset.textSizeOption === size;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('selected', selected);
    });
  }

  function init() {
    if (!document.getElementById('wlTextSizeStyles')) {
      const style = document.createElement('style');
      style.id = 'wlTextSizeStyles';
      style.textContent = css;
      document.head.appendChild(style);
    }

    const appearance = document.querySelector('.appearance-panel');
    const modeRow = document.querySelector('.appearance-panel .mode-row');
    if (appearance && modeRow && !document.getElementById('textSizeSetting')) {
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
        button.addEventListener('click', () => apply(button.dataset.textSizeOption));
      });
    }

    apply(localStorage.getItem(KEY) || 'medium');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

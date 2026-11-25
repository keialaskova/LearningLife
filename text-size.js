/* Learning Life — text size controls with a compact phone greeting. */
(() => {
  const KEY = 'learninglife_text_size';
  const sizes = ['small', 'medium', 'large'];

  const css = `
    html[data-wl-text-size="small"] body { font-size:13px !important; }
    html[data-wl-text-size="small"] body[data-design] .brand { font-size:19px !important; }
    html[data-wl-text-size="small"] body[data-design] .welcome h1 {
      font-size:22px !important; line-height:1.25 !important;
      letter-spacing:-.35px !important; overflow-wrap:anywhere !important;
    }
    html[data-wl-text-size="small"] body[data-design] h2 { font-size:16px !important; }
    html[data-wl-text-size="small"] body[data-design] h3 { font-size:14px !important; }
    html[data-wl-text-size="small"] body[data-design] .navbtn {
      font-size:12px !important; padding:7px 8px !important; gap:6px !important;
    }
    html[data-wl-text-size="small"] body[data-design] .sub,
    html[data-wl-text-size="small"] body[data-design] .today,
    html[data-wl-text-size="small"] body[data-design] .rowitem small,
    html[data-wl-text-size="small"] body[data-design] .transaction small { font-size:11px !important; }
    html[data-wl-text-size="small"] body[data-design] .panel {
      padding:13px !important; margin-bottom:12px !important;
    }
    html[data-wl-text-size="small"] body[data-design] .stat { padding:13px !important; }
    html[data-wl-text-size="small"] body[data-design] .welcome { margin:4px 0 14px !important; }

    html[data-wl-text-size="medium"] body[data-design] { font-size:16px !important; }
    html[data-wl-text-size="medium"] body[data-design] .welcome h1 {
      font-size:30px !important; line-height:1.2 !important;
    }
    html[data-wl-text-size="medium"] body[data-design] h2 { font-size:20px !important; }
    html[data-wl-text-size="medium"] body[data-design] .navbtn { font-size:14px !important; }

    html[data-wl-text-size="large"] body[data-design] { font-size:18px !important; }
    html[data-wl-text-size="large"] body[data-design] .brand { font-size:27px !important; }
    html[data-wl-text-size="large"] body[data-design] .welcome h1 {
      font-size:40px !important; line-height:1.2 !important;
    }
    html[data-wl-text-size="large"] body[data-design] h2 { font-size:23px !important; }
    html[data-wl-text-size="large"] body[data-design] .navbtn { font-size:16px !important; }

    @media(max-width:720px) {
      html[data-wl-text-size="small"] body[data-design] .app {
        padding:14px 12px 34px !important;
      }
      html[data-wl-text-size="small"] body[data-design] header {
        margin-bottom:18px !important;
      }
      html[data-wl-text-size="small"] body[data-design] .layout {
        gap:10px !important;
      }
      html[data-wl-text-size="small"] body[data-design] nav {
        padding:6px !important; gap:2px !important;
      }
      html[data-wl-text-size="small"] body[data-design] .welcome h1 {
        font-size:22px !important;
      }
      html[data-wl-text-size="medium"] body[data-design] .welcome h1 {
        font-size:28px !important;
      }
      html[data-wl-text-size="large"] body[data-design] .welcome h1 {
        font-size:36px !important;
      }
    }
  `;

  function apply(value) {
    const size = sizes.includes(value) ? value : 'medium';
    document.documentElement.setAttribute('data-wl-text-size', size);
    localStorage.setItem(KEY, size);
    document.querySelectorAll('[data-text-size-option]').forEach(button => {
      const selected = button.dataset.textSizeOption === size;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('selected', selected);
    });
  }

  function init() {
    let style = document.getElementById('wlTextSizeStyles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'wlTextSizeStyles';
      document.head.appendChild(style);
    }
    style.textContent = css;

    const modeRow = document.querySelector('.appearance-panel .mode-row');
    if (modeRow && !document.getElementById('textSizeSetting')) {
      const wrap = document.createElement('div');
      wrap.id = 'textSizeSetting';
      wrap.className = 'mode-row';
      wrap.style.flexDirection = 'column';
      wrap.style.alignItems = 'stretch';
      wrap.innerHTML = `
        <div><strong>Text Size</strong>
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
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();

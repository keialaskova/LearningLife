/* Learning Life — Theme 7: Bubu & Dudu Beach.
   Uses the user's supplied 54 transparent PNG sticker assets. */
(() => {
  const designKey = 'workinglife_design';
  const bubuKey = 'learninglife_bubu_theme_enabled';
  const themeName = 'Bubu & Dudu Beach';
  const root = './cute_bear_stickers_54/';
  const css = `
    body[data-design="bubu"] {
      --bg:#fff7fb; --panel:#fffafd; --ink:#56352f; --muted:#936f70;
      --line:#f4d6e1; --accent:#ec8fae; --accent2:#ffe3ed;
      --shadow:0 8px 24px rgba(180,112,139,.10);
      font-family: "Trebuchet MS", system-ui, sans-serif;
      background:linear-gradient(180deg,#eaf5ff 0,#fff5f7 260px,#fffafd 100%);
    }
    body[data-design="bubu"] .app { max-width:1180px; }
    body[data-design="bubu"] header { padding:18px 20px; border-radius:24px;
      background:linear-gradient(115deg,#ffe4ed,#e4f4ff); border:1px solid #f5cbdc; }
    body[data-design="bubu"] .brand { color:#75463f; font-weight:900; letter-spacing:-.5px; }
    body[data-design="bubu"] nav, body[data-design="bubu"] .panel,
    body[data-design="bubu"] .card, body[data-design="bubu"] .stat {
      border:1px solid #f4d5e1; border-radius:22px;
      box-shadow:0 7px 20px rgba(173,119,143,.08);
    }
    body[data-design="bubu"] nav { background:#fffafd; }
    body[data-design="bubu"] .navbtn { border-radius:15px; }
    body[data-design="bubu"] .navbtn.active, body[data-design="bubu"] .navbtn[aria-current="page"] {
      background:#ffdce8; color:#75463f;
    }
    body[data-design="bubu"] .welcome {
      position:relative; overflow:hidden; padding:28px 30px; border-radius:26px;
      background:linear-gradient(110deg,#ffe6ef,#edf7ff);
      border:1px solid #f4ccdc; min-height:140px;
    }
    body[data-design="bubu"] .welcome:after {
      content:""; position:absolute; right:12px; bottom:-18px; width:150px; height:130px;
      background:url("${root}54_daily_log_both.png") center/contain no-repeat;
      pointer-events:none; opacity:.96;
    }
    body[data-design="bubu"] .welcome h1 { color:#70433d; position:relative; z-index:1; }
    body[data-design="bubu"] .welcome p { color:#936b70; position:relative; z-index:1; }
    body[data-design="bubu"] .stat:nth-child(1) { background:linear-gradient(135deg,#fff0f5,#fffafd); }
    body[data-design="bubu"] .stat:nth-child(2) { background:linear-gradient(135deg,#edf7ff,#fffafd); }
    body[data-design="bubu"] .panel { background:rgba(255,250,253,.96); }
    body[data-design="bubu"] .btn { border-radius:14px; }
    body[data-design="bubu"] .field { border-radius:13px; background:#fff; border-color:#efcfdd; color:#56352f; }
    body[data-design="bubu"] .theme-choice[data-design="bubu"] { background:#fff0f6; }
    body[data-design="bubu"] .empty { color:#936f70; }
    body.dark[data-design="bubu"] {
      --bg:#211b28; --panel:#302638; --ink:#fff0f5; --muted:#e0bfd0;
      --line:#594257; --accent:#f2a5c0; --accent2:#493344;
      background:linear-gradient(180deg,#302c48 0,#241d2b 280px,#211b28 100%);
    }
    body.dark[data-design="bubu"] header { background:linear-gradient(115deg,#493344,#303b54); border-color:#63465b; }
    body.dark[data-design="bubu"] .welcome { background:linear-gradient(110deg,#493344,#303b54); border-color:#63465b; }
    body.dark[data-design="bubu"] .welcome h1 { color:#fff0f5; }
    body.dark[data-design="bubu"] .welcome p { color:#e0bfd0; }
    body.dark[data-design="bubu"] nav, body.dark[data-design="bubu"] .panel,
    body.dark[data-design="bubu"] .card, body.dark[data-design="bubu"] .stat {
      background:#302638; border-color:#594257;
    }
    body.dark[data-design="bubu"] .stat:nth-child(1) { background:#3b2b3b; }
    body.dark[data-design="bubu"] .stat:nth-child(2) { background:#2c3548; }
    body.dark[data-design="bubu"] .field { background:#282230; border-color:#594257; color:#fff0f5; }
    body.dark[data-design="bubu"] .navbtn.active { background:#594257; color:#fff0f5; }
    @media(max-width:720px) {
      body[data-design="bubu"] .app { padding:14px 12px 34px; }
      body[data-design="bubu"] header { padding:14px; border-radius:18px; }
      body[data-design="bubu"] .welcome { padding:20px 18px; min-height:112px; }
      body[data-design="bubu"] .welcome:after { width:100px; height:95px; right:4px; bottom:-12px; }
      body[data-design="bubu"] .welcome h1 { max-width:75%; font-size:24px; }
      body[data-design="bubu"] .panel, body[data-design="bubu"] .stat { border-radius:18px; }
    }
    @media(prefers-reduced-motion:no-preference) {
      body[data-design="bubu"] .panel, body[data-design="bubu"] .stat { transition:transform .18s ease,box-shadow .18s ease; }
      body[data-design="bubu"] .panel:active, body[data-design="bubu"] .stat:active { transform:translateY(-1px); }
    }
  `;
  function init() {
    if (!document.getElementById('bubuThemeStyles')) {
      const style=document.createElement('style'); style.id='bubuThemeStyles';
      style.textContent=css; document.head.appendChild(style);
    }
    if (typeof designNames !== 'undefined') designNames.bubu=themeName;
    const grid=document.getElementById('designChoices');
    if (grid && !grid.querySelector('[data-design="bubu"]')) {
      const b=document.createElement('button');
      b.type='button'; b.className='theme-choice'; b.dataset.design='bubu';
      b.innerHTML='<span class="swatches"><i style="background:#fff0f5"></i><i style="background:#ffdce8"></i><i style="background:#dff1ff"></i><i style="background:#ec8fae"></i></span><strong>Bubu & Dudu Beach</strong><small>Pastel · cute · seaside</small>';
      grid.appendChild(b);
      b.addEventListener('click',()=>{ localStorage.setItem(bubuKey,'1'); if(typeof applyDesign==='function') applyDesign('bubu'); });
    }
    document.querySelectorAll('#designChoices .theme-choice:not([data-design="bubu"])').forEach(btn=>{
      btn.addEventListener('click',()=>localStorage.removeItem(bubuKey));
    });
    if (localStorage.getItem(bubuKey)==='1' && typeof applyDesign==='function') applyDesign('bubu');
    const status=document.getElementById('designStatus');
    if(status && localStorage.getItem(designKey)==='bubu') status.textContent='Current style: '+themeName;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

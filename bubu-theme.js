/* Learning Life — Theme 7: Bubu & Dudu Beach
   A full-page visual system for Theme 7 only. Other themes are untouched. */
(() => {
  'use strict';
  const DESIGN = 'bubu';
  const ANIMATION_KEY = 'learninglife_bubu_animation';
  const styleId = 'learning-life-bubu-theme-v2';

  const css = `
/* ===== BUBU & DUDU BEACH: FULL APP REDESIGN ===== */
body[data-design="bubu"]{
  --bg:#fff5ef!important;--panel:#fffdfb!important;--ink:#59434b!important;
  --muted:#947c85!important;--line:#f1dce2!important;--accent:#df899b!important;
  --accent2:#ffe7eb!important;--danger:#c96d72!important;
  --shadow:0 10px 28px rgba(176,119,143,.12)!important;
  background:linear-gradient(180deg,#dff5fb 0,#f5fbfc 190px,#fff4ed 420px,#fff8f5 100%)!important;
  color:#59434b!important;font-family:"Trebuchet MS",system-ui,sans-serif!important;
  min-height:100vh;
}
body[data-design="bubu"] *{scrollbar-color:#e8b9c6 #fff3f5}
body[data-design="bubu"] .app{
  width:min(1500px,100%)!important;max-width:1500px!important;
  margin:0 auto!important;padding:22px clamp(14px,3vw,38px) 70px!important;
}
body[data-design="bubu"] header{
  display:flex!important;align-items:center!important;justify-content:space-between!important;
  gap:16px!important;margin:0 0 22px!important;padding:14px 20px!important;
  border:1px solid #f1d9df!important;border-radius:24px!important;
  background:rgba(255,253,251,.94)!important;box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .brand{font-size:25px!important;font-weight:900!important;color:#c87991!important;letter-spacing:-.7px!important}
body[data-design="bubu"] .brand span{color:#8bbacb!important}
body[data-design="bubu"] .today{color:#927984!important;font-size:13px!important}
body[data-design="bubu"] .headeractions{gap:10px!important}
body[data-design="bubu"] .theme-toggle{border:1px solid #efd4dd!important;background:#fff4f6!important;color:#86596c!important;border-radius:14px!important;padding:9px 13px!important}

/* Main application frame: roomy desktop/tablet workspace */
body[data-design="bubu"] .layout{
  display:grid!important;grid-template-columns:245px minmax(0,1fr)!important;
  align-items:start!important;gap:22px!important;
}
body[data-design="bubu"] nav{
  position:sticky!important;top:14px!important;height:max-content!important;
  display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;
  gap:4px!important;padding:14px!important;overflow:visible!important;
  background:rgba(255,253,251,.96)!important;border:1px solid #f1dce2!important;
  border-radius:25px!important;box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .navlabel{
  display:block!important;padding:12px 10px 5px!important;color:#c08a9b!important;
  font-size:10px!important;font-weight:800!important;letter-spacing:1.6px!important;
}
body[data-design="bubu"] .navbtn{
  display:flex!important;align-items:center!important;width:100%!important;
  white-space:normal!important;text-align:left!important;gap:11px!important;
  padding:11px 12px!important;margin:1px 0!important;border:0!important;
  border-radius:15px!important;background:transparent!important;color:#806b76!important;
  font-size:14px!important;font-weight:600!important;transition:background .18s,color .18s!important;
}
body[data-design="bubu"] .navbtn.active,
body[data-design="bubu"] .navbtn:hover{
  background:#ffe7eb!important;color:#b66580!important;
}
body[data-design="bubu"] .ico{width:21px!important;font-size:16px!important}
body[data-design="bubu"] main{min-width:0!important;width:100%!important;max-width:none!important;margin:0!important}

/* Dashboard hero */
body[data-design="bubu"] .welcome{
  position:relative!important;isolation:isolate!important;overflow:hidden!important;
  min-height:160px!important;display:flex!important;flex-direction:column!important;
  justify-content:center!important;padding:27px 30px!important;margin:0 0 18px!important;
  border:1px solid #f1d4dc!important;border-radius:28px!important;
  background:linear-gradient(105deg,rgba(255,235,230,.97),rgba(255,245,235,.93) 53%,rgba(224,245,252,.94)),
    url('./assets/bubu-dudu-beach.jpg') center 48%/cover!important;
  box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .welcome:after{
  content:""!important;position:absolute!important;z-index:-1!important;
  right:14px!important;bottom:-4px!important;width:165px!important;height:130px!important;
  background:url('./assets/bubu-bear.png') center bottom/contain no-repeat!important;
  pointer-events:none!important;opacity:.98!important;
}
body[data-design="bubu"] .welcome h1{
  max-width:75%!important;margin:0 0 7px!important;color:#a95f7a!important;
  font-size:clamp(27px,3vw,40px)!important;line-height:1.15!important;
  font-weight:900!important;letter-spacing:-1px!important;
}
body[data-design="bubu"] .welcome p{max-width:72%!important;color:#92717d!important;font-size:14px!important}

/* All cards, panels and statistics across every feature screen */
body[data-design="bubu"] .stats{
  display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;
  gap:13px!important;margin:0 0 18px!important;
}
body[data-design="bubu"] .stat,
body[data-design="bubu"] .card,
body[data-design="bubu"] .panel{
  min-width:0!important;color:#59434b!important;background:#fffdfb!important;
  border:1px solid #f1dce2!important;border-radius:22px!important;
  box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .stat{padding:18px 19px!important}
body[data-design="bubu"] .stat small{color:#987f88!important;font-size:12px!important}
body[data-design="bubu"] .stat strong{color:#a85f7a!important;font-size:25px!important}
body[data-design="bubu"] .panel{padding:22px!important;margin:0 0 17px!important}
body[data-design="bubu"] h2{color:#a9637c!important;font-size:19px!important;font-weight:800!important}
body[data-design="bubu"] .sub,
body[data-design="bubu"] .empty,
body[data-design="bubu"] .rowitem small,
body[data-design="bubu"] .transaction small,
body[data-design="bubu"] .moneybox small{color:#947c85!important}
body[data-design="bubu"] .rowitem,
body[data-design="bubu"] .transaction{border-color:#f4e3e7!important}
body[data-design="bubu"] .time{color:#c87991!important}
body[data-design="bubu"] .moneygrid{gap:12px!important}
body[data-design="bubu"] .moneybox{
  background:linear-gradient(135deg,#fff1f2,#fffdfb)!important;
  border:1px solid #f2dce3!important;border-radius:17px!important;padding:15px!important;
}
body[data-design="bubu"] .moneybox b{color:#a85f7a!important}
body[data-design="bubu"] .positive{color:#639b83!important}
body[data-design="bubu"] .negative{color:#c96d72!important}

/* Buttons, form controls, calendar, tables, dialogs */
body[data-design="bubu"] .btn{
  border:1px solid #df899b!important;background:#df899b!important;color:#fff!important;
  border-radius:14px!important;padding:10px 15px!important;font-weight:750!important;
  box-shadow:0 5px 12px rgba(223,137,155,.2)!important;
}
body[data-design="bubu"] .btn.secondary,
body[data-design="bubu"] .pill{
  border:1px solid #dceef5!important;background:#eaf7fc!important;color:#64899b!important;
  box-shadow:none!important;border-radius:999px!important;
}
body[data-design="bubu"] .btn.ghost{background:transparent!important;color:#9a7180!important;border:0!important;box-shadow:none!important}
body[data-design="bubu"] .field,
body[data-design="bubu"] input,
body[data-design="bubu"] textarea,
body[data-design="bubu"] select{
  color:#59434b!important;background:#fffafb!important;border:1px solid #ecd5dd!important;
  border-radius:13px!important;outline:none!important;
}
body[data-design="bubu"] .field:focus,
body[data-design="bubu"] input:focus,
body[data-design="bubu"] textarea:focus,
body[data-design="bubu"] select:focus{border-color:#df9cac!important;box-shadow:0 0 0 3px #fbe6eb!important}
body[data-design="bubu"] .modalback{background:rgba(84,54,68,.42)!important;backdrop-filter:blur(5px)!important}
body[data-design="bubu"] .modal{background:#fffdfb!important;color:#59434b!important;border:1px solid #f1dce2!important;border-radius:24px!important;box-shadow:0 20px 70px rgba(95,61,77,.2)!important}
body[data-design="bubu"] #calendarGrid button{border-radius:12px!important}
body[data-design="bubu"] footer{color:#a98d97!important}

/* Theme 7's own animation card */
body[data-design="bubu"] .bubu-video-card{
  display:none;margin:0 0 18px!important;padding:13px!important;
  background:#fffdfb!important;border:1px solid #f1dce2!important;
  border-radius:24px!important;box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .bubu-video-card video{
  display:block;width:100%!important;max-height:300px!important;object-fit:contain!important;
  border-radius:17px!important;background:#fff0f1!important;
}
body[data-design="bubu"] .bubu-video-caption{padding:9px 5px 1px!important;color:#b96883!important;font-weight:800!important}

/* Theme chooser gets its own clear card treatment */
body[data-design="bubu"] .theme-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important}
body[data-design="bubu"] .theme-choice{
  border:1px solid #efd8df!important;border-radius:17px!important;
  background:#fffdfb!important;color:#59434b!important;padding:14px!important;
}
body[data-design="bubu"] .theme-choice.selected,
body[data-design="bubu"] .theme-choice[data-design="bubu"]{
  border-color:#df9cac!important;background:#fff0f3!important;
}

/* Dark mode is intentionally overridden for Bubu theme: Theme 7 has its own light beach palette */
body.dark[data-design="bubu"]{
  --bg:#fff5ef!important;--panel:#fffdfb!important;--ink:#59434b!important;
  --muted:#947c85!important;--line:#f1dce2!important;--accent:#df899b!important;
  --accent2:#ffe7eb!important;background:linear-gradient(180deg,#dff5fb 0,#f5fbfc 190px,#fff4ed 420px,#fff8f5 100%)!important;
  color:#59434b!important;
}
body.dark[data-design="bubu"] header,
body.dark[data-design="bubu"] nav,
body.dark[data-design="bubu"] .panel,
body.dark[data-design="bubu"] .card,
body.dark[data-design="bubu"] .stat,
body.dark[data-design="bubu"] .welcome,
body.dark[data-design="bubu"] .modal{
  background-color:#fffdfb!important;color:#59434b!important;border-color:#f1dce2!important;
}
body.dark[data-design="bubu"] .welcome{background:linear-gradient(105deg,rgba(255,235,230,.97),rgba(255,245,235,.93) 53%,rgba(224,245,252,.94)),url('./assets/bubu-dudu-beach.jpg') center/cover!important}
body.dark[data-design="bubu"] .welcome h1{color:#a95f7a!important}
body.dark[data-design="bubu"] .field,
body.dark[data-design="bubu"] input,
body.dark[data-design="bubu"] textarea,
body.dark[data-design="bubu"] select{background:#fffafb!important;color:#59434b!important;border-color:#ecd5dd!important}
body.dark[data-design="bubu"] .navbtn{color:#806b76!important}
body.dark[data-design="bubu"] .navbtn.active{background:#ffe7eb!important;color:#b66580!important}

/* Tablet/mobile layout */
@media(max-width:900px){
 body[data-design="bubu"] .app{padding:15px 13px 48px!important}
 body[data-design="bubu"] .layout{grid-template-columns:1fr!important;gap:13px!important}
 body[data-design="bubu"] nav{position:static!important;display:flex!important;flex-direction:row!important;
  flex-wrap:nowrap!important;overflow-x:auto!important;gap:5px!important;padding:8px!important}
 body[data-design="bubu"] .navlabel{display:none!important}
 body[data-design="bubu"] .navbtn{flex:0 0 auto!important;width:auto!important;white-space:nowrap!important;padding:10px 13px!important}
 body[data-design="bubu"] .welcome{min-height:145px!important;padding:22px!important}
 body[data-design="bubu"] .welcome:after{width:130px!important;height:105px!important}
 body[data-design="bubu"] .panel{padding:17px!important}
}
@media(max-width:560px){
 body[data-design="bubu"] .app{padding:10px 9px 36px!important}
 body[data-design="bubu"] header{padding:11px 13px!important;border-radius:18px!important}
 body[data-design="bubu"] .brand{font-size:20px!important}
 body[data-design="bubu"] .welcome{min-height:128px!important;padding:17px!important;border-radius:21px!important}
 body[data-design="bubu"] .welcome h1{font-size:25px!important;max-width:70%!important}
 body[data-design="bubu"] .welcome p{font-size:12px!important;max-width:68%!important}
 body[data-design="bubu"] .welcome:after{width:100px!important;height:88px!important;right:3px!important}
 body[data-design="bubu"] .stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
 body[data-design="bubu"] .stats .stat:last-child{grid-column:1/-1}
 body[data-design="bubu"] .stat{padding:13px!important}
 body[data-design="bubu"] .stat strong{font-size:20px!important}
 body[data-design="bubu"] .panel{padding:14px!important;border-radius:18px!important}
 body[data-design="bubu"] .theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 body[data-design="bubu"] .bubu-video-card video{max-height:210px!important}
}
`;

  function isActive() {
    return document.body && document.body.dataset.design === DESIGN;
  }
  function injectStyles() {
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = css;
      document.head.appendChild(style);
    }
  }
  function syncVideo() {
    const card = document.getElementById('bubuVideoCard');
    const video = document.getElementById('bubuCookingVideo');
    if (!card || !video) return;
    const on = localStorage.getItem(ANIMATION_KEY) !== 'off';
    const show = isActive() && on;
    card.style.display = show ? 'block' : 'none';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    if (show) {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      video.pause();
    }
  }
  function syncThemeChoice() {
    const grid = document.getElementById('designChoices');
    if (!grid || grid.querySelector('[data-design="bubu"]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-choice';
    button.dataset.design = DESIGN;
    button.innerHTML = '<span class="swatches"><i style="background:#fff0e9"></i><i style="background:#ffe0dc"></i><i style="background:#dff5ff"></i><i style="background:#ee8f91"></i></span><strong>Bubu &amp; Dudu Beach</strong><small>Beach · pastel · kawaii</small>';
    button.addEventListener('click', () => {
      if (typeof window.applyDesign === 'function') window.applyDesign(DESIGN);
      else {
        localStorage.setItem('workinglife_design', DESIGN);
        document.body.dataset.design = DESIGN;
        syncVideo();
      }
    });
    grid.appendChild(button);
  }
  function init() {
    injectStyles();
    syncThemeChoice();
    syncVideo();
    const observer = new MutationObserver(() => {
      if (isActive()) injectStyles();
      syncVideo();
    });
    observer.observe(document.body, {attributes:true,attributeFilter:['class','data-design'],subtree:false});
    document.addEventListener('click', event => {
      if (event.target.closest('.theme-choice')) setTimeout(syncVideo, 20);
    });
    document.addEventListener('change', event => {
      if (event.target && event.target.id === 'bubuAnimation') setTimeout(syncVideo, 0);
    });
    window.addEventListener('pageshow', syncVideo);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') syncVideo();
      else {
        const video = document.getElementById('bubuCookingVideo');
        if (video) video.pause();
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

/* Learning Life — Theme 7: Bubu & Dudu Beach
   Structural UI redesign. Theme 7 only; existing app functions and stored data remain intact. */
(() => {
  "use strict";
  const KEY = "workinglife_design";
  const ANIMATION_KEY = "learninglife_bubu_animation";
  const STYLE_ID = "learninglife-bubu-structural-theme";

  const pageIcons = {
    home:"🏖️", tasks:"🧸", schedule:"🌤️", money:"🐻", calendar:"🐚",
    notes:"📒", bible:"🌷", goals:"🌈", savings:"🪸", habits:"🌱",
    reminders:"⭐", reports:"🌊", weekly:"☀️", journal:"📔", settings:"⚙️"
  };
  const pageSubtitles = {
    home:"A little sunshine for your everyday plans",
    tasks:"One little step at a time",
    schedule:"Make room for the moments that matter",
    money:"A calm place to organize your money",
    calendar:"Your days, decorated with little plans",
    notes:"A cozy corner for all your thoughts",
    bible:"A quiet moment for reflection",
    goals:"Little steps can take you somewhere lovely",
    savings:"Watch your little savings grow",
    habits:"Small routines, softer days",
    reminders:"A little nudge for things that matter",
    reports:"Your month at a glance",
    weekly:"A fresh look at the week ahead",
    journal:"Keep the little memories of today",
    settings:"Make your planner feel like yours"
  };

  const css = `
/* BUBU & DUDU BEACH — complete Theme 7 layout */
body[data-design="bubu"]{
 --bg:#fff7f2!important;--panel:#fffdfb!important;--ink:#57434a!important;
 --muted:#987e86!important;--line:#f3dfe3!important;--accent:#dc8da0!important;
 --accent2:#ffe9ed!important;--shadow:0 12px 30px rgba(184,132,148,.11)!important;
 background:#fdf7f2!important;color:#57434a!important;
 font-family:"Trebuchet MS",ui-rounded,system-ui,sans-serif!important;
}
body[data-design="bubu"] *{box-sizing:border-box}
body[data-design="bubu"] .app{width:min(1440px,100%)!important;max-width:1440px!important;margin:0 auto!important;padding:22px clamp(14px,3vw,42px) 64px!important}
body[data-design="bubu"] header{
 display:flex!important;align-items:center!important;justify-content:space-between!important;
 gap:16px!important;margin:0 0 16px!important;padding:12px 20px!important;
 border:1px solid #f0dce1!important;border-radius:22px!important;
 background:#fffdfb!important;box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .brand{font-size:25px!important;font-weight:900!important;letter-spacing:-.8px!important;color:#bd718a!important}
body[data-design="bubu"] .brand:after{content:"  🐻";font-size:18px}
body[data-design="bubu"] .today{font-size:12px!important;color:#967d86!important}

/* Navigation becomes a full-width beach toolbar instead of the old sidebar */
body[data-design="bubu"] .layout{display:flex!important;flex-direction:column!important;gap:18px!important;align-items:stretch!important}
body[data-design="bubu"] nav{
 position:static!important;order:0!important;width:100%!important;height:auto!important;
 display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;align-items:center!important;
 gap:7px!important;padding:12px!important;overflow:visible!important;
 background:#fffdfb!important;border:1px solid #f0dce1!important;border-radius:22px!important;
 box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .navlabel{display:none!important}
body[data-design="bubu"] .navbtn{
 display:inline-flex!important;align-items:center!important;justify-content:center!important;
 gap:7px!important;flex:1 1 130px!important;min-width:112px!important;width:auto!important;
 min-height:42px!important;margin:0!important;padding:9px 12px!important;
 border:1px solid transparent!important;border-radius:14px!important;
 background:#fff8f7!important;color:#806a74!important;text-align:center!important;
 font-size:12px!important;font-weight:800!important;white-space:normal!important;
 transition:transform .18s,background .18s!important;
}
body[data-design="bubu"] .navbtn .ico{width:auto!important;font-size:15px!important}
body[data-design="bubu"] .navbtn.active{background:#ffe6eb!important;border-color:#f4cbd6!important;color:#ad637c!important}
body[data-design="bubu"] .navbtn:hover{transform:translateY(-1px)!important;background:#fff0f2!important}
body[data-design="bubu"] main{width:100%!important;max-width:none!important;min-width:0!important;order:1!important}

/* Feature title panels become illustrated page banners */
body[data-design="bubu"] .welcome{
 position:relative!important;overflow:hidden!important;isolation:isolate!important;
 display:flex!important;flex-direction:column!important;justify-content:center!important;
 min-height:142px!important;margin:0 0 18px!important;padding:24px 30px!important;
 border:1px solid #f1d8df!important;border-radius:26px!important;
 background:linear-gradient(110deg,#ffe7e8 0%,#fff1e8 52%,#e5f5fa 100%)!important;
 box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .welcome:before{
 content:"";position:absolute;z-index:-1;right:18px;bottom:-24px;width:190px;height:150px;
 background:url("./assets/bubu-dudu-beach.jpg") center/cover no-repeat;
 opacity:.22;border-radius:50% 50% 0 0;pointer-events:none;
}
body[data-design="bubu"] .welcome:after{
 content:"🐻  🐼";position:absolute;right:30px;bottom:16px;
 font-size:34px;letter-spacing:4px;filter:drop-shadow(0 5px 5px #a56c7a22);
}
body[data-design="bubu"] .welcome h1{position:relative;z-index:1;margin:0 0 5px!important;max-width:72%;font-size:clamp(26px,3vw,38px)!important;line-height:1.12!important;letter-spacing:-.8px!important;color:#a95f7a!important;font-weight:900!important}
body[data-design="bubu"] .welcome p{position:relative;z-index:1;max-width:70%;margin:0!important;color:#927781!important;font-size:13px!important}
body[data-design="bubu"] .section{min-width:0!important}

/* Cards use a softer editorial style with distinct surfaces and spacing */
body[data-design="bubu"] .panel,
body[data-design="bubu"] .card,
body[data-design="bubu"] .stat{
 background:#fffdfb!important;color:#57434a!important;
 border:1px solid #f1dfe3!important;border-radius:22px!important;
 box-shadow:var(--shadow)!important;
}
body[data-design="bubu"] .panel{padding:22px!important;margin:0 0 17px!important}
body[data-design="bubu"] h2{color:#a9637c!important;font-size:18px!important;font-weight:900!important;letter-spacing:-.25px!important}
body[data-design="bubu"] h3{color:#a76b80!important}
body[data-design="bubu"] .sub,body[data-design="bubu"] .empty,body[data-design="bubu"] .today,
body[data-design="bubu"] .navlabel,body[data-design="bubu"] .stat small{color:#987e86!important}
body[data-design="bubu"] .panelhead{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important}
body[data-design="bubu"] .stats{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:13px!important;margin:0 0 18px!important}
body[data-design="bubu"] .stat{padding:18px 20px!important;min-width:0!important}
body[data-design="bubu"] .stat small{display:block!important;font-size:11px!important;font-weight:700!important}
body[data-design="bubu"] .stat strong{display:block!important;margin-top:7px!important;color:#ad6a82!important;font-size:25px!important;font-weight:900!important}
body[data-design="bubu"] .btn{border:1px solid #df91a3!important;background:#df91a3!important;color:white!important;border-radius:13px!important;font-weight:800!important;padding:10px 15px!important;box-shadow:0 5px 12px #df91a32b!important}
body[data-design="bubu"] .btn.secondary,body[data-design="bubu"] .pill{background:#eaf6fa!important;border:1px solid #d9edf3!important;color:#668b9b!important;border-radius:999px!important;box-shadow:none!important}
body[data-design="bubu"] .btn.ghost{background:transparent!important;color:#a46f82!important;border:0!important;box-shadow:none!important}
body[data-design="bubu"] .field,body[data-design="bubu"] input,body[data-design="bubu"] textarea,body[data-design="bubu"] select{
 background:#fffafb!important;color:#57434a!important;border:1px solid #ecd9df!important;border-radius:13px!important;padding:11px 13px!important;
}
body[data-design="bubu"] .field:focus,body[data-design="bubu"] input:focus,body[data-design="bubu"] textarea:focus,body[data-design="bubu"] select:focus{outline:none!important;border-color:#df9dad!important;box-shadow:0 0 0 3px #fce9ed!important}
body[data-design="bubu"] .formrow{gap:10px!important;margin:13px 0!important}
body[data-design="bubu"] .moneygrid{gap:12px!important}
body[data-design="bubu"] .moneybox{padding:16px!important;background:linear-gradient(135deg,#fff0f2,#fffaf6)!important;border:1px solid #f2dce2!important;border-radius:17px!important}
body[data-design="bubu"] .moneybox small{color:#987e86!important}
body[data-design="bubu"] .moneybox b{color:#a7657d!important}
body[data-design="bubu"] .positive{color:#63977e!important}
body[data-design="bubu"] .negative{color:#c8757d!important}
body[data-design="bubu"] .rowitem,body[data-design="bubu"] .transaction{border-color:#f1e2e6!important}
body[data-design="bubu"] .time{color:#c87991!important}
body[data-design="bubu"] #calendarGrid{gap:8px!important}
body[data-design="bubu"] #calendarGrid button{border-radius:12px!important;border:1px solid #f0e0e4!important;background:#fff8f7!important;padding:10px 3px!important}
body[data-design="bubu"] #calendarGrid button:hover{background:#ffe8ed!important}
body[data-design="bubu"] .modalback{background:#61445266!important;backdrop-filter:blur(6px)!important}
body[data-design="bubu"] .modal{background:#fffdfb!important;color:#57434a!important;border:1px solid #f1dfe3!important;border-radius:24px!important;box-shadow:0 24px 70px #563c4b33!important}
body[data-design="bubu"] footer{color:#a78e96!important}

/* Home becomes a deliberate dashboard composition, not a stack of identical panels */
body[data-design="bubu"] #home{
 display:grid!important;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr)!important;
 grid-template-areas:"hero hero" "stats stats" "video tasks" "video schedule"!important;
 gap:0 18px!important;align-items:start!important;
}
body[data-design="bubu"] #home>.welcome{grid-area:hero!important}
body[data-design="bubu"] #home>.stats{grid-area:stats!important}
body[data-design="bubu"] #home>#bubuVideoCard{grid-area:video!important;align-self:stretch!important}
body[data-design="bubu"] #home>.panel:not(#bubuVideoCard):nth-of-type(3){grid-area:tasks!important}
body[data-design="bubu"] #home>.panel:not(#bubuVideoCard):nth-of-type(4){grid-area:schedule!important}
body[data-design="bubu"] .bubu-video-card{padding:13px!important;overflow:hidden!important}
body[data-design="bubu"] .bubu-video-card video{display:block!important;width:100%!important;height:auto!important;max-height:420px!important;aspect-ratio:4/5!important;object-fit:contain!important;object-position:center!important;background:#fff2f0!important;border-radius:17px!important}
body[data-design="bubu"] .bubu-video-caption{padding:10px 4px 2px!important;color:#b36e85!important;font-weight:900!important;font-size:13px!important}

/* Theme picker */
body[data-design="bubu"] .theme-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important}
body[data-design="bubu"] .theme-choice{min-width:0!important;padding:14px!important;border:1px solid #efdae0!important;border-radius:17px!important;background:#fffdfb!important;color:#57434a!important;text-align:left!important}
body[data-design="bubu"] .theme-choice.selected{border-color:#df9dad!important;background:#fff0f3!important;box-shadow:0 0 0 2px #fce5eb!important}
body[data-design="bubu"] .theme-choice strong{display:block!important;margin-top:7px!important;color:#a7657d!important}
body[data-design="bubu"] .theme-choice small{color:#987e86!important}

/* Theme 7 keeps its own bright beach palette regardless of the global dark toggle */
body.dark[data-design="bubu"]{--bg:#fff7f2!important;--panel:#fffdfb!important;--ink:#57434a!important;--muted:#987e86!important;--line:#f3dfe3!important;--accent:#dc8da0!important;--accent2:#ffe9ed!important;background:#fdf7f2!important;color:#57434a!important}
body.dark[data-design="bubu"] header,body.dark[data-design="bubu"] nav,body.dark[data-design="bubu"] .panel,body.dark[data-design="bubu"] .card,body.dark[data-design="bubu"] .stat,body.dark[data-design="bubu"] .modal{background:#fffdfb!important;color:#57434a!important;border-color:#f1dfe3!important}
body.dark[data-design="bubu"] .field,body.dark[data-design="bubu"] input,body.dark[data-design="bubu"] textarea,body.dark[data-design="bubu"] select{background:#fffafb!important;color:#57434a!important}
@media(max-width:900px){
 body[data-design="bubu"] .app{padding:14px 12px 48px!important}
 body[data-design="bubu"] nav{gap:6px!important}
 body[data-design="bubu"] .navbtn{flex:1 1 120px!important}
 body[data-design="bubu"] #home{grid-template-columns:1fr!important;grid-template-areas:"hero" "stats" "video" "tasks" "schedule"!important}
 body[data-design="bubu"] .bubu-video-card video{aspect-ratio:16/9!important;max-height:260px!important}
}
@media(max-width:560px){
 body[data-design="bubu"] .app{padding:9px 9px 34px!important}
 body[data-design="bubu"] header{padding:11px 13px!important;border-radius:17px!important}
 body[data-design="bubu"] .brand{font-size:20px!important}
 body[data-design="bubu"] nav{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;padding:9px!important}
 body[data-design="bubu"] .navbtn{min-width:0!important;flex:auto!important;min-height:42px!important;padding:8px 5px!important;font-size:11px!important}
 body[data-design="bubu"] .navbtn .ico{font-size:14px!important}
 body[data-design="bubu"] .welcome{min-height:120px!important;padding:18px!important;border-radius:21px!important}
 body[data-design="bubu"] .welcome h1{font-size:25px!important;max-width:76%!important}
 body[data-design="bubu"] .welcome p{font-size:11px!important;max-width:75%!important}
 body[data-design="bubu"] .welcome:after{right:12px!important;bottom:10px!important;font-size:25px!important}
 body[data-design="bubu"] .stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
 body[data-design="bubu"] .stats .stat:last-child{grid-column:1/-1}
 body[data-design="bubu"] .stat{padding:13px!important}
 body[data-design="bubu"] .stat strong{font-size:20px!important}
 body[data-design="bubu"] .panel{padding:14px!important;border-radius:18px!important}
 body[data-design="bubu"] .theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
`;

  function active() {
    return document.body && document.body.dataset.design === "bubu";
  }
  function applyStyle() {
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement("style");
      s.id = STYLE_ID;
      s.textContent = css;
      document.head.appendChild(s);
    }
  }
  function decorate() {
    document.querySelectorAll("main .section").forEach(section => {
      const id = section.id;
      const welcome = section.querySelector(":scope > .welcome");
      if (!welcome) return;
      welcome.dataset.bubuPage = id;
      const h = welcome.querySelector("h1");
      if (h && !h.dataset.bubuDecorated) {
        const icon = pageIcons[id] || "🐻";
        h.dataset.bubuOriginalHeading = h.textContent;
        h.dataset.bubuDecorated = "1";
        h.insertAdjacentText("afterbegin", icon + "  ");
      }
      const p = welcome.querySelector("p");
      if (p && pageSubtitles[id]) p.dataset.originalSubtitle = p.textContent;
    });
    const brand = document.getElementById("brandName");
    if (brand && !brand.dataset.bubuDecorated) {
      brand.dataset.bubuDecorated = "1";
      brand.setAttribute("aria-label", "Learning Life Bubu and Dudu Beach theme");
    }
  }
  function syncVideo() {
    const card = document.getElementById("bubuVideoCard");
    const video = document.getElementById("bubuCookingVideo");
    if (!card || !video) return;
    const show = active() && localStorage.getItem(ANIMATION_KEY) !== "off";
    card.style.display = show ? "block" : "none";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.objectFit = "contain";
    if (show) {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    } else video.pause();
  }
  function restoreDecorations() {
    document.querySelectorAll("main .section .welcome h1[data-bubu-original-heading]").forEach(h => {
      h.textContent = h.dataset.bubuOriginalHeading;
      delete h.dataset.bubuOriginalHeading;
      delete h.dataset.bubuDecorated;
    });
  }
  function sync() {
    if (active()) {
      applyStyle();
      decorate();
    } else {
      restoreDecorations();
    }
    syncVideo();
  }
  function init() {
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {attributes:true,attributeFilter:["data-design","class"]});
    document.addEventListener("click", e => {
      if (e.target.closest(".theme-choice")) setTimeout(sync, 60);
    });
    document.addEventListener("change", e => {
      if (e.target && e.target.id === "bubuAnimation") setTimeout(sync, 0);
    });
    window.addEventListener("pageshow", sync);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") syncVideo();
      else {
        const v = document.getElementById("bubuCookingVideo");
        if (v) v.pause();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
/* Learning Life — Bubu & Dudu Beach Theme 7
   Theme 7 only. Does not alter the other six themes or app data. */
(() => {
  const STYLE_ID = "learninglife-bubu-beach-v3";
  const ANIMATION_KEY = "learninglife_bubu_animation";

  const css = `
body[data-design="bubu"]{
 --bg:#fff5ef!important;--panel:#fffdfb!important;--ink:#59434b!important;
 --muted:#947c85!important;--line:#f1dce2!important;--accent:#df899b!important;
 --accent2:#ffe7eb!important;--shadow:0 10px 28px rgba(176,119,143,.12)!important;
 background:linear-gradient(180deg,#dff5fb 0,#f5fbfc 180px,#fff4ed 410px,#fff9f6 100%)!important;
 color:#59434b!important;font-family:"Trebuchet MS",system-ui,sans-serif!important;
}
body[data-design="bubu"] .app{width:100%!important;max-width:1480px!important;margin:auto!important;padding:22px clamp(12px,3vw,38px) 60px!important}
body[data-design="bubu"] header,body[data-design="bubu"] nav,body[data-design="bubu"] .panel,body[data-design="bubu"] .card,body[data-design="bubu"] .stat{
 background:#fffdfb!important;border:1px solid #f1dce2!important;border-radius:23px!important;box-shadow:var(--shadow)!important;color:#59434b!important
}
body[data-design="bubu"] header{padding:14px 20px!important;margin-bottom:20px!important}
body[data-design="bubu"] .brand{font-size:25px!important;color:#c87991!important;font-weight:900!important}
body[data-design="bubu"] .layout{display:grid!important;grid-template-columns:235px minmax(0,1fr)!important;gap:22px!important;align-items:start!important}
body[data-design="bubu"] nav{position:sticky!important;top:12px!important;display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;gap:5px!important;padding:14px!important;overflow:visible!important}
body[data-design="bubu"] .navlabel{color:#c08a9b!important;letter-spacing:1.5px!important}
body[data-design="bubu"] .navbtn{display:flex!important;width:100%!important;text-align:left!important;white-space:normal!important;padding:11px 12px!important;border:0!important;border-radius:14px!important;background:transparent!important;color:#806b76!important}
body[data-design="bubu"] .navbtn.active,body[data-design="bubu"] .navbtn:hover{background:#ffe7eb!important;color:#b66580!important}
body[data-design="bubu"] main{min-width:0!important;width:100%!important;max-width:none!important}
body[data-design="bubu"] .welcome{min-height:155px!important;padding:26px 30px!important;margin:0 0 18px!important;border:1px solid #f1d4dc!important;border-radius:27px!important;background:linear-gradient(110deg,#ffe7e8,#fff2e8 55%,#e4f6fc)!important;box-shadow:var(--shadow)!important}
body[data-design="bubu"] .welcome h1{font-size:clamp(28px,3vw,40px)!important;color:#a95f7a!important;font-weight:900!important}
body[data-design="bubu"] .welcome p{color:#92717d!important}
body[data-design="bubu"] .stats{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:13px!important;margin-bottom:18px!important}
body[data-design="bubu"] .stat{padding:18px!important}
body[data-design="bubu"] .stat small,body[data-design="bubu"] .sub,body[data-design="bubu"] .empty,body[data-design="bubu"] .today{color:#947c85!important}
body[data-design="bubu"] .stat strong{color:#a85f7a!important;font-size:24px!important}
body[data-design="bubu"] .panel{padding:22px!important;margin:0 0 17px!important}
body[data-design="bubu"] h2{color:#a9637c!important;font-weight:800!important}
body[data-design="bubu"] .btn{background:#df899b!important;color:#fff!important;border:1px solid #df899b!important;border-radius:14px!important}
body[data-design="bubu"] .btn.secondary,body[data-design="bubu"] .pill{background:#eaf7fc!important;color:#64899b!important;border-color:#dceef5!important;border-radius:999px!important;box-shadow:none!important}
body[data-design="bubu"] .field,body[data-design="bubu"] input,body[data-design="bubu"] textarea,body[data-design="bubu"] select{background:#fffafb!important;color:#59434b!important;border:1px solid #ecd5dd!important;border-radius:13px!important}
body[data-design="bubu"] .moneybox{background:#fff1f2!important;border:1px solid #f2dce3!important;border-radius:17px!important}
body[data-design="bubu"] .rowitem,body[data-design="bubu"] .transaction{border-color:#f4e3e7!important}
body[data-design="bubu"] .time{color:#c87991!important}
body[data-design="bubu"] .modalback{background:rgba(84,54,68,.42)!important;backdrop-filter:blur(5px)!important}
body[data-design="bubu"] .modal{background:#fffdfb!important;color:#59434b!important;border:1px solid #f1dce2!important;border-radius:24px!important}
body[data-design="bubu"] .bubu-video-card{padding:12px!important;background:#fffdfb!important;border:1px solid #f1dce2!important;border-radius:22px!important}
body[data-design="bubu"] .bubu-video-card video{display:block!important;width:100%!important;height:auto!important;max-height:250px!important;object-fit:contain!important;object-position:center!important;background:#fff0f1!important;border-radius:16px!important}
body[data-design="bubu"] .bubu-video-caption{color:#b96883!important;font-weight:800!important}
body[data-design="bubu"] .theme-choice{background:#fffdfb!important;color:#59434b!important;border:1px solid #efd8df!important;border-radius:17px!important}
body[data-design="bubu"] .theme-choice.selected{background:#fff0f3!important;border-color:#df9cac!important}
body.dark[data-design="bubu"]{--bg:#fff5ef!important;--panel:#fffdfb!important;--ink:#59434b!important;--muted:#947c85!important;--line:#f1dce2!important;--accent:#df899b!important;--accent2:#ffe7eb!important;background:linear-gradient(180deg,#dff5fb 0,#f5fbfc 180px,#fff4ed 410px,#fff9f6 100%)!important;color:#59434b!important}
body.dark[data-design="bubu"] header,body.dark[data-design="bubu"] nav,body.dark[data-design="bubu"] .panel,body.dark[data-design="bubu"] .card,body.dark[data-design="bubu"] .stat{background:#fffdfb!important;color:#59434b!important;border-color:#f1dce2!important}
body.dark[data-design="bubu"] .welcome{background:linear-gradient(110deg,#ffe7e8,#fff2e8 55%,#e4f6fc)!important}
body.dark[data-design="bubu"] .field,body.dark[data-design="bubu"] input,body.dark[data-design="bubu"] textarea,body.dark[data-design="bubu"] select{background:#fffafb!important;color:#59434b!important}
@media(max-width:900px){
 body[data-design="bubu"] .layout{grid-template-columns:1fr!important;gap:13px!important}
 body[data-design="bubu"] nav{position:static!important;display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;overflow-x:auto!important;gap:5px!important}
 body[data-design="bubu"] .navlabel{display:none!important}
 body[data-design="bubu"] .navbtn{width:auto!important;flex:0 0 auto!important;white-space:nowrap!important}
}
@media(max-width:560px){
 body[data-design="bubu"] .app{padding:10px 9px 36px!important}
 body[data-design="bubu"] .stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
 body[data-design="bubu"] .stat{padding:13px!important}
 body[data-design="bubu"] .stat strong{font-size:20px!important}
 body[data-design="bubu"] .welcome{padding:18px!important;min-height:125px!important}
 body[data-design="bubu"] .welcome h1{font-size:25px!important}
 body[data-design="bubu"] .panel{padding:14px!important}
 body[data-design="bubu"] .bubu-video-card video{max-height:190px!important}
}`;

  function addStyles() {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = css;
      document.head.appendChild(style);
    }
  }
  function syncVideo() {
    const card = document.getElementById("bubuVideoCard");
    const video = document.getElementById("bubuCookingVideo");
    if (!card || !video) return;
    const active = document.body.dataset.design === "bubu";
    const enabled = localStorage.getItem(ANIMATION_KEY) !== "off";
    card.style.display = active && enabled ? "block" : "none";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.objectFit = "contain";
    if (active && enabled) {
      const play = video.play();
      if (play && play.catch) play.catch(() => {});
    } else video.pause();
  }
  function init() {
    addStyles();
    syncVideo();
    new MutationObserver(() => {
      if (document.body.dataset.design === "bubu") addStyles();
      syncVideo();
    }).observe(document.body, {attributes:true,attributeFilter:["data-design","class"]});
    document.addEventListener("click", e => {
      if (e.target.closest(".theme-choice")) setTimeout(syncVideo, 40);
    });
    document.addEventListener("change", e => {
      if (e.target && e.target.id === "bubuAnimation") setTimeout(syncVideo, 0);
    });
    window.addEventListener("pageshow", syncVideo);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") syncVideo();
      else {
        const video = document.getElementById("bubuCookingVideo");
        if (video) video.pause();
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
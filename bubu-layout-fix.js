/* Learning Life — Theme 7 layout correction v50
   Preserve each feature page's native display layout. Theme 7 only. */
(() => {
  "use strict";
  const activeTheme = () => document.body && document.body.dataset.design === "bubu";

  function repairHome() {
    const home = document.getElementById("home");
    if (!home) return;
    const welcome = home.querySelector(":scope > .welcome");
    const videoCard = document.getElementById("bubuVideoCard");
    const stats = home.querySelector(".stats") || (videoCard && videoCard.querySelector(".stats"));

    // Detach dashboard stats from the video card before moving the video.
    if (stats && stats.parentElement !== home) {
      const firstContent = [...home.children].find(el =>
        el !== welcome && el !== videoCard &&
        el.classList && (el.classList.contains("panel") || el.classList.contains("stats"))
      );
      home.insertBefore(stats, firstContent || null);
    }
    if (welcome && videoCard && videoCard.parentElement !== welcome) welcome.appendChild(videoCard);
  }

  function apply() {
    if (!document.body) return;

    // IMPORTANT: never force flex/grid on every page. Restore native active-page layout.
    document.querySelectorAll("main > .section").forEach(section => {
      if (section.classList.contains("active")) {
        section.style.removeProperty("display");
      } else {
        section.style.setProperty("display", "none", "important");
      }
    });

    if (activeTheme()) {
      repairHome();
      const card = document.getElementById("bubuVideoCard");
      const video = document.getElementById("bubuCookingVideo");
      const enabled = localStorage.getItem("learninglife_bubu_animation") !== "off";
      if (card) card.style.setProperty("display", enabled ? "block" : "none", "important");
      if (video) {
        video.muted = true; video.loop = true; video.autoplay = true; video.playsInline = true;
        video.setAttribute("muted", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("playsinline", "");
        const home = document.getElementById("home");
        if (enabled && home && home.classList.contains("active")) {
          const p = video.play(); if (p && p.catch) p.catch(() => {});
        } else video.pause();
      }
    } else {
      const video = document.getElementById("bubuCookingVideo");
      if (video) video.pause();
      // Remove only our inline display overrides when leaving Theme 7.
      document.querySelectorAll("main > .section").forEach(section => section.style.removeProperty("display"));
    }
  }

  const style = document.createElement("style");
  style.id = "bubu-v50-layout-css";
  style.textContent = `
    body[data-design="bubu"] main{display:block!important;min-width:0!important}
    body[data-design="bubu"] main>.section:not(.active){display:none!important}
    body[data-design="bubu"] main>#home.section.active{
      display:flex!important;flex-direction:column!important;align-items:stretch!important;
      gap:14px!important;min-width:0!important
    }
    body[data-design="bubu"] main>#home>.welcome{
      display:flex!important;position:relative!important;flex-direction:column!important;
      justify-content:center!important;min-height:150px!important;
      padding:20px 250px 20px 24px!important;margin:0!important;
      overflow:hidden!important;box-sizing:border-box!important
    }
    body[data-design="bubu"] main>#home>.welcome:after{display:none!important;content:none!important}
    body[data-design="bubu"] main>#home>.welcome:before{opacity:.12!important;pointer-events:none!important}
    body[data-design="bubu"] main>#home>.welcome #bubuVideoCard{
      display:block!important;position:absolute!important;right:12px!important;top:10px!important;
      bottom:10px!important;width:220px!important;height:auto!important;min-height:0!important;
      margin:0!important;padding:3px!important;box-sizing:border-box!important;
      overflow:hidden!important;border-radius:15px!important;z-index:2!important
    }
    body[data-design="bubu"] main>#home>.welcome #bubuCookingVideo{
      display:block!important;width:100%!important;height:100%!important;max-height:none!important;
      aspect-ratio:16/9!important;object-fit:contain!important;background:#fff1ef!important;
      border-radius:11px!important
    }
    body[data-design="bubu"] main>#home>.welcome .bubu-video-caption{display:none!important}
    body[data-design="bubu"] main>#home>.stats{
      display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:10px!important;margin:0!important
    }
    body[data-design="bubu"] main>#home>.stats .stat{min-width:0!important}
    body[data-design="bubu"] main>#home>.stats .stat:nth-child(3){display:none!important}
    body[data-design="bubu"] main>#home>.panel{
      display:block!important;width:auto!important;min-width:0!important;margin:0!important
    }
    body[data-design="bubu"] main>#home>.panel#bubuVideoCard{display:none!important}
    /* Settings is a two-column layout on wide screens and one column on narrow screens. */
    body[data-design="bubu"] #settings.section.active{
      display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:14px!important;align-items:start!important
    }
    body[data-design="bubu"] #settings>.welcome{
      grid-column:1/-1!important;width:auto!important;min-width:0!important
    }
    body[data-design="bubu"] #settings>.panel{
      display:block!important;width:auto!important;min-width:0!important;max-width:none!important
    }
    body[data-design="bubu"] #settings .theme-grid{
      grid-template-columns:repeat(2,minmax(0,1fr))!important
    }
    @media(max-width:700px){
      body[data-design="bubu"] main>#home>.welcome{
        min-height:128px!important;padding:14px 132px 14px 16px!important
      }
      body[data-design="bubu"] main>#home>.welcome #bubuVideoCard{
        right:7px!important;top:7px!important;bottom:7px!important;width:116px!important
      }
      body[data-design="bubu"] #settings.section.active{grid-template-columns:minmax(0,1fr)!important}
      body[data-design="bubu"] #settings>.welcome{grid-column:1!important}
    }
    @media(max-width:380px){
      body[data-design="bubu"] main>#home>.welcome{padding-right:108px!important;min-height:118px!important}
      body[data-design="bubu"] main>#home>.welcome #bubuVideoCard{width:94px!important}
    }
  `;
  document.head.appendChild(style);

  function init() {
    apply();
    document.addEventListener("click", e => {
      if (e.target.closest(".navbtn,.theme-choice,[onclick*='showPage']")) setTimeout(apply, 80);
    }, true);
    document.addEventListener("change", e => {
      if (e.target && e.target.id === "bubuAnimation") setTimeout(apply, 80);
    }, true);
    const observer = new MutationObserver(() => {
      if (activeTheme()) apply();
      else {
        document.querySelectorAll("main > .section").forEach(section => section.style.removeProperty("display"));
        const video = document.getElementById("bubuCookingVideo"); if (video) video.pause();
      }
    });
    observer.observe(document.body, {attributes:true,attributeFilter:["data-design"]});
    window.addEventListener("pageshow", apply);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
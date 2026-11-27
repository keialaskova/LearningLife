/* Learning Life — Theme 7 structural layout repair v49 */
(() => {
  "use strict";
  const isBubu = () => document.body && document.body.dataset.design === "bubu";

  function repairHome() {
    const home = document.getElementById("home");
    if (!home) return;
    const welcome = home.querySelector(":scope > .welcome");
    const videoCard = document.getElementById("bubuVideoCard");
    const stats = home.querySelector(".stats") || (videoCard && videoCard.querySelector(".stats"));

    // The current HTML accidentally nests the stats inside the video card.
    // Detach the stats first so moving the video card cannot carry the dashboard with it.
    if (stats && stats.parentElement !== home) {
      const firstPanel = [...home.children].find(el =>
        el.classList && el.classList.contains("panel") && el !== videoCard && !el.classList.contains("stats")
      );
      home.insertBefore(stats, firstPanel || null);
    }

    // Put the actual video card in the welcome banner, beside the greeting.
    if (welcome && videoCard && videoCard.parentElement !== welcome) {
      welcome.appendChild(videoCard);
    }

    if (welcome) {
      welcome.querySelectorAll(".bubu-page-sticker,.bubu-home-sticker").forEach(el => el.remove());
    }
  }

  function apply() {
    if (!document.body) return;
    // The old #home { display:grid!important } selector overrode .section{display:none}.
    document.querySelectorAll("main > .section").forEach(section => {
      section.style.setProperty("display",
        section.classList.contains("active") ? "flex" : "none", "important");
    });
    repairHome();
    if (isBubu()) {
      const v = document.getElementById("bubuCookingVideo");
      const card = document.getElementById("bubuVideoCard");
      const enabled = localStorage.getItem("learninglife_bubu_animation") !== "off";
      if (card) card.style.setProperty("display", enabled ? "block" : "none", "important");
      if (v) {
        v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
        v.setAttribute("muted", ""); v.setAttribute("autoplay", ""); v.setAttribute("playsinline", "");
        if (enabled && document.getElementById("home").classList.contains("active")) {
          const p = v.play(); if (p && p.catch) p.catch(() => {});
        } else v.pause();
      }
    } else {
      const v = document.getElementById("bubuCookingVideo");
      if (v) v.pause();
    }
  }

  const css = document.createElement("style");
  css.id = "bubu-v49-structural-css";
  css.textContent = `
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
      gap:10px!important;margin:0!important;grid-area:auto!important
    }
    body[data-design="bubu"] main>#home>.stats .stat{min-width:0!important}
    body[data-design="bubu"] main>#home>.stats .stat:nth-child(3){display:none!important}
    body[data-design="bubu"] main>#home>.panel{
      display:block!important;grid-area:auto!important;width:auto!important;min-width:0!important;
      margin:0!important
    }
    body[data-design="bubu"] main>#home>.panel#bubuVideoCard{display:none!important}
    body[data-design="bubu"] .bubu-page-sticker{pointer-events:none!important}
    @media(max-width:700px){
      body[data-design="bubu"] main>#home>.welcome{
        min-height:128px!important;padding:14px 132px 14px 16px!important
      }
      body[data-design="bubu"] main>#home>.welcome #bubuVideoCard{
        right:7px!important;top:7px!important;bottom:7px!important;width:116px!important
      }
    }
    @media(max-width:380px){
      body[data-design="bubu"] main>#home>.welcome{padding-right:108px!important;min-height:118px!important}
      body[data-design="bubu"] main>#home>.welcome #bubuVideoCard{width:94px!important}
    }
  `;
  document.head.appendChild(css);

  function start() {
    apply();
    document.addEventListener("click", e => {
      if (e.target.closest(".navbtn,.theme-choice,[onclick*='showPage']")) setTimeout(apply, 80);
    }, true);
    document.addEventListener("change", e => {
      if (e.target && (e.target.id === "bubuAnimation" || e.target.classList.contains("theme-choice"))) setTimeout(apply, 80);
    }, true);
    const observer = new MutationObserver(() => {
      if (isBubu()) apply();
      else {
        document.querySelectorAll("main > .section").forEach(section => {
          section.style.removeProperty("display");
        });
        const v = document.getElementById("bubuCookingVideo"); if (v) v.pause();
      }
    });
    observer.observe(document.body, {attributes:true,attributeFilter:["data-design"]});
    window.addEventListener("pageshow", apply);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();
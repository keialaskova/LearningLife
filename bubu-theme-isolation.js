/* Learning Life — Theme 7 isolation repair v54
   Keeps Bubu & Dudu DOM changes out of the original six themes. */
(() => {
  "use strict";
  const isBubu = () => document.body?.dataset.design === "bubu";

  function restoreNonBubu() {
    if (isBubu()) return;

    const home = document.getElementById("home");
    const welcome = home?.querySelector(":scope > .welcome");
    const card = document.getElementById("bubuVideoCard");
    const video = document.getElementById("bubuCookingVideo");
    const stickerPanel = document.getElementById("bubuStickerSettings");

    // The older sticker script moves the video card into the welcome banner
    // even when Theme 7 is not selected. Return it to Home and keep it hidden.
    if (card && home && welcome && card.parentElement !== home) {
      home.insertBefore(card, welcome.nextSibling);
    }
    if (video) video.pause();
    if (card) {
      card.hidden = true;
      card.style.setProperty("display", "none", "important");
    }

    // Sticker picker and page decorations belong exclusively to Theme 7.
    if (stickerPanel) stickerPanel.hidden = true;
    document.querySelectorAll(".bubu-page-sticker").forEach(el => el.remove());
    document.querySelectorAll(".bubu-home-sticker").forEach(el => el.remove());
    const welcomeVideo = document.getElementById("bubuWelcomeVideo");
    if (welcomeVideo) welcomeVideo.remove();
  }

  function sync() {
    if (isBubu()) {
      const panel = document.getElementById("bubuStickerSettings");
      if (panel) panel.hidden = false;
      return;
    }
    restoreNonBubu();
  }

  // Run after the existing Theme 7 scripts, including their deferred click handlers.
  function later() {
    window.setTimeout(sync, 120);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", later, { once: true });
  } else {
    later();
  }

  document.addEventListener("click", e => {
    if (e.target.closest(".theme-choice,.navbtn")) later();
  }, true);
  document.addEventListener("change", e => {
    if (e.target?.id === "bubuAnimation") later();
  }, true);
  new MutationObserver(() => {
    if (!isBubu()) restoreNonBubu();
  }).observe(document.body, { attributes: true, attributeFilter: ["data-design"] });
  window.addEventListener("pageshow", later);
})();

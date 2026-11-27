/* Learning Life — Bubu & Dudu Theme 7 helper
   Theme styling, theme selection, and the Animation On/Off preference live in index.html.
   This helper only reinforces muted inline playback and never inserts duplicate UI. */
(() => {
  const key = 'workinglife_design';
  const animationKey = 'learninglife_bubu_animation';

  function sync() {
    const video = document.getElementById('bubuCookingVideo');
    const card = document.getElementById('bubuVideoCard');
    if (!video || !card) return;

    const isBubu = document.body.dataset.design === 'bubu' ||
      localStorage.getItem(key) === 'bubu';
    const animationOn = localStorage.getItem(animationKey) !== 'off';
    const show = isBubu && animationOn;

    card.style.display = show ? 'block' : 'none';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    if (show) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } else {
      video.pause();
    }
  }

  document.addEventListener('DOMContentLoaded', sync);
  window.addEventListener('pageshow', sync);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') sync();
    else {
      const video = document.getElementById('bubuCookingVideo');
      if (video) video.pause();
    }
  });

  // Re-check after a theme choice is clicked without replacing the app's handlers.
  document.addEventListener('click', event => {
    if (event.target.closest('.theme-choice')) setTimeout(sync, 0);
  });
})();

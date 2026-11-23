// Keep Goal Milestones in sync with the saved Goals list without a page refresh.
(function () {
  function connectGoalRefresh() {
    const goalList = document.getElementById('goalList');
    const milestoneSelect = document.getElementById('milestoneGoal');
    if (!goalList || !milestoneSelect || typeof window.renderMilestones !== 'function') return;

    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        if (typeof window.renderMilestones === 'function') window.renderMilestones();
      });
    });
    observer.observe(goalList, { childList: true, subtree: true });
    window.addEventListener('pageshow', () => {
      if (typeof window.renderMilestones === 'function') window.renderMilestones();
    });
    window.renderMilestones();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectGoalRefresh, { once: true });
  } else {
    connectGoalRefresh();
  }
})();

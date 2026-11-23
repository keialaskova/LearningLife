// Keep Goal Milestones synchronized whenever the Goals list is rendered.
(function () {
  function installGoalRefresh() {
    if (typeof window.renderGoals !== 'function' ||
        typeof window.renderMilestones !== 'function' ||
        window.renderGoals.__milestoneRefreshInstalled) return;

    const originalRenderGoals = window.renderGoals;
    function refreshedRenderGoals() {
      const result = originalRenderGoals.apply(this, arguments);
      if (typeof window.renderMilestones === 'function') {
        window.renderMilestones();
      }
      return result;
    }
    refreshedRenderGoals.__milestoneRefreshInstalled = true;
    window.renderGoals = refreshedRenderGoals;

    // Keep the dropdown correct on initial load as well.
    window.renderMilestones();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installGoalRefresh, { once: true });
  } else {
    installGoalRefresh();
  }
})();

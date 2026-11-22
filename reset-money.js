(() => {
  'use strict';
  const section = document.getElementById('money');
  if (!section || document.getElementById('moneyResetPanel')) return;
  const panel = document.createElement('div');
  panel.id = 'moneyResetPanel';
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="panelhead"><div><h2>Start Money Tracker Fresh</h2><div class="sub">Reset Money Tracker records without affecting your Debt Tracker or other app features.</div></div></div>
    <button class="btn ghost" id="moneyResetButton" type="button">Reset Money Tracker</button>
    <div class="sub" style="margin-top:8px">This removes starting balances, income and expense transactions, transfers, and monthly budgets only.</div>`;
  const toolsPanel = document.getElementById('financeToolsPanel');
  if (toolsPanel) toolsPanel.append(panel); else section.append(panel);
  document.getElementById('moneyResetButton').addEventListener('click', () => {
    const ok = window.confirm('Reset Money Tracker? This will permanently clear starting balances, income and expense transactions, transfer history, and monthly budgets on this device. Debt Tracker records and all other LearningLife data will remain. Continue?');
    if (!ok) return;
    ['myday_transactions', 'myday_transfers', 'myday_startingBalances', 'myday_budgets'].forEach(key => localStorage.removeItem(key));
    window.alert('Money Tracker has been reset. Your Debt Tracker and other LearningLife data were not changed.');
    window.location.reload();
  });
})();

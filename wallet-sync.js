(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const accounts = ['Cash', 'GCash', 'SeaBank', 'Bank Account'];
  const read = key => {
    try { return JSON.parse(localStorage.getItem('myday_' + key) || 'null'); }
    catch { return null; }
  };
  const normalize = name => name === 'MariBank' ? 'SeaBank' : name === 'Other Bank' ? 'Bank Account' : accounts.includes(name) ? name : 'Cash';
  const peso = value => '₱' + Number(value || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function refreshWallets() {
    const starts = read('startingBalances') || {};
    const transactions = read('transactions');
    const transfers = read('transfers');
    const tx = Array.isArray(transactions) ? transactions : [];
    const tr = Array.isArray(transfers) ? transfers : [];
    const balance = wallet => Number(starts[wallet] || starts[wallet === 'SeaBank' ? 'MariBank' : wallet === 'Bank Account' ? 'Other Bank' : wallet] || 0)
      + tx.reduce((sum, item) => sum + (normalize(item.wallet || 'Cash') === wallet ? (item.type === 'income' ? 1 : -1) * Number(item.amount || 0) : 0), 0)
      + tr.reduce((sum, item) => sum + (normalize(item.to) === wallet ? Number(item.amount || 0) : 0) - (normalize(item.from) === wallet ? Number(item.amount || 0) : 0), 0);

    const walletArea = $('walletBalances');
    if (walletArea) {
      walletArea.innerHTML = '';
      accounts.forEach(wallet => {
        const card = document.createElement('div'); card.className = 'moneybox';
        const label = document.createElement('small'); label.textContent = wallet;
        const amount = document.createElement('b'); amount.textContent = peso(balance(wallet));
        amount.className = balance(wallet) < 0 ? 'negative' : 'positive';
        card.append(label, amount); walletArea.append(card);
      });
    }
    const total = accounts.reduce((sum, wallet) => sum + balance(wallet), 0);
    const set = (id, value) => { const node = $(id); if (node) node.textContent = peso(value); };
    set('ftStartTotal', accounts.reduce((sum, wallet) => sum + Number(starts[wallet] || 0), 0));
    set('ftIncome', tx.filter(item => item.type === 'income').reduce((sum, item) => sum + Number(item.amount || 0), 0));
    set('ftExpense', tx.filter(item => item.type === 'expense').reduce((sum, item) => sum + Number(item.amount || 0), 0));
    set('ftAvailable', total); set('moneyBalance', total); set('balanceStat', total);
  }

  function install() {
    const form = $('moneyForm');
    if (form && !form.dataset.walletSyncBound) {
      form.dataset.walletSyncBound = '1';
      form.addEventListener('submit', () => setTimeout(refreshWallets, 0));
    }
    const transferForm = $('transferForm');
    if (transferForm && !transferForm.dataset.walletSyncBound) {
      transferForm.dataset.walletSyncBound = '1';
      transferForm.addEventListener('submit', () => setTimeout(refreshWallets, 0));
    }
    if (typeof window.renderMoney === 'function' && !window.renderMoney.__walletSyncWrapped) {
      const original = window.renderMoney;
      const wrapped = function () { const result = original.apply(this, arguments); refreshWallets(); return result; };
      wrapped.__walletSyncWrapped = true;
      window.renderMoney = wrapped;
    }
    refreshWallets();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();

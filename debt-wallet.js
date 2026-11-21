/* LearningLife: connect debt repayments to wallet expenses.
   Loaded after debt.js and transfer.js. Existing records are preserved. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem('myday_' + key)) ?? fallback; }
    catch { return fallback; }
  };
  const write = (key, value) => localStorage.setItem('myday_' + key, JSON.stringify(value));
  const accounts = ['Cash', 'GCash', 'SeaBank', 'Bank Account'];
  const form = $('dtPaymentForm');
  if (!form || form.dataset.walletPatch === '1') return;
  form.dataset.walletPatch = '1';

  const row = document.createElement('div');
  row.className = 'formrow';
  const wallet = document.createElement('select');
  wallet.className = 'field';
  wallet.id = 'dtPayWallet';
  wallet.required = true;
  wallet.setAttribute('aria-label', 'Pay from wallet');
  accounts.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = 'Pay from: ' + name;
    wallet.append(option);
  });
  row.append(wallet);
  const dateRow = $('dtPayDate')?.closest('.formrow');
  if (dateRow) form.insertBefore(row, dateRow);
  else form.insertBefore(row, form.querySelector('button'));

  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const debtId = $('dtPayAccount').value;
    const amount = Number($('dtPayAmount').value);
    const date = $('dtPayDate').value;
    const note = $('dtPayNote').value.trim();
    const chosenWallet = wallet.value;
    const debts = read('debtAccounts', []);
    const payments = read('debtPayments', []);
    const debt = debts.find(item => item.id === debtId);
    if (!debt) { alert('Choose a debt first.'); return; }
    if (!(amount > 0) || !Number.isFinite(amount)) { alert('Enter a valid payment amount.'); return; }
    const alreadyPaid = payments.filter(p => p.accountId === debtId)
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);
    if (amount > Number(debt.principal || 0) - alreadyPaid + 0.000001) {
      alert('Payment cannot be greater than the remaining debt.'); return;
    }

    const transactions = read('transactions', []);
    const normalize = name => name === 'SeaBank' ? 'MariBank' :
      name === 'Bank Account' ? 'Other Bank' : name;
    const walletName = normalize(chosenWallet);
    const walletBalance = transactions.reduce((sum, t) => {
      if ((t.wallet || 'Cash') !== walletName) return sum;
      return sum + (t.type === 'income' ? 1 : -1) * Number(t.amount || 0);
    }, 0);
    const transfers = read('transfers', []);
    const transferBalance = transfers.reduce((sum, t) => {
      const from = normalize(t.from), to = normalize(t.to);
      return sum + (to === walletName ? Number(t.amount || 0) : 0)
        - (from === walletName ? Number(t.amount || 0) : 0);
    }, 0);
    if (amount > walletBalance + transferBalance + 0.000001) {
      alert('This payment is greater than the recorded balance in ' + chosenWallet + '. Check the wallet balance first.');
      return;
    }

    const paymentId = 'payment-' + Date.now() + '-' + Math.random().toString(16).slice(2);
    const transactionId = 'debt-payment-expense-' + paymentId;
    payments.push({ id: paymentId, accountId: debtId, amount, date, note, wallet: chosenWallet, transactionId });
    transactions.push({
      id: transactionId, type: 'expense', amount, wallet: walletName,
      category: 'Debt payment · ' + debt.name,
      date, debtPaymentId: paymentId
    });
    write('debtPayments', payments);
    write('transactions', transactions);
    form.reset();
    $('dtPayDate').value = new Date().toISOString().slice(0, 10);
    wallet.value = 'Cash';
    location.reload();
  }, true);

  // When the user confirms deletion in the existing debt history handler,
  // remove the matching Money Tracker expense as well.
  const history = $('dtHistory');
  if (history) history.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.textContent.trim() !== 'Delete') return;
    const rowElement = button.closest('.transaction');
    if (!rowElement) return;
    const payments = read('debtPayments', []);
    const sorted = [...payments].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const index = [...history.children].indexOf(rowElement);
    const payment = sorted[index];
    if (!payment || !payment.transactionId) return;
    const originalConfirm = window.confirm;
    window.confirm = message => {
      const accepted = originalConfirm.call(window, message);
      if (accepted) {
        const txs = read('transactions', []);
        write('transactions', txs.filter(t => t.id !== payment.transactionId));
      }
      return accepted;
    };
    setTimeout(() => { window.confirm = originalConfirm; }, 0);
  }, true);
})();

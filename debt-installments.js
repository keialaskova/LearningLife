/* LearningLife: show every installment choice from 1 through 12. */
(() => {
  'use strict';
  const select = document.getElementById('dtInstallments');
  if (!select) return;
  const previous = select.value || '1';
  select.innerHTML = Array.from({length: 12}, (_, i) =>
    `<option value="${i + 1}">${i + 1 === 1 ? 'One payment' : `${i + 1} monthly installments`}</option>`
  ).join('');
  select.value = Number(previous) >= 1 && Number(previous) <= 12 ? previous : '1';
})();

/* LearningLife Debt Tracker update. Keeps legacy myday_debts intact. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const peso = n => '₱' + Number(n || 0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
  const todayKey = () => new Date().toISOString().slice(0,10);
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  let accounts = read('myday_debtAccounts', null);
  let payments = read('myday_debtPayments', null);

  // One-time, non-destructive migration: legacy Shopee Credit activity is copied
  // into the new tracker. The original myday_debts key is never changed or deleted.
  if (!Array.isArray(accounts)) {
    const old = read('myday_debts', []);
    const borrowed = old.filter(x=>x.action==='borrow').reduce((s,x)=>s+Number(x.amount||0),0);
    const legacyPayments = old.filter(x=>x.action==='payment');
    accounts = borrowed > 0 ? [{
      id:'legacy-shopee-credit', name:'Shopee Credit', category:'Buy now, pay later',
      principal:borrowed, date:old.find(x=>x.action==='borrow')?.date || todayKey(),
      dueDate:'', installments:1, note:'Migrated from your previous Shopee Credit tracker'
    }] : [];
    payments = borrowed > 0 ? legacyPayments.map((x,i)=>({
      id:'legacy-payment-'+i, accountId:'legacy-shopee-credit',
      amount:Number(x.amount||0), date:x.date||todayKey(), note:x.note||'Previous Shopee Credit payment'
    })) : [];
    write('myday_debtAccounts', accounts);
    write('myday_debtPayments', payments);
  }
  if (!Array.isArray(payments)) payments = [];

  const panel = $('debtForm')?.closest('.panel');
  if (!panel) return;
  panel.innerHTML = `
    <div class="panelhead"><div><h2>Debt Tracker</h2><div class="sub">Manage different debts, installments, and repayments</div></div><span class="pill">₱ PHP</span></div>
    <div class="moneygrid">
      <div class="moneybox"><small>Total borrowed</small><b id="dtBorrowed">₱0.00</b></div>
      <div class="moneybox"><small>Total paid</small><b id="dtPaid">₱0.00</b></div>
      <div class="moneybox"><small>Outstanding</small><b class="negative" id="dtBalance">₱0.00</b></div>
    </div>
    <h2 style="margin:18px 0 8px">Add a debt</h2>
    <form id="dtAccountForm">
      <div class="formrow"><input class="field" id="dtName" placeholder="Debt name (e.g. Phone installment)" required><select class="field" id="dtCategory"><option>Personal loan</option><option>Buy now, pay later</option><option>Credit card</option><option>Family / friend</option><option>Shopping</option><option>Education</option><option>Other</option></select></div>
      <div class="formrow"><input class="field" id="dtPrincipal" type="number" min="0.01" step="0.01" placeholder="Total amount (₱)" required><input class="field" id="dtDate" type="date" required></div>
      <div class="formrow"><input class="field" id="dtDue" type="date" aria-label="First due date (optional)"><select class="field" id="dtInstallments"><option value="1">One payment</option><option value="2">2 monthly installments</option><option value="3">3 monthly installments</option><option value="4">4 monthly installments</option><option value="6">6 monthly installments</option><option value="9">9 monthly installments</option><option value="12">12 monthly installments</option><option value="18">18 monthly installments</option><option value="24">24 monthly installments</option></select></div>
      <div class="formrow"><input class="field" id="dtNote" placeholder="Note (optional)"></div>
      <button class="btn">Save debt</button>
    </form>
    <div class="sub" style="margin-top:8px">Installments are estimated as equal monthly amounts. Check your lender's actual fees and due dates.</div>
    <div class="divider" style="border-top:1px solid var(--line);margin:20px 0"></div>
    <h2>Record a payment</h2>
    <form id="dtPaymentForm">
      <div class="formrow"><select class="field" id="dtPayAccount" required><option value="">Choose a debt</option></select><input class="field" id="dtPayAmount" type="number" min="0.01" step="0.01" placeholder="Payment amount (₱)" required></div>
      <div class="formrow"><input class="field" id="dtPayDate" type="date" required><input class="field" id="dtPayNote" placeholder="Payment note (optional)"></div>
      <button class="btn">Save payment</button>
    </form>
    <div class="divider" style="border-top:1px solid var(--line);margin:20px 0"></div>
    <div class="panelhead"><div><h2>My debts</h2><div class="sub">Balances and installment progress</div></div></div>
    <div id="dtAccounts"></div>
    <div class="divider" style="border-top:1px solid var(--line);margin:20px 0"></div>
    <div class="panelhead"><h2>Monthly debt report</h2><input class="field" id="dtMonth" type="month" style="max-width:165px"></div>
    <div class="moneygrid"><div class="moneybox"><small>Borrowed this month</small><b id="dtMonthBorrowed">₱0.00</b></div><div class="moneybox"><small>Paid this month</small><b id="dtMonthPaid">₱0.00</b></div><div class="moneybox"><small>Payments recorded</small><b id="dtMonthCount">0</b></div></div>
    <div class="divider" style="border-top:1px solid var(--line);margin:20px 0"></div>
    <h2>Payment history</h2><div id="dtHistory"></div>
  `;

  const totalPaid = id => payments.filter(p=>p.accountId===id).reduce((s,p)=>s+Number(p.amount||0),0);
  const balance = a => Math.max(0, Number(a.principal||0)-totalPaid(a.id));
  const fmtDate = s => s ? new Date(s+'T12:00:00').toLocaleDateString('en-PH',{year:'numeric',month:'short',day:'numeric'}) : 'No due date';
  const saveAll = () => { write('myday_debtAccounts',accounts); write('myday_debtPayments',payments); };
  function render() {
    const borrowed=accounts.reduce((s,a)=>s+Number(a.principal||0),0);
    const paid=payments.reduce((s,p)=>s+Number(p.amount||0),0);
    $('dtBorrowed').textContent=peso(borrowed); $('dtPaid').textContent=peso(paid); $('dtBalance').textContent=peso(Math.max(0,borrowed-paid));
    const select=$('dtPayAccount'), prior=select.value;
    select.innerHTML='<option value="">Choose a debt</option>';
    accounts.filter(a=>balance(a)>0).forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.name+' — '+peso(balance(a));select.append(o)});
    if(accounts.some(a=>a.id===prior && balance(a)>0))select.value=prior;
    const area=$('dtAccounts');area.innerHTML='';
    accounts.forEach(a=>{
      const paidFor=totalPaid(a.id), due=balance(a), pct=a.principal?Math.min(100,paidFor/a.principal*100):0;
      const row=document.createElement('div');row.className='panel';row.style.margin='12px 0';row.style.padding='14px';
      const top=document.createElement('div');top.className='panelhead';
      const title=document.createElement('div');const strong=document.createElement('strong');strong.textContent=a.name;const small=document.createElement('small');small.className='sub';small.textContent=a.category+' · Borrowed '+fmtDate(a.date);title.append(strong,small);
      const status=document.createElement('span');status.className='pill';status.textContent=due<=0?'Paid':(a.dueDate && a.dueDate<todayKey()?'Overdue':'Unpaid');top.append(title,status);
      const nums=document.createElement('div');nums.className='moneygrid';[['Original',a.principal],['Paid',paidFor],['Remaining',due]].forEach(([label,val])=>{const b=document.createElement('div');b.className='moneybox';const sm=document.createElement('small');sm.textContent=label;const v=document.createElement('b');v.textContent=peso(val);b.append(sm,v);nums.append(b)});
      const track=document.createElement('div');track.style.cssText='height:8px;background:var(--line);border-radius:20px;overflow:hidden;margin:10px 0 4px';const bar=document.createElement('div');bar.style.cssText='height:100%;width:'+pct+'%;background:var(--accent);border-radius:20px';track.append(bar);
      const meta=document.createElement('div');meta.className='sub';const n=Math.max(1,Number(a.installments||1));meta.textContent='Installments: '+n+' · Estimated monthly amount: '+peso(Number(a.principal||0)/n)+' · First due: '+fmtDate(a.dueDate);
      row.append(top,nums,track,meta);
      if(a.note){const note=document.createElement('div');note.className='sub';note.textContent=a.note;row.append(note)}
      const sched=document.createElement('div');sched.className='sub';sched.style.marginTop='7px';
      if(a.dueDate && n>1){const dueList=[];for(let i=0;i<n;i++){const d=new Date(a.dueDate+'T12:00:00');d.setMonth(d.getMonth()+i);dueList.push(d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}))}sched.textContent='Estimated schedule: '+dueList.join(' · ')}
      row.append(sched);
      const del=document.createElement('button');del.className='btn ghost';del.textContent='Delete debt';del.onclick=()=>{if(!confirm('Delete this debt and its payment history?'))return;accounts=accounts.filter(x=>x.id!==a.id);payments=payments.filter(x=>x.accountId!==a.id);saveAll();render()};
      row.append(del);area.append(row);
    });
    if(!accounts.length)area.innerHTML='<div class="empty">No debts yet. Add your first debt above.</div>';
    const history=$('dtHistory');history.innerHTML='';
    [...payments].sort((a,b)=>(b.date||'').localeCompare(a.date||'')).forEach(p=>{const a=accounts.find(x=>x.id===p.accountId);const row=document.createElement('div');row.className='transaction';const left=document.createElement('div');left.textContent=a?a.name:'Debt payment';const sm=document.createElement('small');sm.textContent=fmtDate(p.date)+(p.note?' · '+p.note:'');left.append(sm);const amount=document.createElement('strong');amount.className='positive';amount.textContent='−'+peso(p.amount);const del=document.createElement('button');del.className='btn ghost';del.textContent='Delete';del.onclick=()=>{if(!confirm('Delete this payment record? The balance will increase again.'))return;payments=payments.filter(x=>x.id!==p.id);saveAll();render()};row.append(left,amount,del);history.append(row)});
    if(!payments.length)history.innerHTML='<div class="empty">No payments recorded yet.</div>';
    renderMonth();
  }
  function renderMonth(){
    const month=$('dtMonth').value;const borrowed=accounts.filter(a=>(a.date||'').slice(0,7)===month).reduce((s,a)=>s+Number(a.principal||0),0);
    const ps=payments.filter(p=>(p.date||'').slice(0,7)===month);$('dtMonthBorrowed').textContent=peso(borrowed);$('dtMonthPaid').textContent=peso(ps.reduce((s,p)=>s+Number(p.amount||0),0));$('dtMonthCount').textContent=String(ps.length);
  }
  $('dtDate').value=todayKey();$('dtPayDate').value=todayKey();$('dtMonth').value=todayKey().slice(0,7);
  $('dtAccountForm').onsubmit=e=>{e.preventDefault();const principal=Number($('dtPrincipal').value);if(!(principal>0))return;
    accounts.push({id:'debt-'+Date.now()+'-'+Math.random().toString(16).slice(2),name:$('dtName').value.trim(),category:$('dtCategory').value,principal,date:$('dtDate').value,dueDate:$('dtDue').value,installments:Number($('dtInstallments').value),note:$('dtNote').value.trim()});
    saveAll();$('dtAccountForm').reset();$('dtDate').value=todayKey();render();
  };
  $('dtPaymentForm').onsubmit=e=>{e.preventDefault();const id=$('dtPayAccount').value,amount=Number($('dtPayAmount').value),a=accounts.find(x=>x.id===id);if(!a){alert('Choose a debt first.');return}if(!(amount>0)){alert('Enter a payment amount greater than zero.');return}if(amount>balance(a)+0.000001){alert('Payment cannot be greater than the remaining balance.');return}
    payments.push({id:'payment-'+Date.now()+'-'+Math.random().toString(16).slice(2),accountId:id,amount,date:$('dtPayDate').value,note:$('dtPayNote').value.trim()});saveAll();$('dtPaymentForm').reset();$('dtPayDate').value=todayKey();render();
  };
  $('dtMonth').onchange=renderMonth;
  render();
})();
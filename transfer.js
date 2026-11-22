(() => {
'use strict';
const $=id=>document.getElementById(id);
const money=n=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>new Date().toISOString().slice(0,10);
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const accounts=['Cash','GCash','SeaBank','Bank Account'];
let transfers=read('myday_transfers',[]);if(!Array.isArray(transfers))transfers=[];
const loadTransfers=()=>{const saved=read('myday_transfers',[]);return Array.isArray(saved)?saved:[]};
const normalize=n=>n==='MariBank'?'SeaBank':n==='Other Bank'?'Bank Account':accounts.includes(n)?n:'Cash';

// Always calculate from saved records. Do not read balances from rendered cards.
function currentBalance(wallet){
 const starts=read('myday_startingBalances',{}),tx=read('myday_transactions',[]),saved=loadTransfers();
 const list=Array.isArray(tx)?tx:[];
 return Number(starts[wallet]||0)
  +list.reduce((sum,t)=>sum+(normalize(t.wallet||'Cash')===wallet?(t.type==='income'?1:-1)*Number(t.amount||0):0),0)
  +saved.reduce((sum,t)=>sum+(normalize(t.to)===wallet?Number(t.amount||0):0)-(normalize(t.from)===wallet?Number(t.amount||0):0),0);
}
function refreshFinanceDisplays(){
 const tx=read('myday_transactions',[]),starts=read('myday_startingBalances',{}),saved=loadTransfers();
 const list=Array.isArray(tx)?tx:[];
 const income=list.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount||0),0);
 const expense=list.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0);
 const balance=w=>Number(starts[w]||0)+list.reduce((s,t)=>s+(normalize(t.wallet||'Cash')===w?(t.type==='income'?1:-1)*Number(t.amount||0):0),0)+saved.reduce((s,t)=>s+(normalize(t.to)===w?Number(t.amount||0):0)-(normalize(t.from)===w?Number(t.amount||0):0),0);
 const total=accounts.reduce((s,w)=>s+balance(w),0);
 const set=(id,value)=>{const el=$(id);if(el)el.textContent=money(value)};
 set('ftStartTotal',accounts.reduce((s,w)=>s+Number(starts[w]||0),0));
 set('ftIncome',income);set('ftExpense',expense);set('ftAvailable',total);
 set('incomeTotal',income);set('expenseTotal',expense);set('moneyBalance',total);set('balanceStat',total);
 const area=$('walletBalances');
 if(area){
  area.innerHTML='';
  accounts.forEach(w=>{
   const card=document.createElement('div');card.className='moneybox';
   const label=document.createElement('small');label.textContent=w;
   const value=document.createElement('b');value.textContent=money(balance(w));
   value.className=balance(w)<0?'negative':'positive';
   card.append(label,value);area.append(card);
  });
 }
}
const mw=$('moneyWallet');if(mw)mw.innerHTML=accounts.map(a=>`<option value="${a}">${a}</option>`).join('');
const wp=$('walletBalances')?.closest('.panel');if(!wp)return;
const panel=document.createElement('div');panel.className='panel';panel.id='transferPanel';
panel.innerHTML=`<div class="panelhead"><div><h2>Transfer Money</h2><div class="sub">Move money between your own accounts</div></div><span class="pill">Offline</span></div>
<form id="transferForm"><div class="formrow"><select class="field" id="transferFrom" required aria-label="From account"></select><select class="field" id="transferTo" required aria-label="To account"></select></div><div class="formrow"><input class="field" id="transferAmount" type="number" min="0.01" step="0.01" placeholder="Amount (₱)" required><input class="field" id="transferDate" type="date" required></div><div class="formrow"><input class="field" id="transferNote" placeholder="Note (optional)"></div><button class="btn">Save transfer</button></form>
<div class="sub" style="margin-top:9px">This records a transfer only; it does not move money through GCash, SeaBank, or your bank. Transfers are not income or expenses.</div><div class="divider" style="border-top:1px solid var(--line);margin:18px 0"></div><div class="panelhead"><h2>Transfer history</h2></div><div id="transferHistory"></div>`;
wp.after(panel);
const from=$('transferFrom'),to=$('transferTo');
accounts.forEach(a=>{for(const sel of [from,to]){const o=document.createElement('option');o.value=a;o.textContent=a;sel.append(o)}});
from.value='Cash';to.value='GCash';$('transferDate').value=today();

function renderTransfers(){
 transfers=loadTransfers();
 const area=$('transferHistory');if(!area)return;area.innerHTML='';
 [...transfers].map((t,i)=>({...t,_i:i})).sort((a,b)=>(b.date||'').localeCompare(a.date||'')).forEach(t=>{
  const row=document.createElement('div');row.className='transaction';
  const left=document.createElement('div');left.style.flex='1';left.textContent=normalize(t.from)+' → '+normalize(t.to);
  const sm=document.createElement('small');sm.textContent=(t.date||'')+(t.note?' · '+t.note:'');left.append(sm);
  const amount=document.createElement('strong');amount.textContent=money(t.amount);
  const del=document.createElement('button');del.className='btn ghost';del.textContent='Delete';
  del.onclick=()=>{
   if(!confirm('Delete this transfer record? Account balances will be recalculated.'))return;
   const latest=loadTransfers();latest.splice(t._i,1);write('myday_transfers',latest);
   transfers=latest;renderTransfers();refreshFinanceDisplays();
  };
  row.append(left,amount,del);area.append(row);
 });
 if(!transfers.length)area.innerHTML='<div class="empty">No transfers recorded yet.</div>';
}

$('transferForm').onsubmit=e=>{
 e.preventDefault();
 const a=from.value,b=to.value,n=Number($('transferAmount').value);
 if(a===b){alert('Choose two different accounts.');return}
 if(!(n>0)||!Number.isFinite(n)){alert('Enter an amount greater than zero.');return}
 const available=currentBalance(a);
 if(n>available+0.000001){alert('The transfer is greater than the available balance in '+a+' ('+money(available)+'). Check the amount first.');return}
 transfers=loadTransfers();
 transfers.push({id:'transfer-'+Date.now()+'-'+Math.random().toString(16).slice(2),from:a,to:b,amount:n,date:$('transferDate').value,note:$('transferNote').value.trim()});
 write('myday_transfers',transfers);
 $('transferForm').reset();from.value=a;to.value=b;$('transferDate').value=today();
 renderTransfers();
 refreshFinanceDisplays();
};
try{if(typeof BACKUP_KEYS!=='undefined'&&!BACKUP_KEYS.includes('transfers'))BACKUP_KEYS.push('transfers')}catch{}
renderTransfers();
refreshFinanceDisplays();
})();

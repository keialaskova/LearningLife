(() => {
'use strict';
const $=id=>document.getElementById(id);
const money=n=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>new Date().toISOString().slice(0,10);
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const accounts=['Cash','GCash','SeaBank','Bank Account'];
let transfers=read('myday_transfers',[]);if(!Array.isArray(transfers))transfers=[];
const normalize=n=>n==='MariBank'?'SeaBank':n==='Other Bank'?'Bank Account':accounts.includes(n)?n:'Cash';
function balanceFor(w){
 const base=transactions.reduce((s,t)=>s+(normalize(t.wallet||'Cash')===w?(t.type==='income'?1:-1)*Number(t.amount||0):0),0);
 return base+transfers.filter(t=>t.to===w).reduce((s,t)=>s+Number(t.amount||0),0)-transfers.filter(t=>t.from===w).reduce((s,t)=>s+Number(t.amount||0),0);
}
const mw=$('moneyWallet');if(mw)mw.innerHTML=accounts.map(a=>`<option value="${a}">${a}</option>`).join('');
const wp=$('walletBalances')?.closest('.panel');if(!wp)return;
const panel=document.createElement('div');panel.className='panel';panel.id='transferPanel';
panel.innerHTML=`
<div class="panelhead"><div><h2>Transfer Money</h2><div class="sub">Move money between your own accounts</div></div><span class="pill">Offline</span></div>
<form id="transferForm">
<div class="formrow"><select class="field" id="transferFrom" required aria-label="From account"></select><select class="field" id="transferTo" required aria-label="To account"></select></div>
<div class="formrow"><input class="field" id="transferAmount" type="number" min="0.01" step="0.01" placeholder="Amount (₱)" required><input class="field" id="transferDate" type="date" required></div>
<div class="formrow"><input class="field" id="transferNote" placeholder="Note (optional)"></div>
<button class="btn">Save transfer</button></form>
<div class="sub" style="margin-top:9px">This records a transfer only; it does not move money through GCash, SeaBank, or your bank. Transfers are not income or expenses.</div>
<div class="divider" style="border-top:1px solid var(--line);margin:18px 0"></div><div class="panelhead"><h2>Transfer history</h2></div><div id="transferHistory"></div>`;
wp.after(panel);
const from=$('transferFrom'),to=$('transferTo');
accounts.forEach(a=>{for(const sel of [from,to]){const o=document.createElement('option');o.value=a;o.textContent=a;sel.append(o)}});
from.value='Cash';to.value='GCash';$('transferDate').value=today();
function renderWallets(){
 const area=$('walletBalances');area.innerHTML='';
 accounts.forEach(w=>{const b=document.createElement('div');b.className='moneybox';const l=document.createElement('small');l.textContent=w;const v=document.createElement('b');const n=balanceFor(w);v.textContent=money(n);v.className=n<0?'negative':'positive';b.append(l,v);area.append(b)});
}
function renderTransfers(){
 const area=$('transferHistory');area.innerHTML='';
 [...transfers].map((t,i)=>({...t,_i:i})).sort((a,b)=>(b.date||'').localeCompare(a.date||'')).forEach(t=>{
 const row=document.createElement('div');row.className='transaction';const left=document.createElement('div');left.style.flex='1';left.textContent=t.from+' → '+t.to;
 const sm=document.createElement('small');sm.textContent=(t.date||'')+(t.note?' · '+t.note:'');left.append(sm);
 const amount=document.createElement('strong');amount.textContent=money(t.amount);
 const del=document.createElement('button');del.className='btn ghost';del.textContent='Delete';del.onclick=()=>{if(confirm('Delete this transfer record? Account balances will be recalculated.')){transfers.splice(t._i,1);write('myday_transfers',transfers);window.renderMoney()}};
 row.append(left,amount,del);area.append(row)});
 if(!transfers.length)area.innerHTML='<div class="empty">No transfers recorded yet.</div>';
}
const original=window.renderMoney;
if(typeof original==='function')window.renderMoney=function(){original();renderWallets();renderTransfers()};
$('transferForm').onsubmit=e=>{
 e.preventDefault();const a=from.value,b=to.value,n=Number($('transferAmount').value);
 if(a===b){alert('Choose two different accounts.');return}
 if(!(n>0)||!Number.isFinite(n)){alert('Enter an amount greater than zero.');return}
 if(n>balanceFor(a)+0.000001){alert('The transfer is greater than the recorded balance in '+a+'. Check the amount first.');return}
 transfers.push({id:'transfer-'+Date.now()+'-'+Math.random().toString(16).slice(2),from:a,to:b,amount:n,date:$('transferDate').value,note:$('transferNote').value.trim()});
 write('myday_transfers',transfers);$('transferForm').reset();from.value=a;to.value=b;$('transferDate').value=today();window.renderMoney();
};
try{if(typeof BACKUP_KEYS!=='undefined'&&!BACKUP_KEYS.includes('transfers'))BACKUP_KEYS.push('transfers')}catch{}
if(typeof window.renderMoney==='function')window.renderMoney();
})();
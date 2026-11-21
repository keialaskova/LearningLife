(() => {
'use strict';
const $=id=>document.getElementById(id), wallets=['Cash','GCash','SeaBank','Bank Account'];
const K={tx:'myday_transactions',tr:'myday_transfers',start:'myday_startingBalances',bud:'myday_budgets',dp:'myday_debtPayments'};
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const norm=n=>n==='MariBank'?'SeaBank':n==='Other Bank'?'Bank Account':wallets.includes(n)?n:'Cash';
const money=n=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>new Date().toISOString().slice(0,10), monthNow=today().slice(0,7);
const tx=()=>read(K.tx,[]), transfers=()=>read(K.tr,[]), starts=()=>read(K.start,{}), budgets=()=>read(K.bud,[]);
const balance=w=>Number(starts()[w]||0)+tx().reduce((s,t)=>s+(norm(t.wallet||'Cash')===w?(t.type==='income'?1:-1)*Number(t.amount||0):0),0)+transfers().reduce((s,t)=>s+(norm(t.to)===w?Number(t.amount||0):0)-(norm(t.from)===w?Number(t.amount||0):0),0);
const section=$('money'); if(!section||$('financeToolsPanel'))return;
// Hide the available-balance card on the Home dashboard while keeping its element in the DOM for legacy app code.
const dashboardBalance=$('balanceStat'); if(dashboardBalance){const dashboardCard=dashboardBalance.closest('.card.stat');if(dashboardCard)dashboardCard.style.display='none';}
const panel=document.createElement('div');panel.id='financeToolsPanel';
panel.innerHTML=`
<div class="panel"><div class="panelhead"><div><h2>Money Overview</h2><div class="sub">Your total money across all wallets</div></div><span class="pill">PHP · Offline</span></div>
<div class="moneygrid"><div class="moneybox"><small>Starting balances</small><b id="ftStartTotal">₱0.00</b></div><div class="moneybox"><small>Income</small><b id="ftIncome">₱0.00</b></div><div class="moneybox"><small>Expenses</small><b id="ftExpense">₱0.00</b></div><div class="moneybox"><small>Available money</small><b class="positive" id="ftAvailable">₱0.00</b></div></div><div class="sub">Transfers move money between wallets and do not change your combined total.</div></div>
<div class="panel"><div class="panelhead"><div><h2>Starting Balances</h2><div class="sub">Enter money you already have. This is not income.</div></div></div><form id="ftStartForm"><div class="formrow"><select class="field" id="ftStartWallet"></select><input class="field" id="ftStartAmount" type="number" min="0" step=".01" placeholder="Starting amount (₱)" required></div><button class="btn">Save starting balance</button></form><div id="ftStartList" class="moneygrid"></div></div>
<div class="panel"><div class="panelhead"><div><h2>Monthly Budget</h2><div class="sub">Set a spending limit for each category</div></div></div><form id="ftBudgetForm"><div class="formrow"><input class="field" id="ftCategory" placeholder="Category (e.g. Food)" required><input class="field" id="ftAmount" type="number" min=".01" step=".01" placeholder="Budget (₱)" required></div><div class="formrow"><input class="field" id="ftMonth" type="month" required></div><button class="btn">Save budget</button></form><div id="ftBudgetList"></div></div>
<div class="panel"><div class="panelhead"><div><h2>Export Reports</h2><div class="sub">Download a monthly CSV that opens in Excel or Google Sheets</div></div></div><div class="formrow"><input class="field" id="ftExportMonth" type="month" aria-label="Report month"></div><button class="btn" id="ftExport" type="button">Export monthly report (CSV)</button><div class="sub" id="ftExportStatus" style="margin-top:8px">Includes transactions, transfers and older debt payments without linked expenses.</div></div>`;
const welcome=section.querySelector('.welcome'); if(welcome)welcome.after(panel);else section.prepend(panel);
$('ftStartWallet').innerHTML=wallets.map(w=>`<option value="${w}">${w}</option>`).join('');
$('ftMonth').value=monthNow;$('ftExportMonth').value=monthNow;
function renderBudgets(){
 const m=$('ftMonth').value||monthNow,area=$('ftBudgetList');area.innerHTML='';
 const list=budgets().filter(b=>b.month===m);
 if(!list.length){area.innerHTML='<div class="empty">No budgets set for this month yet.</div>';return}
 list.forEach(b=>{
  const spent=tx().filter(t=>t.type==='expense'&&(t.date||'').slice(0,7)===m&&String(t.category||'').trim().toLowerCase()===String(b.category).trim().toLowerCase()).reduce((s,t)=>s+Number(t.amount||0),0);
  const left=Number(b.amount)-spent,pct=Math.min(100,Number(b.amount)>0?spent/Number(b.amount)*100:0);
  const row=document.createElement('div');row.className='transaction';row.style.display='block';
  const top=document.createElement('div');top.style.cssText='display:flex;justify-content:space-between;gap:8px';
  const name=document.createElement('strong');name.textContent=b.category;const nums=document.createElement('strong');nums.textContent=money(spent)+' / '+money(b.amount);top.append(name,nums);
  const track=document.createElement('div');track.style.cssText='height:8px;background:var(--line);border-radius:20px;overflow:hidden;margin:9px 0';
  const bar=document.createElement('div');bar.style.cssText='height:100%;width:'+pct+'%;background:'+(left<0?'var(--danger)':'var(--accent)');track.append(bar);
  const foot=document.createElement('div');foot.style.cssText='display:flex;justify-content:space-between;align-items:center';
  const remaining=document.createElement('small');remaining.className=left<0?'negative':'positive';remaining.textContent=left<0?money(-left)+' over budget':money(left)+' remaining';
  const del=document.createElement('button');del.className='btn ghost';del.textContent='Delete';del.onclick=()=>{if(confirm('Delete this monthly budget?')){write(K.bud,budgets().filter(x=>x.id!==b.id));renderBudgets()}};
  foot.append(remaining,del);row.append(top,track,foot);area.append(row);
 });
}
function render(){
 const list=tx(),income=list.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount||0),0),expense=list.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0);
 const start=wallets.reduce((s,w)=>s+Number(starts()[w]||0),0),available=wallets.reduce((s,w)=>s+balance(w),0);
 $('ftStartTotal').textContent=money(start);$('ftIncome').textContent=money(income);$('ftExpense').textContent=money(expense);$('ftAvailable').textContent=money(available);
 const a=$('ftStartList');a.innerHTML='';wallets.forEach(w=>{const d=document.createElement('div');d.className='moneybox';const l=document.createElement('small');l.textContent=w+' starting balance';const v=document.createElement('b');v.textContent=money(starts()[w]||0);d.append(l,v);a.append(d)});
 const wa=$('walletBalances');if(wa){wa.innerHTML='';wallets.forEach(w=>{const d=document.createElement('div');d.className='moneybox';const l=document.createElement('small');l.textContent=w;const v=document.createElement('b');v.textContent=money(balance(w));v.className=balance(w)<0?'negative':'positive';d.append(l,v);wa.append(d)})}
 if($('moneyBalance'))$('moneyBalance').textContent=money(available);if($('balanceStat'))$('balanceStat').textContent=money(available);
 renderBudgets();
}
$('ftStartForm').onsubmit=e=>{e.preventDefault();const w=$('ftStartWallet').value,n=Number($('ftStartAmount').value);if(!Number.isFinite(n)||n<0){alert('Enter a valid starting balance.');return}const x=starts();x[w]=n;write(K.start,x);$('ftStartAmount').value='';render()};
$('ftBudgetForm').onsubmit=e=>{e.preventDefault();const category=$('ftCategory').value.trim(),amount=Number($('ftAmount').value),month=$('ftMonth').value;if(!category||!(amount>0)||!month){alert('Enter a category, amount and month.');return}const x=budgets(),old=x.find(b=>b.month===month&&b.category.toLowerCase()===category.toLowerCase());if(old)old.amount=amount;else x.push({id:'budget-'+Date.now()+'-'+Math.random().toString(16).slice(2),category,amount,month});write(K.bud,x);$('ftCategory').value='';$('ftAmount').value='';renderBudgets()};
$('ftMonth').onchange=renderBudgets;
const cell=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
$('ftExport').onclick=()=>{
 const m=$('ftExportMonth').value;if(!m){alert('Choose a month first.');return}
 const rows=[['Date','Type','Category / Details','Wallet / From','To','Amount (PHP)','Note']];
 tx().filter(t=>(t.date||'').slice(0,7)===m).forEach(t=>rows.push([t.date,t.type,t.category||'',t.wallet||'Cash','',Number(t.amount||0).toFixed(2),t.note||'']));
 transfers().filter(t=>(t.date||'').slice(0,7)===m).forEach(t=>rows.push([t.date,'transfer','Wallet transfer',t.from,t.to,Number(t.amount||0).toFixed(2),t.note||'']));
 read(K.dp,[]).filter(p=>(p.date||'').slice(0,7)===m&&!p.transactionId).forEach(p=>rows.push([p.date,'debt payment','Debt repayment',p.wallet||'Not specified','',Number(p.amount||0).toFixed(2),p.note||'']));
 rows.splice(1,rows.length-1,...rows.slice(1).sort((a,b)=>String(a[0]).localeCompare(String(b[0]))));
 const blob=new Blob(['\uFEFF'+rows.map(r=>r.map(cell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='learninglife-financial-report-'+m+'.csv';document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);$('ftExportStatus').textContent='Your '+m+' report has been prepared.';
};
try{['transfers','startingBalances','budgets','debtAccounts','debtPayments'].forEach(k=>{if(typeof BACKUP_KEYS!=='undefined'&&!BACKUP_KEYS.includes(k))BACKUP_KEYS.push(k)})}catch(e){}
const old=window.renderMoney;if(typeof old==='function')window.renderMoney=function(){old();render()};
render();
})();
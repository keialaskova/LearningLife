(() => {
'use strict';
const $=id=>document.getElementById(id), money=n=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
const read=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem('myday_'+key));return v??fallback}catch{return fallback}};
const write=(key,value)=>localStorage.setItem('myday_'+key,JSON.stringify(value));
const moneySection=$('money'),tools=$('financeToolsPanel'); if(!moneySection||!tools||$('moneySubnav'))return;
const toolPanels=[...tools.querySelectorAll(':scope > .panel')];
const overviewPanel=toolPanels[0],walletSettings=toolPanels[1],budgetPanel=toolPanels[2],exportPanel=toolPanels[3];
const transactionPanel=$('moneyForm')?.closest('.panel');
const walletPanel=$('walletBalances')?.closest('.panel');
const historyPanel=$('transactions')?.closest('.panel');
const transferPanel=$('transferPanel');
const debtPanel=$('dtAccountForm')?.closest('.panel');
if(!overviewPanel||!transactionPanel||!walletPanel||!historyPanel||!debtPanel)return;
// Keep the existing storage and calculations; only rearrange existing panels.
const startTotal=$('ftStartTotal')?.closest('.moneybox');if(startTotal)startTotal.style.display='none';
const layout=document.createElement('div');layout.id='moneySubnav';
layout.innerHTML=`<style>
#moneySubnav .money-tabs{display:flex;gap:7px;overflow-x:auto;padding:3px 1px 12px;margin:0 0 8px;scrollbar-width:thin}
#moneySubnav .money-tab{flex:0 0 auto;border:1px solid var(--line);background:var(--panel);color:var(--muted);border-radius:10px;padding:9px 12px;font-size:13px;font-weight:650}
#moneySubnav .money-tab.active{background:var(--accent2);color:var(--ink);border-color:var(--accent2)}
#moneySubnav .money-pane{display:none}#moneySubnav .money-pane.active{display:block}
#moneySubnav .category-chip{border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:20px;padding:7px 11px;font-size:12px}
#moneySubnav .category-chip.active{background:var(--accent2);border-color:var(--accent);color:var(--ink)}
#moneySubnav .category-row{display:flex;align-items:center;gap:8px;padding:10px 0;border-top:1px solid var(--line)}
#moneySubnav .category-row:first-child{border-top:0}#moneySubnav .category-row .grow{flex:1;min-width:0}
</style><div class="money-tabs" role="tablist" aria-label="Money Tracker sections"></div><div class="money-panes"></div>`;
const welcome=moneySection.querySelector('.welcome');welcome.after(layout);
const tabs=layout.querySelector('.money-tabs'),panes=layout.querySelector('.money-panes');
const definitions=[['overview','Overview'],['transactions','Transactions'],['history','History'],['categories','Categories'],['transfers','Transfers'],['wallets','Wallets'],['debts','Debt Tracker'],['reports','Reports']];
const paneMap={};
definitions.forEach(([id,label],i)=>{const b=document.createElement('button');b.type='button';b.className='money-tab'+(i===0?' active':'');b.textContent=label;b.setAttribute('role','tab');b.setAttribute('aria-selected',i===0?'true':'false');b.onclick=()=>activate(id);tabs.append(b);const p=document.createElement('div');p.className='money-pane'+(i===0?' active':'');p.dataset.pane=id;paneMap[id]=p;panes.append(p)});
function put(id,...nodes){nodes.filter(Boolean).forEach(n=>paneMap[id].append(n))}
put('overview',overviewPanel,walletPanel);
put('transactions',transactionPanel);
put('history',historyPanel);
put('transfers',transferPanel);
put('wallets',walletSettings);
put('debts',debtPanel);
put('reports',budgetPanel,exportPanel);
const categoryPanel=document.createElement('div');categoryPanel.className='panel';categoryPanel.innerHTML=`<div class="panelhead"><div><h2>Manage categories</h2><div class="sub">Add, rename, or remove categories. Removing a category never deletes its transactions.</div></div></div><form id="mlCategoryForm"><div class="formrow"><select class="field" id="mlCategoryType"><option value="expense">Expense</option><option value="income">Income</option></select><input class="field" id="mlCategoryName" placeholder="Category name" required><button class="btn">Add</button></div></form><div id="mlCategoryList"></div>`;
put('categories',categoryPanel);
function activate(id){definitions.forEach(([key])=>{const active=key===id;const b=[...tabs.children][definitions.findIndex(x=>x[0]===key)];b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));paneMap[key].classList.toggle('active',active)});}
// Category storage is separate from transactions so old records remain untouched.
const defaultCats=[['expense','Food'],['expense','Transportation'],['expense','Shopping'],['expense','Bills'],['expense','Health'],['expense','Education'],['expense','Entertainment'],['expense','Debt payment'],['income','Salary'],['income','Business'],['income','Allowance'],['income','Gift'],['income','Other income']];
let categories=read('moneyCategories',null);if(!Array.isArray(categories)){categories=defaultCats.map(([type,name],i)=>({id:'cat-'+i,type,name,active:true}));const tx=read('transactions',[]);tx.forEach(t=>{const name=String(t.category||'').trim();if(name&&!categories.some(c=>c.type===t.type&&c.name.toLowerCase()===name.toLowerCase()))categories.push({id:'cat-old-'+Math.random().toString(16).slice(2),type:t.type==='income'?'income':'expense',name,active:true})});write('moneyCategories',categories)}
function syncCategoryOptions(){const field=$('moneyCategory');if(!field)return;let list=$('mlCategoryOptions');if(!list){list=document.createElement('datalist');list.id='mlCategoryOptions';document.body.append(list);field.setAttribute('list',list.id)}list.innerHTML='';categories.filter(c=>c.active!==false).forEach(c=>{const o=document.createElement('option');o.value=c.name;list.append(o)})}
function renderCategories(){const area=$('mlCategoryList');area.innerHTML='';['expense','income'].forEach(type=>{const h=document.createElement('h2');h.style.margin='18px 0 8px';h.textContent=type==='expense'?'Expense categories':'Income categories';area.append(h);const list=categories.filter(c=>c.type===type&&c.active!==false);if(!list.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No active categories.';area.append(empty)}list.forEach(c=>{const row=document.createElement('div');row.className='category-row';const name=document.createElement('strong');name.className='grow';name.textContent=c.name;const rename=document.createElement('button');rename.className='btn secondary';rename.type='button';rename.textContent='Rename';rename.onclick=()=>{const next=prompt('Rename category:',c.name);if(next===null)return;const value=next.trim();if(!value)return;if(categories.some(x=>x.id!==c.id&&x.type===type&&x.active!==false&&x.name.toLowerCase()===value.toLowerCase())){alert('That category already exists.');return}c.name=value;write('moneyCategories',categories);renderCategories();syncCategoryOptions();renderHistoryCategories()};const del=document.createElement('button');del.className='btn ghost';del.type='button';del.textContent='Delete';del.onclick=()=>{if(!confirm('Remove this category from your active category list? Existing transactions will be kept.'))return;c.active=false;write('moneyCategories',categories);renderCategories();syncCategoryOptions();renderHistoryCategories()};row.append(name,rename,del);area.append(row)})})}
$('mlCategoryForm').onsubmit=e=>{e.preventDefault();const type=$('mlCategoryType').value,name=$('mlCategoryName').value.trim();if(!name)return;if(categories.some(c=>c.type===type&&c.active!==false&&c.name.toLowerCase()===name.toLowerCase())){alert('That category already exists.');return}categories.push({id:'cat-'+Date.now()+'-'+Math.random().toString(16).slice(2),type,name,active:true});write('moneyCategories',categories);$('mlCategoryName').value='';renderCategories();syncCategoryOptions();renderHistoryCategories()};
// Category-filtered transaction history is rendered independently from the original record list.
const histFilter=document.createElement('div');histFilter.className='panel';histFilter.innerHTML=`<div class="panelhead"><div><h2>Browse by category</h2><div class="sub">Choose a category to see only its transactions</div></div></div><div class="formrow"><select class="field" id="mlHistoryType"><option value="all">All transaction types</option><option value="expense">Expenses</option><option value="income">Income</option></select><select class="field" id="mlHistoryCategory"><option value="all">All categories</option></select></div><div id="mlCategoryHistory"></div>`;
paneMap.history.prepend(histFilter);
function transactionCategories(){const tx=read('transactions',[]);const map=new Map();tx.forEach(t=>{const name=String(t.category||'Uncategorized').trim()||'Uncategorized';const key=(t.type==='income'?'income':'expense')+'|'+name;map.set(key,{type:t.type==='income'?'income':'expense',name})});return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name))}
function renderHistoryCategories(){const select=$('mlHistoryCategory'),prior=select.value;select.innerHTML='<option value="all">All categories</option>';const items=transactionCategories();items.forEach(c=>{const o=document.createElement('option');o.value=c.type+'|'+c.name;o.textContent=(c.type==='income'?'Income · ':'Expense · ')+c.name;select.append(o)});if([...select.options].some(o=>o.value===prior))select.value=prior;renderCategoryHistory()}
function renderCategoryHistory(){const area=$('mlCategoryHistory');if(!area)return;const type=$('mlHistoryType').value,cat=$('mlHistoryCategory').value;const list=read('transactions',[]).filter(t=>(type==='all'||t.type===type)&&(cat==='all'||(t.type+'|'+(String(t.category||'Uncategorized').trim()||'Uncategorized'))===cat)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));area.innerHTML='';if(!list.length){area.innerHTML='<div class="empty">No transactions found for this selection.</div>';return}list.forEach(t=>{const row=document.createElement('div');row.className='transaction';const left=document.createElement('div');left.style.flex='1';const title=document.createElement('strong');title.textContent=t.category||'Uncategorized';const meta=document.createElement('small');meta.textContent=(t.date||'No date')+' · '+(t.wallet||'Cash')+(t.note?' · '+t.note:'');left.append(title,meta);const amount=document.createElement('strong');amount.className=t.type==='income'?'positive':'negative';amount.textContent=(t.type==='income'?'+':'−')+money(t.amount);row.append(left,amount);area.append(row)})}
$('mlHistoryType').onchange=renderHistoryCategories;$('mlHistoryCategory').onchange=renderCategoryHistory;
// Refresh visible wallet cards after existing wallet scripts recalculate them.
function hideEmptyWallets(){const area=$('walletBalances');if(!area)return;[...area.children].forEach(card=>{const amount=Number((card.querySelector('b')?.textContent||'').replace(/[^0-9.-]/g,''));card.style.display=amount>0?'':'none'})}
if($('walletBalances'))new MutationObserver(hideEmptyWallets).observe($('walletBalances'),{childList:true,subtree:true,characterData:true});
const originalRender=window.renderMoney;if(typeof originalRender==='function'&&!originalRender.__moneyLayoutWrapped){const wrapped=function(){const result=originalRender.apply(this,arguments);setTimeout(hideEmptyWallets,0);setTimeout(renderHistoryCategories,0);return result};wrapped.__moneyLayoutWrapped=true;window.renderMoney=wrapped}
syncCategoryOptions();renderCategories();renderHistoryCategories();hideEmptyWallets();
})();

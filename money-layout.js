(() => {
'use strict';
const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('myday_'+key))??fallback}catch{return fallback}};
const money=n=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2});
function init(){
 const section=$('money'),tools=$('financeToolsPanel');
 if(!section||!tools||$('moneySubnav'))return false;
 const panels=[...tools.querySelectorAll(':scope > .panel')];
 const [overviewPanel,walletSettings,budgetPanel,exportPanel,resetPanel]=panels;
 const transactionPanel=$('moneyForm')?.closest('.panel');
 const walletPanel=$('walletBalances')?.closest('.panel');
 const historyPanel=$('transactions')?.closest('.panel');
 const transferPanel=$('transferPanel');
 const debtPanel=$('dtAccountForm')?.closest('.panel');
 if(!overviewPanel||!transactionPanel||!walletPanel||!historyPanel||!debtPanel)return false;
 const startTotal=$('ftStartTotal')?.closest('.moneybox');if(startTotal)startTotal.style.display='none';
 const layout=document.createElement('div');layout.id='moneySubnav';
 layout.innerHTML=`<style>
 #moneySubnav .money-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0 0 16px}
 #moneySubnav .money-tab{min-height:82px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:13px;padding:10px 7px;font-size:13px;font-weight:650;box-shadow:var(--shadow)}
 #moneySubnav .money-tab .tab-icon{font-size:21px;line-height:1}
 #moneySubnav .money-tab.active{background:var(--accent2);border-color:var(--accent);color:var(--ink)}
 #moneySubnav .money-pane{display:none}#moneySubnav .money-pane.active{display:block}
 #moneySubnav .category-row{display:flex;align-items:center;gap:8px;padding:10px 0;border-top:1px solid var(--line)}
 #moneySubnav .category-row .grow{flex:1;min-width:0}
 #moneySubnav .history-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:14px 0}
 #moneySubnav .history-summary .moneybox{min-width:0}
 @media(max-width:520px){#moneySubnav .money-tab{min-height:72px;font-size:12px;padding:8px 4px}#moneySubnav .history-summary{grid-template-columns:1fr}}
 </style><div class="money-tabs" role="tablist" aria-label="Money Tracker sections"></div><div class="money-panes"></div>`;
 section.querySelector('.welcome').after(layout);
 const tabs=layout.querySelector('.money-tabs'),panes=layout.querySelector('.money-panes'),paneMap={};
 const defs=[['overview','Overview','▦'],['transactions','Transactions','⇄'],['history','History','▱'],['categories','Categories','◇'],['transfers','Transfers','⇄'],['wallets','Wallets','▣'],['debts','Debt Tracker','♧'],['reports','Reports','▥']];
 function activate(id){defs.forEach(([key],i)=>{const active=key===id,b=tabs.children[i];b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));paneMap[key].classList.toggle('active',active)})}
 defs.forEach(([id,label,icon],i)=>{const b=document.createElement('button');b.type='button';b.className='money-tab'+(i===0?' active':'');b.innerHTML=`<span class="tab-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;b.setAttribute('role','tab');b.setAttribute('aria-selected',i===0?'true':'false');b.onclick=()=>activate(id);tabs.append(b);const p=document.createElement('div');p.className='money-pane'+(i===0?' active':'');p.dataset.pane=id;paneMap[id]=p;panes.append(p)});
 const put=(id,...nodes)=>nodes.filter(Boolean).forEach(n=>paneMap[id].append(n));
 // Overview deliberately contains only the financial summary; wallet cards belong in Wallets.
 put('overview',overviewPanel);
 put('transactions',transactionPanel);
 put('history',historyPanel);
 put('transfers',transferPanel);
 put('wallets',walletPanel,walletSettings,resetPanel);
 put('debts',debtPanel);
 put('reports',budgetPanel,exportPanel);
 const categoryPanel=document.createElement('div');categoryPanel.className='panel';categoryPanel.innerHTML=`<div class="panelhead"><div><h2>Manage categories</h2><div class="sub">Add, rename, or remove categories. Removing a category never deletes its transactions.</div></div></div><form id="mlCategoryForm"><div class="formrow"><select class="field" id="mlCategoryType"><option value="expense">Expense</option><option value="income">Income</option></select><input class="field" id="mlCategoryName" placeholder="Category name" required><button class="btn">Add</button></div></form><div id="mlCategoryList"></div>`;
 put('categories',categoryPanel);
 const defaultCats=[['expense','Food'],['expense','Transportation'],['expense','Shopping'],['expense','Bills'],['expense','Health'],['expense','Education'],['expense','Entertainment'],['expense','Debt payment'],['income','Salary'],['income','Business'],['income','Allowance'],['income','Gift'],['income','Other income']];
 let categories=read('moneyCategories',null);
 if(!Array.isArray(categories)){categories=defaultCats.map(([type,name],i)=>({id:'cat-'+i,type,name,active:true}));read('transactions',[]).forEach(t=>{const name=String(t.category||'').trim();if(name&&!categories.some(c=>c.type===t.type&&c.name.toLowerCase()===name.toLowerCase()))categories.push({id:'cat-old-'+Date.now()+'-'+categories.length,type:t.type==='income'?'income':'expense',name,active:true})});localStorage.setItem('myday_moneyCategories',JSON.stringify(categories))}
 function syncCategoryOptions(){const field=$('moneyCategory');if(!field)return;let dl=$('mlCategoryOptions');if(!dl){dl=document.createElement('datalist');dl.id='mlCategoryOptions';document.body.append(dl);field.setAttribute('list',dl.id)}dl.innerHTML='';categories.filter(c=>c.active!==false).forEach(c=>{const o=document.createElement('option');o.value=c.name;dl.append(o)})}
 function renderCategories(){const area=$('mlCategoryList');area.innerHTML='';['expense','income'].forEach(type=>{const h=document.createElement('h2');h.style.margin='18px 0 8px';h.textContent=type==='expense'?'Expense categories':'Income categories';area.append(h);const list=categories.filter(c=>c.type===type&&c.active!==false);if(!list.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No active categories.';area.append(empty)}list.forEach(c=>{const row=document.createElement('div');row.className='category-row';const name=document.createElement('strong');name.className='grow';name.textContent=c.name;const rename=document.createElement('button');rename.className='btn secondary';rename.type='button';rename.textContent='Rename';rename.onclick=()=>{const next=prompt('Rename category:',c.name);if(next===null)return;const value=next.trim();if(!value)return;if(categories.some(x=>x.id!==c.id&&x.type===type&&x.active!==false&&x.name.toLowerCase()===value.toLowerCase())){alert('That category already exists.');return}c.name=value;saveCats();renderCategories();syncCategoryOptions();renderHistoryCategories()};const del=document.createElement('button');del.className='btn ghost';del.type='button';del.textContent='Delete';del.onclick=()=>{if(!confirm('Remove this category from your active category list? Existing transactions will be kept.'))return;c.active=false;saveCats();renderCategories();syncCategoryOptions();renderHistoryCategories()};row.append(name,rename,del);area.append(row)})})}
 function saveCats(){localStorage.setItem('myday_moneyCategories',JSON.stringify(categories))}
 $('mlCategoryForm').onsubmit=e=>{e.preventDefault();const type=$('mlCategoryType').value,name=$('mlCategoryName').value.trim();if(!name)return;if(categories.some(c=>c.type===type&&c.active!==false&&c.name.toLowerCase()===name.toLowerCase())){alert('That category already exists.');return}categories.push({id:'cat-'+Date.now(),type,name,active:true});saveCats();$('mlCategoryName').value='';renderCategories();syncCategoryOptions();renderHistoryCategories()};
 const histFilter=document.createElement('div');histFilter.className='panel';histFilter.innerHTML=`<div class="panelhead"><div><h2>Browse by category</h2><div class="sub">Choose a category to see its transaction totals and history</div></div></div><div class="formrow"><select class="field" id="mlHistoryType"><option value="all">All transaction types</option><option value="expense">Expenses</option><option value="income">Income</option></select><select class="field" id="mlHistoryCategory"><option value="all">All categories</option></select></div><div id="mlCategorySummary"></div><div id="mlCategoryHistory"></div>`;
 paneMap.history.prepend(histFilter);
 function transactionCategories(){const map=new Map();read('transactions',[]).forEach(t=>{const name=String(t.category||'Uncategorized').trim()||'Uncategorized',type=t.type==='income'?'income':'expense',key=type+'|'+name;map.set(key,{type,name})});return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name))}
 function renderHistoryCategories(){const select=$('mlHistoryCategory'),prior=select.value;select.innerHTML='<option value="all">All categories</option>';transactionCategories().forEach(c=>{const o=document.createElement('option');o.value=c.type+'|'+c.name;o.textContent=(c.type==='income'?'Income · ':'Expense · ')+c.name;select.append(o)});if([...select.options].some(o=>o.value===prior))select.value=prior;renderCategoryHistory()}
 function renderCategoryHistory(){const summaryArea=$('mlCategorySummary'),area=$('mlCategoryHistory');if(!area||!summaryArea)return;const type=$('mlHistoryType').value,cat=$('mlHistoryCategory').value;const list=read('transactions',[]).filter(t=>(type==='all'||t.type===type)&&(cat==='all'||(t.type+'|'+(String(t.category||'Uncategorized').trim()||'Uncategorized'))===cat)).sort((a,b)=>(b.date||'').localeCompare(a.date||''));const income=list.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount||0),0),expense=list.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0),net=income-expense;summaryArea.innerHTML='';const grid=document.createElement('div');grid.className='history-summary';[['Total Income',money(income),'positive'],['Total Expenses',money(expense),'negative'],['Net Total · '+list.length+' transactions',(net<0?'−':'')+money(Math.abs(net)),net<0?'negative':'positive']].forEach(([label,value,cls])=>{const box=document.createElement('div');box.className='moneybox';const small=document.createElement('small');small.textContent=label;const b=document.createElement('b');b.className=cls;b.textContent=value;box.append(small,b);grid.append(box)});summaryArea.append(grid);area.innerHTML='';if(!list.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No transactions found for this selection.';area.append(empty);return}list.forEach(t=>{const row=document.createElement('div');row.className='transaction';const left=document.createElement('div');left.style.flex='1';const title=document.createElement('strong');title.textContent=t.category||'Uncategorized';const meta=document.createElement('small');meta.textContent=(t.date||'No date')+' · '+(t.wallet||'Cash')+(t.note?' · '+t.note:'');left.append(title,meta);const amount=document.createElement('strong');amount.className=t.type==='income'?'positive':'negative';amount.textContent=(t.type==='income'?'+':'−')+money(t.amount);row.append(left,amount);area.append(row)})}
 $('mlHistoryType').onchange=renderHistoryCategories;$('mlHistoryCategory').onchange=renderCategoryHistory;
 function hideEmptyWallets(){const area=$('walletBalances');if(!area)return;[...area.children].forEach(card=>{const amount=Number((card.querySelector('b')?.textContent||'').replace(/[^0-9.-]/g,''));card.style.display=amount>0?'':'none'})}
 if($('walletBalances'))new MutationObserver(hideEmptyWallets).observe($('walletBalances'),{childList:true,subtree:true,characterData:true});
 const oldRender=window.renderMoney;if(typeof oldRender==='function'&&!oldRender.__moneyLayoutWrapped){const wrapped=function(){const result=oldRender.apply(this,arguments);setTimeout(hideEmptyWallets,0);setTimeout(renderHistoryCategories,0);return result};wrapped.__moneyLayoutWrapped=true;window.renderMoney=wrapped}
 syncCategoryOptions();renderCategories();renderHistoryCategories();hideEmptyWallets();return true;
}
if(!init()){let tries=0;const timer=setInterval(()=>{tries++;if(init()||tries>=30)clearInterval(timer)},200)}
})();

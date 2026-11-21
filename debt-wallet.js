(() => {
'use strict';
const $=id=>document.getElementById(id),read=(k,d)=>{try{return JSON.parse(localStorage.getItem('myday_'+k))??d}catch{return d}},write=(k,v)=>localStorage.setItem('myday_'+k,JSON.stringify(v));
const accounts=['Cash','GCash','SeaBank','Bank Account'],form=$('dtPaymentForm');if(!form||form.dataset.walletPatch==='1')return;form.dataset.walletPatch='1';
const row=document.createElement('div');row.className='formrow';const wallet=document.createElement('select');wallet.className='field';wallet.id='dtPayWallet';wallet.required=true;wallet.setAttribute('aria-label','Pay from wallet');
accounts.forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent='Pay from: '+n;wallet.append(o)});row.append(wallet);
const dateRow=$('dtPayDate')?.closest('.formrow');if(dateRow)form.insertBefore(row,dateRow);else form.insertBefore(row,form.querySelector('button'));
form.addEventListener('submit',e=>{
 e.preventDefault();e.stopImmediatePropagation();
 const debtId=$('dtPayAccount').value,amount=Number($('dtPayAmount').value),date=$('dtPayDate').value,note=$('dtPayNote').value.trim(),chosen=wallet.value;
 const debts=read('debtAccounts',[]),payments=read('debtPayments',[]),debt=debts.find(x=>x.id===debtId);
 if(!debt){alert('Choose a debt first.');return}if(!(amount>0)||!Number.isFinite(amount)){alert('Enter a valid payment amount.');return}
 const paid=payments.filter(p=>p.accountId===debtId).reduce((s,p)=>s+Number(p.amount||0),0);
 if(amount>Number(debt.principal||0)-paid+1e-6){alert('Payment cannot be greater than the remaining debt.');return}
 const tx=read('transactions',[]),norm=n=>n==='SeaBank'?'MariBank':n==='Bank Account'?'Other Bank':n,walletName=norm(chosen);
 const activity=tx.reduce((s,t)=>s+((t.wallet||'Cash')===walletName?(t.type==='income'?1:-1)*Number(t.amount||0):0),0);
 const tr=read('transfers',[]).reduce((s,t)=>s+(norm(t.to)===walletName?Number(t.amount||0):0)-(norm(t.from)===walletName?Number(t.amount||0):0),0);
 const opening=read('startingBalances',{}),start=Number(opening[chosen]||opening[walletName]||0);
 if(amount>activity+tr+start+1e-6){alert('This payment is greater than the recorded balance in '+chosen+'. Check the wallet balance first.');return}
 const pid='payment-'+Date.now()+'-'+Math.random().toString(16).slice(2),tid='debt-payment-expense-'+pid;
 payments.push({id:pid,accountId:debtId,amount,date,note,wallet:chosen,transactionId:tid});
 tx.push({id:tid,type:'expense',amount,wallet:walletName,category:'Debt payment · '+debt.name,date,debtPaymentId:pid});
 write('debtPayments',payments);write('transactions',tx);form.reset();$('dtPayDate').value=new Date().toISOString().slice(0,10);wallet.value='Cash';location.reload();
},true);
const history=$('dtHistory');if(history)history.addEventListener('click',e=>{
 const btn=e.target.closest('button');if(!btn||btn.textContent.trim()!=='Delete')return;const rowEl=btn.closest('.transaction');if(!rowEl)return;
 const payments=read('debtPayments',[]),sorted=[...payments].sort((a,b)=>(b.date||'').localeCompare(a.date||'')),index=[...history.children].indexOf(rowEl),p=sorted[index];if(!p||!p.transactionId)return;
 const original=window.confirm;window.confirm=msg=>{const ok=original.call(window,msg);if(ok)write('transactions',read('transactions',[]).filter(t=>t.id!==p.transactionId));return ok};setTimeout(()=>window.confirm=original,0);
},true);
})();
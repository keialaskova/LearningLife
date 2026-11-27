const CACHE_NAME='learninglife-shell-v54';
const APP_SHELL=[
'./','./index.html','./bible.js','./redesign.css','./redesign-v30.css','./clock.js',
'./dashboard.js','./debt-installments.js','./debt-wallet.js','./debt.js','./finance-tools.js',
'./goals-refresh.js','./learninglife-update.js','./manifest.webmanifest','./money-layout.js',
'./reset-money.js','./sw.js','./transfer.js','./wallet-sync.js','./calendar-fix.js','./text-size.js',
'./bubu-theme.js','./bubu-stickers.js','./bubu-layout-fix.js',
'./assets/bubu-bear.png','./assets/bubu-dudu-beach.jpg','./assets/bubu-dudu-cooking.mp4',
'./icon-192.png','./icon-512.png','./icon-maskable-512.png',
'./cute_bear_stickers_54/01_sleep_rest_white.png',
'./cute_bear_stickers_54/01_sleep_rest_brown.png',
'./cute_bear_stickers_54/01_sleep_rest_both.png',
'./cute_bear_stickers_54/02_wake_up_white.png',
'./cute_bear_stickers_54/02_wake_up_brown.png',
'./cute_bear_stickers_54/02_wake_up_both.png',
'./cute_bear_stickers_54/03_meal_eat_white.png',
'./cute_bear_stickers_54/03_meal_eat_brown.png',
'./cute_bear_stickers_54/03_meal_eat_both.png',
'./cute_bear_stickers_54/04_travel_ride_white.png',
'./cute_bear_stickers_54/04_travel_ride_brown.png',
'./cute_bear_stickers_54/04_travel_ride_both.png',
'./cute_bear_stickers_54/05_cash_in_white.png',
'./cute_bear_stickers_54/05_cash_in_brown.png',
'./cute_bear_stickers_54/05_cash_in_both.png',
'./cute_bear_stickers_54/06_cash_out_white.png',
'./cute_bear_stickers_54/06_cash_out_brown.png',
'./cute_bear_stickers_54/06_cash_out_both.png',
'./cute_bear_stickers_54/07_expense_white.png',
'./cute_bear_stickers_54/07_expense_brown.png',
'./cute_bear_stickers_54/07_expense_both.png',
'./cute_bear_stickers_54/08_income_white.png',
'./cute_bear_stickers_54/08_income_brown.png',
'./cute_bear_stickers_54/08_income_both.png',
'./cute_bear_stickers_54/09_task_todo_white.png',
'./cute_bear_stickers_54/09_task_todo_brown.png',
'./cute_bear_stickers_54/09_task_todo_both.png',
'./cute_bear_stickers_54/10_work_job_white.png',
'./cute_bear_stickers_54/10_work_job_brown.png',
'./cute_bear_stickers_54/10_work_job_both.png',
'./cute_bear_stickers_54/11_study_white.png',
'./cute_bear_stickers_54/11_study_brown.png',
'./cute_bear_stickers_54/11_study_both.png',
'./cute_bear_stickers_54/12_exercise_white.png',
'./cute_bear_stickers_54/12_exercise_brown.png',
'./cute_bear_stickers_54/12_exercise_both.png',
'./cute_bear_stickers_54/13_shopping_white.png',
'./cute_bear_stickers_54/13_shopping_brown.png',
'./cute_bear_stickers_54/13_shopping_both.png',
'./cute_bear_stickers_54/14_health_meds_white.png',
'./cute_bear_stickers_54/14_health_meds_brown.png',
'./cute_bear_stickers_54/14_health_meds_both.png',
'./cute_bear_stickers_54/15_leisure_white.png',
'./cute_bear_stickers_54/15_leisure_brown.png',
'./cute_bear_stickers_54/15_leisure_both.png',
'./cute_bear_stickers_54/16_note_journal_white.png',
'./cute_bear_stickers_54/16_note_journal_brown.png',
'./cute_bear_stickers_54/16_note_journal_both.png',
'./cute_bear_stickers_54/17_goal_plan_white.png',
'./cute_bear_stickers_54/17_goal_plan_brown.png',
'./cute_bear_stickers_54/17_goal_plan_both.png',
'./cute_bear_stickers_54/18_daily_log_white.png',
'./cute_bear_stickers_54/18_daily_log_brown.png',
'./cute_bear_stickers_54/18_daily_log_both.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('learninglife-shell-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
async function injectScripts(response){
 const html=await response.clone().text();let updated=html;
 for(const file of ['bible.js','debt.js','transfer.js','debt-installments.js','debt-wallet.js','finance-tools.js','reset-money.js','dashboard.js','clock.js','goals-refresh.js','wallet-sync.js','money-layout.js','learninglife-update.js','calendar-fix.js','text-size.js','bubu-theme.js','bubu-stickers.js','bubu-layout-fix.js']){
  if(!updated.includes(`src="./${file}"`)&&!updated.includes(`src="${file}"`))updated=updated.replace(/<\/body\s*>/i,`<script src="./${file}"></script>\n</body>`);
 }
 if(updated===html)return response;
 const h=new Headers(response.headers);h.delete('content-length');h.delete('content-encoding');h.set('content-type','text/html; charset=utf-8');
 return new Response(updated,{status:response.status,statusText:response.statusText,headers:h});
}
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);const page=u.origin===self.location.origin&&(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/'));
 e.respondWith((async()=>{
  if(page){try{const fresh=await fetch(e.request,{cache:'no-store'});if(fresh.ok)caches.open(CACHE_NAME).then(c=>c.put('./index.html',fresh.clone()));return injectScripts(fresh)}
   catch(err){const cached=await caches.match('./index.html');if(cached)return injectScripts(cached);throw err}}
  let r=await caches.match(e.request);if(!r){r=await fetch(e.request);if(r.ok&&u.origin===self.location.origin)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()))}return r;
 })());
});

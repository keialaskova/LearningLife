const CACHE_NAME='learninglife-shell-v36';
const APP_SHELL=[
'./','./index.html','./bible.js','./redesign.css','./redesign-v30.css','./clock.js',
'./dashboard.js','./debt-installments.js','./debt-wallet.js','./debt.js','./finance-tools.js',
'./goals-refresh.js','./learninglife-update.js','./manifest.webmanifest','./money-layout.js',
'./reset-money.js','./sw.js','./transfer.js','./wallet-sync.js','./calendar-fix.js','./text-size.js',
'./bubu-theme.js','./assets/bubu-bear.png','./assets/bubu-dudu-beach.jpg','./assets/bubu-dudu-cooking.mp4',
'./icon-192.png','./icon-512.png','./icon-maskable-512.png',
'./cute_bear_stickers_54/01_sleep_rest_white.png','./cute_bear_stickers_54/02_sleep_rest_brown.png','./cute_bear_stickers_54/03_sleep_rest_both.png',
'./cute_bear_stickers_54/04_wake_up_white.png','./cute_bear_stickers_54/05_wake_up_brown.png','./cute_bear_stickers_54/06_wake_up_both.png',
'./cute_bear_stickers_54/07_meal_eat_white.png','./cute_bear_stickers_54/08_meal_eat_brown.png','./cute_bear_stickers_54/09_meal_eat_both.png',
'./cute_bear_stickers_54/10_travel_ride_white.png','./cute_bear_stickers_54/11_travel_ride_brown.png','./cute_bear_stickers_54/12_travel_ride_both.png',
'./cute_bear_stickers_54/13_cash_in_white.png','./cute_bear_stickers_54/14_cash_in_brown.png','./cute_bear_stickers_54/15_cash_in_both.png',
'./cute_bear_stickers_54/16_cash_out_white.png','./cute_bear_stickers_54/17_cash_out_brown.png','./cute_bear_stickers_54/18_cash_out_both.png',
'./cute_bear_stickers_54/19_expense_white.png','./cute_bear_stickers_54/20_expense_brown.png','./cute_bear_stickers_54/21_expense_both.png',
'./cute_bear_stickers_54/22_income_white.png','./cute_bear_stickers_54/23_income_brown.png','./cute_bear_stickers_54/24_income_both.png',
'./cute_bear_stickers_54/25_task_todo_white.png','./cute_bear_stickers_54/26_task_todo_brown.png','./cute_bear_stickers_54/27_task_todo_both.png',
'./cute_bear_stickers_54/28_work_job_white.png','./cute_bear_stickers_54/29_work_job_brown.png','./cute_bear_stickers_54/30_work_job_both.png',
'./cute_bear_stickers_54/31_study_white.png','./cute_bear_stickers_54/32_study_brown.png','./cute_bear_stickers_54/33_study_both.png',
'./cute_bear_stickers_54/34_exercise_white.png','./cute_bear_stickers_54/35_exercise_brown.png','./cute_bear_stickers_54/36_exercise_both.png',
'./cute_bear_stickers_54/37_shopping_white.png','./cute_bear_stickers_54/38_shopping_brown.png','./cute_bear_stickers_54/39_shopping_both.png',
'./cute_bear_stickers_54/40_health_meds_white.png','./cute_bear_stickers_54/41_health_meds_brown.png','./cute_bear_stickers_54/42_health_meds_both.png',
'./cute_bear_stickers_54/43_leisure_white.png','./cute_bear_stickers_54/44_leisure_brown.png','./cute_bear_stickers_54/45_leisure_both.png',
'./cute_bear_stickers_54/46_note_journal_white.png','./cute_bear_stickers_54/47_note_journal_brown.png','./cute_bear_stickers_54/48_note_journal_both.png',
'./cute_bear_stickers_54/49_goal_plan_white.png','./cute_bear_stickers_54/50_goal_plan_brown.png','./cute_bear_stickers_54/51_goal_plan_both.png',
'./cute_bear_stickers_54/52_daily_log_white.png','./cute_bear_stickers_54/53_daily_log_brown.png','./cute_bear_stickers_54/54_daily_log_both.png'
];

self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(
  keys.filter(key=>key.startsWith('learninglife-shell-')&&key!==CACHE_NAME).map(key=>caches.delete(key))
 )));
 self.clients.claim();
});
async function withAppScripts(response){
 const html=await response.clone().text();
 let updated=html;
 for(const file of ['bible.js','debt.js','transfer.js','debt-installments.js','debt-wallet.js','finance-tools.js','reset-money.js','dashboard.js','clock.js','goals-refresh.js','wallet-sync.js','money-layout.js','learninglife-update.js','calendar-fix.js','text-size.js','bubu-theme.js']){
  if(!updated.includes(`src="./${file}"`)) updated=updated.replace(/<\/body\s*>/i,`<script src="./${file}"></script>\n</body>`);
 }
 if(updated===html)return response;
 const headers=new Headers(response.headers);
 headers.delete('content-length');headers.delete('content-encoding');
 headers.set('content-type','text/html; charset=utf-8');
 return new Response(updated,{status:response.status,statusText:response.statusText,headers});
}
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 const isHtml=url.origin===self.location.origin&&(
  event.request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/')
 );
 event.respondWith((async()=>{
  if(isHtml){
   try{
    const fresh=await fetch(event.request,{cache:'no-store'});
    if(fresh.ok)caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',fresh.clone()));
    return withAppScripts(fresh);
   }catch(error){
    const cached=await caches.match('./index.html');
    if(cached)return withAppScripts(cached);
    throw error;
   }
  }
  let response=await caches.match(event.request);
  if(!response){
   response=await fetch(event.request);
   if(response.ok&&url.origin===self.location.origin)caches.open(CACHE_NAME).then(cache=>cache.put(event.request,response.clone()));
  }
  return response;
 })());
});

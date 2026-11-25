const CACHE_NAME='learninglife-shell-v31';

const APP_SHELL=[
'./',
'./index.html',
'./bible.js',
'./redesign.css',
'./redesign-v30.css',
'./clock.js',
'./dashboard.js',
'./debt-installments.js',
'./debt-wallet.js',
'./debt.js',
'./finance-tools.js',
'./goals-refresh.js',
'./learninglife-update.js',
'./manifest.webmanifest',
'./money-layout.js',
'./reset-money.js',
'./sw.js',
'./transfer.js',
'./wallet-sync.js',
'./calendar-fix.js',
'./icon-192.png',
'./icon-512.png',
'./icon-maskable-512.png'
];

self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));
 self.skipWaiting();
});

self.addEventListener('activate',e=>{
 e.waitUntil(
  caches.keys().then(keys=>
   Promise.all(keys.filter(k=>
    k.startsWith('learninglife-shell-')&&k!==CACHE_NAME
   ).map(k=>caches.delete(k)))
  )
 );
 self.clients.claim();
});

async function withAppScripts(response){
 const html=await response.clone().text();
 let updated=html;

 for(const file of [
  'bible.js','debt.js','transfer.js','debt-installments.js',
  'debt-wallet.js','finance-tools.js','reset-money.js',
  'dashboard.js','clock.js','goals-refresh.js','wallet-sync.js',
  'money-layout.js','learninglife-update.js','calendar-fix.js'
 ]){
  if(!updated.includes(`src="./${file}"`)){
   updated=updated.replace(
    /<\/body\s*>/i,
    `<script src="./${file}"></script>\n</body>`
   );
  }
 }

 if(updated===html)return response;

 const h=new Headers(response.headers);
 h.delete('content-length');
 h.delete('content-encoding');
 h.set('content-type','text/html; charset=utf-8');

 return new Response(updated,{
  status:response.status,
  statusText:response.statusText,
  headers:h
 });
}

self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;

 const u=new URL(e.request.url);
 const isHtml=u.origin===self.location.origin&&(
  e.request.mode==='navigate'||
  u.pathname.endsWith('/index.html')||
  u.pathname.endsWith('/')
 );

 e.respondWith((async()=>{
  if(isHtml){
   try{
    const fresh=await fetch(e.request,{cache:'no-store'});
    if(fresh.ok)caches.open(CACHE_NAME).then(c=>c.put('./index.html',fresh.clone()));
    return withAppScripts(fresh);
   }catch(err){
    const cached=await caches.match('./index.html');
    if(cached)return withAppScripts(cached);
    throw err;
   }
  }

  let r=await caches.match(e.request);
  if(!r){
   r=await fetch(e.request);
   if(r.ok&&u.origin===self.location.origin){
    caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));
   }
  }
  return r;
 })());
});

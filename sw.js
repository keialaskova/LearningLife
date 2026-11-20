const CACHE_NAME = 'learninglife-shell-v4';
const APP_SHELL = [
  './', './index.html', './bible.js', './debt.js', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('learninglife-shell-') && key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

async function withAppScripts(response) {
  const html = await response.clone().text();
  let updated = html;
  if (!updated.includes('src="./bible.js"')) updated = updated.replace(/<\/body\s*>/i, '<script src="./bible.js"></script>\n</body>');
  if (!updated.includes('src="./debt.js"')) updated = updated.replace(/<\/body\s*>/i, '<script src="./debt.js"></script>\n</body>');
  if (updated === html) return response;
  const headers = new Headers(response.headers);
  headers.delete('content-length'); headers.delete('content-encoding');
  headers.set('content-type', 'text/html; charset=utf-8');
  return new Response(updated, {status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isAppHtml = url.origin === self.location.origin &&
    (event.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/'));
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    let response = cached;
    if (!response) {
      try {
        response = await fetch(event.request);
        if (response.ok && url.origin === self.location.origin) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request,response.clone()));
        }
      } catch (error) {
        if (isAppHtml) response = await caches.match('./index.html');
        else throw error;
      }
    }
    if (isAppHtml && response) return withAppScripts(response);
    return response;
  })());
});

const V='speedtrack-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(['/','/manifest.webmanifest','/assets/icon-192.png'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=e.request.url;if(e.request.method!=='GET'||u.includes('tile.openstreetmap.org'))return;
 e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>hit);return hit||net}))});

/* Learning Life — Theme 7: Bubu & Dudu Beach. Adds a separate complete visual layer.
   Existing app features, data keys and the six original themes are not changed. */
(() => {
  const designKey = 'workinglife_design';
  const themeName = 'Bubu & Dudu Beach';
  const asset = './assets/';
  const css = `
  body[data-design="bubu"]{--bg:#fff8f7;--panel:#fffdfb;--ink:#56352f;--muted:#987773;--line:#f1d5cd;--accent:#ee8f91;--accent2:#ffe5df;--shadow:0 8px 24px rgba(129,85,73,.10);font-family:"Trebuchet MS",system-ui,sans-serif;background:linear-gradient(180deg,#a6e8f7 0,#d9f5fa 190px,#fff1dc 360px,#fff8f7 520px);color:var(--ink)}
  body[data-design="bubu"] .app{max-width:1120px;padding:20px 18px 46px}
  body[data-design="bubu"] header{border:1px solid #f3d2c9;border-radius:24px;padding:16px 20px;background:linear-gradient(110deg,rgba(255,239,231,.97),rgba(235,249,255,.97));box-shadow:var(--shadow)}
  body[data-design="bubu"] .brand{color:#714238;font-weight:900;letter-spacing:-.4px}
  body[data-design="bubu"] nav{background:#fffaf7;border:1px solid #f1d6cd;border-radius:22px;padding:8px;box-shadow:var(--shadow)}
  body[data-design="bubu"] .navbtn{border-radius:15px;color:#76534c}
  body[data-design="bubu"] .navbtn.active,body[data-design="bubu"] .navbtn[aria-current="page"]{background:#ffe0dc;color:#713e39}
  body[data-design="bubu"] .welcome{position:relative;overflow:hidden;min-height:160px;padding:27px 30px;border:1px solid #efcfc4;border-radius:27px;background:linear-gradient(105deg,rgba(255,236,225,.97),rgba(231,248,255,.94)),url('${asset}bubu-dudu-beach.jpg') center 48%/cover;box-shadow:var(--shadow)}
  body[data-design="bubu"] .welcome:after{content:"";position:absolute;right:10px;bottom:-5px;width:145px;height:115px;background:url('${asset}bubu-bear.png') center/contain no-repeat;pointer-events:none}
  body[data-design="bubu"] .welcome h1{position:relative;z-index:1;color:#714238;font-size:clamp(24px,4vw,34px);max-width:72%}
  body[data-design="bubu"] .welcome p{position:relative;z-index:1;color:#8b655e;max-width:70%}
  body[data-design="bubu"] .panel,body[data-design="bubu"] .card,body[data-design="bubu"] .stat{border:1px solid #f1d8d0;border-radius:22px;background:rgba(255,253,251,.97);box-shadow:var(--shadow)}
  body[data-design="bubu"] .panel{padding:20px}
  body[data-design="bubu"] .stat:nth-child(1){background:linear-gradient(135deg,#fff0e9,#fffdfb)}body[data-design="bubu"] .stat:nth-child(2){background:linear-gradient(135deg,#eaf8ff,#fffdfb)}body[data-design="bubu"] .stat:nth-child(3){background:linear-gradient(135deg,#fff5dc,#fffdfb)}
  body[data-design="bubu"] .btn{border-radius:14px;background:#ee8f91;color:#fff;border-color:#e98488}body[data-design="bubu"] .btn.secondary{background:#fff0ed;color:#75483f;border-color:#f0d0c8}
  body[data-design="bubu"] .field{border:1px solid #edcfc6;border-radius:13px;background:#fff;color:#56352f}
  body[data-design="bubu"] .pill{border-radius:999px;background:#eaf7ff;color:#5b7280}
  body[data-design="bubu"] .sub,body[data-design="bubu"] small{color:#987773}
  body[data-design="bubu"] .bubu-video-card{margin:14px 0 18px;padding:12px;border-radius:24px;background:#fffaf7;border:1px solid #efcfc4;box-shadow:var(--shadow)}
  body[data-design="bubu"] .bubu-video-card h2{font-size:17px;margin:2px 4px 10px;color:#714238}
  body[data-design="bubu"] .bubu-video-card video{display:block;width:100%;max-height:250px;object-fit:contain;background:#f7e8e3;border-radius:17px}
  body[data-design="bubu"] .bubu-video-note{font-size:12px;color:#987773;margin:8px 4px 2px}
  body[data-design="bubu"] .theme-choice[data-design="bubu"]{background:#fff0ed;border-color:#edaaa7}
  body.dark[data-design="bubu"]{--bg:#211b28;--panel:#302638;--ink:#fff0f5;--muted:#e0bfd0;--line:#594257;--accent:#f2a5c0;--accent2:#493344;background:linear-gradient(180deg,#334b60 0,#302c48 230px,#241d2b 480px)}
  body.dark[data-design="bubu"] header,body.dark[data-design="bubu"] nav,body.dark[data-design="bubu"] .panel,body.dark[data-design="bubu"] .card,body.dark[data-design="bubu"] .stat,body.dark[data-design="bubu"] .bubu-video-card{background:#302638;border-color:#594257;color:#fff0f5}
  body.dark[data-design="bubu"] .welcome{background:linear-gradient(110deg,rgba(73,51,68,.96),rgba(48,59,84,.94)),url('${asset}bubu-dudu-beach.jpg') center/cover}body.dark[data-design="bubu"] .welcome h1,body.dark[data-design="bubu"] .bubu-video-card h2{color:#fff0f5}body.dark[data-design="bubu"] .welcome p,body.dark[data-design="bubu"] .sub{color:#e0bfd0}body.dark[data-design="bubu"] .field{background:#282230;color:#fff0f5;border-color:#594257}
  @media(max-width:720px){body[data-design="bubu"] .app{padding:12px 10px 28px}body[data-design="bubu"] header{padding:13px;border-radius:18px}body[data-design="bubu"] .welcome{min-height:125px;padding:20px 17px;border-radius:21px}body[data-design="bubu"] .welcome:after{width:105px;height:90px;right:0}body[data-design="bubu"] .welcome h1{font-size:24px;max-width:72%}body[data-design="bubu"] .welcome p{font-size:13px;max-width:70%}body[data-design="bubu"] .panel{padding:15px;border-radius:18px}body[data-design="bubu"] .bubu-video-card video{max-height:205px}}
  `;
  function init(){
    if('caches' in window){caches.open('learninglife-shell-v33').then(c=>c.addAll([asset+'bubu-bear.png',asset+'bubu-dudu-beach.jpg',asset+'bubu-dudu-cooking.mp4'])).catch(()=>{});}
    if(!document.getElementById('bubuThemeStyles')){const st=document.createElement('style');st.id='bubuThemeStyles';st.textContent=css;document.head.appendChild(st)}
    if(typeof designNames!=='undefined')designNames.bubu=themeName;
    const grid=document.getElementById('designChoices');
    if(grid&&!grid.querySelector('[data-design="bubu"]')){
      const b=document.createElement('button');b.type='button';b.className='theme-choice';b.dataset.design='bubu';
      b.innerHTML='<span class="swatches"><i style="background:#fff0e9"></i><i style="background:#ffe0dc"></i><i style="background:#dff5ff"></i><i style="background:#ee8f91"></i></span><strong>Bubu & Dudu Beach</strong><small>Pastel · cute · seaside</small>';
      grid.appendChild(b);b.addEventListener('click',()=>{if(typeof applyDesign==='function')applyDesign('bubu')});
    }
    const home=document.getElementById('home');
    if(home&&!home.querySelector('.bubu-video-card')){
      const card=document.createElement('div');card.className='bubu-video-card';
      card.innerHTML='<h2>♡ A little Bubu & Dudu moment</h2><video controls muted loop playsinline preload="metadata" poster="'+asset+'bubu-dudu-beach.jpg"><source src="'+asset+'bubu-dudu-cooking.mp4" type="video/mp4">Your browser does not support this video.</video><p class="bubu-video-note">A tiny happy break for your day. Use the controls to play or pause.</p>';
      const welcome=home.querySelector('.welcome');if(welcome)welcome.insertAdjacentElement('afterend',card);else home.prepend(card);
    }
    if(document.body.dataset.design==='bubu'&&typeof applyDesign==='function')applyDesign('bubu');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* Learning Life Theme 7 — v52: consistent full-width layout across EVERY feature and subcategory */
(() => {
  "use strict";
  const active = () => document.body?.dataset.design === "bubu";
  const css = `
/* Every top-level feature page */
body[data-design="bubu"] main{display:block!important;width:100%!important;max-width:none!important;min-width:0!important}
body[data-design="bubu"] main>.section{display:none!important;width:100%!important;max-width:none!important;min-width:0!important}
body[data-design="bubu"] main>.section.active{display:block!important;width:100%!important;max-width:none!important;min-width:0!important;float:none!important}

/* All cards and content panels in every feature, including nested tabs/categories */
body[data-design="bubu"] main>.section.active .welcome,
body[data-design="bubu"] main>.section.active .panel,
body[data-design="bubu"] main>.section.active .card,
body[data-design="bubu"] main>.section.active .feature-card,
body[data-design="bubu"] main>.section.active .subpanel{
  box-sizing:border-box!important;min-width:0!important;max-width:100%!important;float:none!important
}
body[data-design="bubu"] main>.section.active>.welcome,
body[data-design="bubu"] main>.section.active>.panel,
body[data-design="bubu"] main>.section.active>.card{
  display:block!important;width:100%!important;margin:0 0 14px!important;grid-column:1/-1!important
}
/* Prevent old multi-column wrappers from squeezing entire feature pages */
body[data-design="bubu"] main>.section.active>.content-grid,
body[data-design="bubu"] main>.section.active>.settings-grid,
body[data-design="bubu"] main>.section.active>.feature-grid,
body[data-design="bubu"] main>.section.active>.columns,
body[data-design="bubu"] main>.section.active>.two-column,
body[data-design="bubu"] main>.section.active>.three-column{
  display:grid!important;grid-template-columns:minmax(0,1fr)!important;width:100%!important;max-width:none!important
}
/* Nested category/subtab panes must fill the content area too */
body[data-design="bubu"] main>.section.active [role="tabpanel"],
body[data-design="bubu"] main>.section.active .tab-content,
body[data-design="bubu"] main>.section.active .subtab-content,
body[data-design="bubu"] main>.section.active .category-content{
  width:100%!important;max-width:none!important;min-width:0!important;box-sizing:border-box!important
}
body[data-design="bubu"] main>.section.active [role="tabpanel"]>.panel,
body[data-design="bubu"] main>.section.active .tab-content>.panel,
body[data-design="bubu"] main>.section.active .subtab-content>.panel,
body[data-design="bubu"] main>.section.active .category-content>.panel{
  width:100%!important;max-width:none!important
}
/* Forms and data lists can use the full available width */
body[data-design="bubu"] main>.section.active form,
body[data-design="bubu"] main>.section.active .formrow,
body[data-design="bubu"] main>.section.active .list,
body[data-design="bubu"] main>.section.active .history-list,
body[data-design="bubu"] main>.section.active .report-list{
  max-width:100%!important;min-width:0!important
}
body[data-design="bubu"] main>.section.active input,
body[data-design="bubu"] main>.section.active select,
body[data-design="bubu"] main>.section.active textarea{max-width:100%!important;min-width:0!important}

/* Settings and finance overview */
body[data-design="bubu"] #settings.section.active{display:block!important;width:100%!important}
body[data-design="bubu"] #settings>.panel{width:100%!important;max-width:none!important}
body[data-design="bubu"] #settings .theme-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}
body[data-design="bubu"] #money .moneygrid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}

/* Move the actual cooking video into the Home welcome banner */
body[data-design="bubu"] #home>.welcome{position:relative!important;display:flex!important;min-height:132px!important;padding:20px 220px 20px 24px!important;box-sizing:border-box!important}
body[data-design="bubu"] #bubuWelcomeVideo{
  position:absolute!important;right:12px!important;top:10px!important;bottom:10px!important;
  width:190px!important;height:auto!important;display:flex!important;align-items:center!important;
  justify-content:center!important;padding:3px!important;margin:0!important;
  border:1px solid #f1dfe3!important;border-radius:15px!important;
  background:#fffdfb!important;overflow:hidden!important;z-index:3!important
}
body[data-design="bubu"] #bubuWelcomeVideo video{
  display:block!important;width:100%!important;height:100%!important;max-height:none!important;
  aspect-ratio:16/9!important;object-fit:contain!important;background:#fff2f0!important;border-radius:11px!important
}
body[data-design="bubu"] #bubuVideoCard{display:none!important}
@media(max-width:700px){
 body[data-design="bubu"] #home>.welcome{padding:15px 128px 15px 16px!important;min-height:112px!important}
 body[data-design="bubu"] #bubuWelcomeVideo{right:7px!important;top:7px!important;bottom:7px!important;width:112px!important}
 body[data-design="bubu"] #settings .theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 body[data-design="bubu"] #money .moneygrid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 body[data-design="bubu"] #money .moneybox:last-child{grid-column:1/-1!important}
}
@media(max-width:380px){
 body[data-design="bubu"] #home>.welcome{padding-right:100px!important}
 body[data-design="bubu"] #bubuWelcomeVideo{width:88px!important}
}
`;
  function syncVideo(){
    const home=document.getElementById("home");
    const welcome=home?.querySelector(":scope > .welcome");
    const oldCard=document.getElementById("bubuVideoCard");
    const video=document.getElementById("bubuCookingVideo");
    if(!home||!welcome||!oldCard||!video)return;
    // Stats were accidentally placed inside the former video card: move them back into Home.
    const stats=oldCard.querySelector(":scope > .stats");
    if(stats&&stats.parentElement!==home)home.insertBefore(stats,oldCard.nextSibling);
    let frame=document.getElementById("bubuWelcomeVideo");
    if(!frame){frame=document.createElement("div");frame.id="bubuWelcomeVideo";frame.setAttribute("aria-label","Bubu and Dudu cooking video");welcome.appendChild(frame);}
    if(video.parentElement!==frame)frame.appendChild(video);
    oldCard.style.setProperty("display","none","important");
    const enabled=localStorage.getItem("learninglife_bubu_animation")!=="off";
    video.muted=true;video.loop=true;video.autoplay=true;video.playsInline=true;
    video.setAttribute("muted","");video.setAttribute("loop","");video.setAttribute("autoplay","");video.setAttribute("playsinline","");
    if(active()&&enabled&&home.classList.contains("active")){
      frame.style.display="flex";const p=video.play();if(p?.catch)p.catch(()=>{});
    }else{video.pause();frame.style.display="none";}
  }
  function run(){
    if(!document.body)return;
    if(active()){
      syncVideo();
      document.querySelectorAll("main>.section").forEach(s=>s.style.removeProperty("display"));
    }else{
      const v=document.getElementById("bubuCookingVideo");if(v)v.pause();
      const f=document.getElementById("bubuWelcomeVideo");if(f)f.style.display="none";
      document.querySelectorAll("main>.section").forEach(s=>s.style.removeProperty("display"));
    }
  }
  const style=document.createElement("style");style.id="bubu-v52-all-categories";style.textContent=css;
  (document.head||document.documentElement).appendChild(style);
  function init(){
    run();
    document.addEventListener("click",e=>{if(e.target.closest(".navbtn,.theme-choice,[data-tab],[data-category]"))setTimeout(run,100);},true);
    document.addEventListener("change",e=>{if(e.target?.id==="bubuAnimation")setTimeout(run,100);},true);
    new MutationObserver(run).observe(document.body,{attributes:true,attributeFilter:["data-design"]});
    window.addEventListener("pageshow",run);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
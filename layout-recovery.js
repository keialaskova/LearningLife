/* Learning Life — shared layout recovery v56 */
(() => {
  "use strict";
  const ID = "learninglife-shared-layout-recovery-v56";
  const css = `
  html body[data-design] .app > .layout > main {
    display:block!important; width:100%!important; min-width:0!important;
    max-width:none!important; align-self:stretch!important;
  }
  html body[data-design] main > .section { min-width:0!important; box-sizing:border-box!important; }
  html body[data-design] main > .section.active {
    display:block!important; width:100%!important; min-width:0!important;
    max-width:none!important; grid-column:1/-1!important;
  }
  html body[data-design] #settings.section.active {
    display:block!important; width:100%!important; min-width:0!important;
    max-width:none!important; columns:initial!important;
  }
  html body[data-design] #settings > .welcome,
  html body[data-design] #settings > .panel {
    display:block!important; float:none!important; position:relative!important;
    width:100%!important; min-width:0!important; max-width:none!important;
    box-sizing:border-box!important; margin-left:0!important; margin-right:0!important;
    clear:both!important;
  }
  html body[data-design] #settings .theme-grid,
  html body[data-design] #settings #designChoices {
    display:grid!important; grid-template-columns:repeat(3,minmax(0,1fr))!important;
    width:100%!important; min-width:0!important; gap:12px!important;
  }
  html body[data-design] #settings .theme-choice {
    display:flex!important; flex-direction:column!important; align-items:flex-start!important;
    width:100%!important; min-width:0!important; max-width:none!important;
    white-space:normal!important; overflow-wrap:anywhere!important; word-break:normal!important;
    box-sizing:border-box!important;
  }
  html body[data-design] #settings .theme-choice strong,
  html body[data-design] #settings .theme-choice small {
    display:block!important; max-width:100%!important; white-space:normal!important;
    overflow-wrap:anywhere!important; word-break:normal!important;
  }
  html body[data-design] #settings .mode-row {
    display:flex!important; width:100%!important; min-width:0!important;
    align-items:center!important; justify-content:space-between!important;
    flex-wrap:wrap!important; gap:12px!important;
  }
  html body[data-design] #settings .mode-row > div { flex:1 1 220px!important; min-width:0!important; }
  html body[data-design] #settings .mode-row select { flex:0 1 160px!important; max-width:160px!important; }
  html body:not([data-design="bubu"]) #home.section.active { display:block!important; }
  html body:not([data-design="bubu"]) #home > .welcome,
  html body:not([data-design="bubu"]) #home > .stats,
  html body:not([data-design="bubu"]) #home > .panel {
    width:100%; min-width:0; box-sizing:border-box;
  }
  html body:not([data-design="bubu"]) #home > .stats {
    display:grid!important; grid-template-columns:repeat(3,minmax(0,1fr))!important;
  }
  html body:not([data-design="bubu"]) #home > .panel {
    display:block!important; float:none!important; clear:both!important;
  }
  @media(max-width:900px) {
    html body[data-design] #settings .theme-grid,
    html body[data-design] #settings #designChoices {
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
    }
  }
  @media(max-width:720px) {
    html body[data-design] .app > .layout > main { width:100%!important; }
    html body[data-design] #settings .theme-grid,
    html body[data-design] #settings #designChoices { grid-template-columns:repeat(2,minmax(0,1fr))!important; }
    html body:not([data-design="bubu"]) #home > .stats {
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
    }
  }
  @media(max-width:380px) {
    html body[data-design] #settings .theme-grid,
    html body[data-design] #settings #designChoices { grid-template-columns:1fr 1fr!important; gap:8px!important; }
  }`;
  function install() {
    if (document.getElementById(ID)) return;
    const style=document.createElement("style");
    style.id=ID; style.textContent=css;
    (document.head||document.documentElement).appendChild(style);
  }
  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded",install,{once:true});
  else install();
})();

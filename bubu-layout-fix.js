/* Learning Life — Theme 7 layout guard v54
   CSS-only: never changes section visibility or moves dashboard elements. */
(() => {
  "use strict";
  const css = `
  body[data-design="bubu"] main { display:block!important; width:100%!important; max-width:none!important; min-width:0!important; }
  body[data-design="bubu"] main>.section.active { display:block!important; width:100%!important; max-width:none!important; min-width:0!important; }
  body[data-design="bubu"] #settings.section.active { display:block!important; width:100%!important; }
  body[data-design="bubu"] #settings>.welcome,
  body[data-design="bubu"] #settings>.panel { display:block!important; width:100%!important; max-width:none!important; min-width:0!important; box-sizing:border-box!important; }
  body[data-design="bubu"] #settings .theme-grid { display:grid!important; grid-template-columns:repeat(3,minmax(0,1fr))!important; gap:10px!important; }
  body[data-design="bubu"] #settings .theme-choice { min-width:0!important; width:100%!important; }
  body[data-design="bubu"] main>.section.active .panel,
  body[data-design="bubu"] main>.section.active .card { box-sizing:border-box!important; min-width:0!important; max-width:100%!important; }
  body[data-design="bubu"] main>.section.active form,
  body[data-design="bubu"] main>.section.active input,
  body[data-design="bubu"] main>.section.active select,
  body[data-design="bubu"] main>.section.active textarea { max-width:100%!important; min-width:0!important; }
  @media(max-width:720px) {
    body[data-design="bubu"] #settings .theme-grid { grid-template-columns:repeat(2,minmax(0,1fr))!important; }
  }`;
  if (!document.getElementById("bubu-v54-layout-guard")) {
    const style=document.createElement("style");
    style.id="bubu-v54-layout-guard";
    style.textContent=css;
    (document.head||document.documentElement).appendChild(style);
  }
})();

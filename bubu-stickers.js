/* Learning Life — real Bubu & Dudu sticker integration (Theme 7 only) */
(() => {
  "use strict";
  const ROOT = "./cute_bear_stickers_54/";
  const PREF = "learninglife_bubu_sticker_choices_v1";
  const groups = {
    sleep: ["01_sleep_rest_white.png","02_sleep_rest_brown.png","03_sleep_rest_both.png"],
    wake: ["04_wake_up_white.png","05_wake_up_brown.png","06_wake_up_both.png"],
    meal: ["07_meal_eat_white.png","08_meal_eat_brown.png","09_meal_eat_both.png"],
    travel: ["10_travel_ride_white.png","11_travel_ride_brown.png","12_travel_ride_both.png"],
    cashin: ["13_cash_in_white.png","14_cash_in_brown.png","15_cash_in_both.png"],
    cashout: ["16_cash_out_white.png","17_cash_out_brown.png","18_cash_out_both.png"],
    expense: ["19_expense_white.png","20_expense_brown.png","21_expense_both.png"],
    income: ["22_income_white.png","23_income_brown.png","24_income_both.png"],
    task: ["25_task_todo_white.png","26_task_todo_brown.png","27_task_todo_both.png"],
    work: ["28_work_job_white.png","29_work_job_brown.png","30_work_job_both.png"],
    study: ["31_study_white.png","32_study_brown.png","33_study_both.png"],
    exercise: ["34_exercise_white.png","35_exercise_brown.png","36_exercise_both.png"],
    shopping: ["37_shopping_white.png","38_shopping_brown.png","39_shopping_both.png"],
    health: ["40_health_meds_white.png","41_health_meds_brown.png","42_health_meds_both.png"],
    leisure: ["43_leisure_white.png","44_leisure_brown.png","45_leisure_both.png"],
    notes: ["46_note_journal_white.png","47_note_journal_brown.png","48_note_journal_both.png"],
    goals: ["49_goal_plan_white.png","50_goal_plan_brown.png","51_goal_plan_both.png"],
    journal: ["52_daily_log_white.png","53_daily_log_brown.png","54_daily_log_both.png"]
  };
  const pages = {
    home:"journal", tasks:"task", schedule:"wake", money:"income", calendar:"wake",
    notes:"notes", bible:"study", goals:"goals", savings:"income", habits:"exercise",
    reminders:"task", reports:"expense", weekly:"journal", journal:"journal"
  };
  const labels = [
    ["home","Dashboard","journal"],["tasks","Daily Tasks","task"],
    ["schedule","Schedule","wake"],["money","Money Tracker","income"],
    ["calendar","Calendar","wake"],["notes","Notes","notes"],
    ["bible","Bible & Reflection","study"],["goals","Goals & Milestones","goals"],
    ["savings","Savings","income"],["habits","Habit Tracker","exercise"],
    ["reminders","Reminders","task"],["reports","Monthly Reports","expense"],
    ["weekly","Weekly Overview","journal"],["journal","Daily Journal","journal"]
  ];
  let choices = {};
  try { choices = JSON.parse(localStorage.getItem(PREF) || "{}") || {}; } catch (_) {}

  const fileFor = (key, who) => {
    const set = groups[key] || groups.journal;
    return ROOT + set[who === "bubu" ? 0 : who === "dudu" ? 1 : 2];
  };
  const active = () => document.body.dataset.design === "bubu";

  const css = `
  body[data-design="bubu"] .bubu-page-sticker{
    position:absolute!important;right:18px!important;bottom:2px!important;
    width:clamp(92px,15vw,158px)!important;height:clamp(92px,15vw,158px)!important;
    object-fit:contain!important;z-index:2!important;pointer-events:none!important;
    filter:drop-shadow(0 7px 8px rgba(120,80,90,.12))!important;
  }
  body[data-design="bubu"] .welcome{padding-right:clamp(125px,19vw,195px)!important}
  body[data-design="bubu"] .welcome:after{display:none!important}
  body[data-design="bubu"] .welcome:before{opacity:.10!important}
  body[data-design="bubu"] .bubu-sticker-panel{margin-top:18px!important}
  body[data-design="bubu"] .bubu-sticker-panel .bubu-picker-grid{
    display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important
  }
  body[data-design="bubu"] .bubu-picker-card{
    display:flex!important;flex-direction:column!important;align-items:center!important;gap:7px!important;
    min-width:0!important;padding:12px!important;border:1px solid #f0dce1!important;
    border-radius:17px!important;background:#fff9f8!important
  }
  body[data-design="bubu"] .bubu-picker-card img{width:100%!important;height:92px!important;object-fit:contain!important}
  body[data-design="bubu"] .bubu-picker-card strong{font-size:12px!important;color:#9d6277!important;text-align:center!important}
  body[data-design="bubu"] .bubu-picker-card select{
    width:100%!important;min-width:0!important;padding:7px!important;border-radius:10px!important;
    border:1px solid #ecd9df!important;background:#fff!important;color:#725663!important;font-size:12px!important
  }
  body[data-design="bubu"] .bubu-home-sticker{
    display:flex!important;align-items:center!important;justify-content:center!important;
    padding:8px!important;margin:0 0 14px!important;border:1px solid #f1dfe3!important;
    border-radius:20px!important;background:linear-gradient(110deg,#fff0f2,#effaff)!important
  }
  body[data-design="bubu"] .bubu-home-sticker img{width:min(210px,48vw)!important;height:138px!important;object-fit:contain!important}
  @media(max-width:560px){
    body[data-design="bubu"] .welcome{padding-right:116px!important}
    body[data-design="bubu"] .bubu-page-sticker{right:7px!important;width:112px!important;height:112px!important}
    body[data-design="bubu"] .bubu-sticker-panel .bubu-picker-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  }`;
  const style = document.createElement("style"); style.id = "bubu-real-stickers-css"; style.textContent = css;
  document.head.appendChild(style);

  function setPageStickers() {
    if (!active()) {
      document.querySelectorAll(".bubu-page-sticker,.bubu-home-sticker").forEach(n => n.remove());
      const panel = document.getElementById("bubuStickerSettings"); if (panel) panel.hidden = true;
      return;
    }
    const panel = document.getElementById("bubuStickerSettings"); if (panel) panel.hidden = false;
    document.querySelectorAll("main .section").forEach(section => {
      const page = section.id;
      const welcome = section.querySelector(".welcome");
      if (!welcome) return;
      let img = welcome.querySelector(".bubu-page-sticker");
      if (!img) {
        img = document.createElement("img");
        img.className = "bubu-page-sticker";
        img.alt = "Bubu and Dudu sticker";
        img.loading = "lazy";
        welcome.appendChild(img);
      }
      const key = pages[page] || "journal";
      img.src = fileFor(key, choices[key] || "both");
      img.dataset.stickerKey = key;
    });
    const home = document.getElementById("home");
    if (home && !home.querySelector(".bubu-home-sticker")) {
      const box = document.createElement("div"); box.className = "bubu-home-sticker";
      const img = document.createElement("img"); img.alt = "Bubu and Dudu daily life sticker";
      img.src = fileFor("journal", choices.journal || "both");
      box.appendChild(img);
      const welcome = home.querySelector(".welcome");
      if (welcome) welcome.insertAdjacentElement("afterend", box);
    }
  }
  function renderPicker() {
    const settings = document.getElementById("settings");
    if (!settings || document.getElementById("bubuStickerSettings")) return;
    const panel = document.createElement("div");
    panel.id = "bubuStickerSettings"; panel.className = "panel bubu-sticker-panel";
    panel.innerHTML = `<h2>🐻 Bubu & Dudu Stickers</h2>
      <p class="sub">Choose which character appears for each feature. Your choices are saved on this device. These stickers appear only in Theme 7.</p>
      <div class="bubu-picker-grid"></div>`;
    const grid = panel.querySelector(".bubu-picker-grid");
    labels.forEach(([id,label,key]) => {
      const card = document.createElement("div"); card.className = "bubu-picker-card";
      const title = document.createElement("strong"); title.textContent = label;
      const img = document.createElement("img"); img.alt = label + " sticker preview"; img.loading = "lazy";
      img.src = fileFor(key, choices[key] || "both");
      const select = document.createElement("select");
      select.setAttribute("aria-label", label + " sticker character");
      [["bubu","Bubu"],["dudu","Dudu"],["both","Bubu & Dudu"]].forEach(([value,text]) => {
        const opt = document.createElement("option"); opt.value=value; opt.textContent=text; select.appendChild(opt);
      });
      select.value = choices[key] || "both";
      select.addEventListener("change", () => {
        choices[key] = select.value;
        try { localStorage.setItem(PREF, JSON.stringify(choices)); } catch (_) {}
        img.src = fileFor(key, select.value);
        document.querySelectorAll('.bubu-page-sticker[data-sticker-key="'+key+'"]').forEach(el => el.src = fileFor(key, select.value));
        if (key === "journal") {
          const hero = document.querySelector(".bubu-home-sticker img");
          if (hero) hero.src = fileFor(key, select.value);
        }
      });
      card.append(title,img,select); grid.appendChild(card);
    });
    settings.appendChild(panel);
  }
  function refresh() {
    renderPicker();
    setPageStickers();
  }
  refresh();
  document.querySelectorAll(".theme-choice").forEach(button => button.addEventListener("click", () => setTimeout(refresh, 0)));
  document.querySelectorAll(".navbtn").forEach(button => button.addEventListener("click", () => setTimeout(refresh, 0)));
  const observer = new MutationObserver(() => { if (active()) setPageStickers(); else setPageStickers(); });
  observer.observe(document.body, {attributes:true,attributeFilter:["data-design"]});
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh(); });
})();
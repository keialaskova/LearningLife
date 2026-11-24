/* LearningLife v26: wallet overview, live refresh, first-open profile, About page. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const NAME_KEY = 'learninglife_profile_name';
  const getName = () => (localStorage.getItem(NAME_KEY) || '').trim();
  const setName = value => localStorage.setItem(NAME_KEY, value.trim());
  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  };

  function ensureWalletOverview() {
    const area = $('walletBalances');
    const income = $('ftIncome');
    if (!area || !income) return false;
    const overview = income.closest('.panel');
    if (!overview) return false;
    if (!overview.contains(area)) {
      const oldPanel = area.closest('.panel');
      const block = document.createElement('div');
      block.id = 'walletOverviewBlock';
      block.style.marginTop = '16px';
      block.innerHTML = '<div class="panelhead" style="margin:16px 0 8px"><div><h2>Wallet Balances</h2><div class="sub">Balances across your cash and online accounts</div></div></div>';
      block.append(area);
      overview.append(block);
      if (oldPanel && oldPanel !== overview && !oldPanel.querySelector('#transferPanel')) oldPanel.remove();
    }
    return true;
  }

  function installAbout() {
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    if (!nav || !main) return;
    if (!nav.querySelector('[data-page="about"]')) {
      const button = document.createElement('button');
      button.className = 'navbtn'; button.dataset.page = 'about';
      button.innerHTML = '<span class="ico">ⓘ</span>About';
      nav.append(button);
      button.addEventListener('click', () => window.showPage && window.showPage('about'));
    }
    if (!$('about')) {
      const section = document.createElement('section');
      section.className = 'section'; section.id = 'about';
      section.innerHTML = '<div class="welcome"><h1>About LearningLife</h1><p>A simple space to organize your everyday life.</p></div>' +
        '<div class="panel"><h2>LearningLife</h2><p class="sub">A personal planner for tasks, schedules, notes, goals, savings, and money tracking.</p><div class="rowitem"><div class="grow"><strong>App</strong><small>LearningLife — Personal Planner</small></div></div><div class="rowitem"><div class="grow"><strong>Version</strong><small>26 · Feature update</small></div></div><div class="rowitem"><div class="grow"><strong>Copyright</strong><small>© 2026 LearningLife. All rights reserved.</small></div></div></div>';
      main.append(section);
    }
  }

  function installProfile() {
    const welcome = document.querySelector('#home .welcome');
    if (!welcome) return;
    let change = $('changeProfileName');
    if (!change) {
      change = document.createElement('button'); change.id = 'changeProfileName';
      change.type = 'button'; change.className = 'btn ghost'; change.textContent = 'Change name';
      change.style.marginTop = '8px';
      welcome.append(change);
    }
    let back = $('profileNameModal');
    if (!back) {
      back = document.createElement('div'); back.id = 'profileNameModal'; back.className = 'modalback';
      back.innerHTML = '<div class="modal"><h2 id="profileModalTitle">Welcome to LearningLife!</h2><p class="sub">What should we call you?</p><form id="profileNameForm"><input class="field" id="profileNameInput" maxlength="40" autocomplete="given-name" placeholder="Enter your name" required><div class="actions"><button class="btn" type="submit">Save name</button></div></form></div>';
      document.body.append(back);
    }
    const updateGreeting = () => {
      const name = getName();
      $('greeting').textContent = name ? greeting() + ', ' + name + '!' : greeting() + '.';
    };
    const open = first => {
      $('profileModalTitle').textContent = first ? 'Welcome to LearningLife!' : 'Change your name';
      $('profileNameInput').value = getName();
      back.classList.add('show');
      setTimeout(() => $('profileNameInput').focus(), 50);
    };
    change.onclick = () => open(false);
    $('profileNameForm').onsubmit = event => {
      event.preventDefault();
      const value = $('profileNameInput').value.trim();
      if (!value) return;
      setName(value); updateGreeting(); back.classList.remove('show');
    };
    updateGreeting();
    if (!getName()) open(true);
  }

  function installLiveRefresh() {
    const form = $('moneyForm');
    if (form && !form.dataset.liveRefreshBound) {
      form.dataset.liveRefreshBound = '1';
      form.addEventListener('submit', () => setTimeout(() => {
        // Re-run the app's existing render pipeline after its submit handler saves data.
        if (typeof window.renderAll === 'function') window.renderAll();
        const filter = $('mlHistoryType');
        if (filter) filter.dispatchEvent(new Event('change'));
        if (typeof window.renderReport === 'function') window.renderReport();
        document.dispatchEvent(new CustomEvent('learninglife:transactions-updated'));
      }, 0));
    }
    if (typeof window.renderAll === 'function' && !window.renderAll.__learningLifeLiveRefresh) {
      const original = window.renderAll;
      const wrapped = function (...args) {
        const result = original.apply(this, args);
        const filter = $('mlHistoryType');
        if (filter) filter.dispatchEvent(new Event('change'));
        if (typeof window.renderReport === 'function') window.renderReport();
        document.dispatchEvent(new CustomEvent('learninglife:transactions-updated'));
        return result;
      };
      wrapped.__learningLifeLiveRefresh = true;
      window.renderAll = wrapped;
    }
  }

  function init() {
    ensureWalletOverview();
    installAbout();
    installProfile();
    installLiveRefresh();
    return !!$('walletOverviewBlock') && !!$('about') && !!$('profileNameForm');
  }
  if (!init()) {
    let tries = 0;
    const timer = setInterval(() => { tries++; if (init() || tries >= 40) clearInterval(timer); }, 250);
  }
})();

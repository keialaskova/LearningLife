(() => {
'use strict';
const $ = id => document.getElementById(id);
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem('myday_' + key) || 'null') ?? fallback; }
  catch { return fallback; }
};
const today = () => new Date().toISOString().slice(0, 10);
const money = n => '₱' + Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const home = $('home');
if (!home || $('dashboardExtras')) return;

const style = document.createElement('style');
style.textContent = `
#dashboardExtras .dash-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0 0 16px}
#dashboardExtras .dash-stat{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:15px 16px;box-shadow:var(--shadow)}
#dashboardExtras .dash-stat small{color:var(--muted)}#dashboardExtras .dash-stat strong{display:block;font-size:22px;margin-top:5px;letter-spacing:-.5px}
#dashboardExtras .dash-panel{background:var(--panel);border:1px solid var(--line);border-radius:17px;padding:17px 18px;margin:0 0 16px;box-shadow:var(--shadow)}
#dashboardExtras .dash-panel h2{font-size:16px;margin:0 0 9px}
#dashboardExtras .dash-item{padding:9px 0;border-top:1px solid var(--line);display:flex;align-items:center;gap:10px;min-width:0}
#dashboardExtras .dash-item:first-of-type{border-top:0}
#dashboardExtras .dash-item .grow{flex:1;min-width:0;overflow-wrap:anywhere}
#dashboardExtras .dash-item small{display:block;color:var(--muted);font-size:12px}
#dashboardExtras .dash-quick{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
#dashboardExtras .dash-quick button{border:1px solid var(--line);background:var(--accent2);color:var(--ink);border-radius:10px;padding:11px 7px;font:600 12px/1.3 inherit;min-height:44px}
@media(max-width:420px){#dashboardExtras .dash-quick{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;
document.head.append(style);
const wrap = document.createElement('div');
wrap.id = 'dashboardExtras';
wrap.innerHTML = `
  <div class="dash-grid">
    <div class="dash-stat"><small>Monthly Expenses</small><strong id="dashMonthlyExpenses">₱0.00</strong></div>
    <div class="dash-stat"><small>Active Goals</small><strong id="dashActiveGoals">0</strong></div>
  </div>
  <div class="dash-panel"><h2>Today's Priorities</h2><div id="dashPriorities"></div></div>
  <div class="dash-panel"><h2>Upcoming Reminders</h2><div id="dashUpcoming"></div></div>
  <div class="dash-panel"><h2>Quick Access</h2><div class="dash-quick">
    <button type="button" data-page="tasks">✓ Tasks</button>
    <button type="button" data-page="calendar">▦ Calendar</button>
    <button type="button" data-page="notes">▤ Notes</button>
    <button type="button" data-page="money">₱ Money</button>
    <button type="button" data-page="bible">✧ Bible</button>
    <button type="button" data-page="goals">◎ Goals</button>
  </div></div>`;
const welcome = home.querySelector('.welcome');
if (welcome) welcome.after(wrap); else home.prepend(wrap);
wrap.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => {
  if (typeof window.showPage === 'function') window.showPage(button.dataset.page);
}));
function renderDashboardExtras() {
  const month = today().slice(0, 7);
  const transactions = read('transactions', []);
  const expenses = transactions.filter(t => t.type === 'expense' && String(t.date || '').slice(0, 7) === month)
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  $('dashMonthlyExpenses').textContent = money(expenses);
  $('dashActiveGoals').textContent = String(read('goals', []).length);

  const priorities = $('dashPriorities');
  priorities.innerHTML = '';
  const pending = read('tasks', []).filter(t => !t.done).slice(0, 5);
  if (!pending.length) priorities.innerHTML = '<div class="empty">You have no pending tasks. Great work!</div>';
  else pending.forEach(task => {
    const row = document.createElement('div'); row.className = 'dash-item';
    const text = document.createElement('div'); text.className = 'grow'; text.textContent = task.text || 'Untitled task';
    row.append(text); priorities.append(row);
  });

  const upcoming = $('dashUpcoming');
  upcoming.innerHTML = '';
  const next = read('reminders', []).filter(r => r.date && r.date >= today())
    .sort((a, b) => (String(a.date) + String(a.time || '')).localeCompare(String(b.date) + String(b.time || ''))).slice(0, 3);
  if (!next.length) upcoming.innerHTML = '<div class="empty">No upcoming reminders.</div>';
  else next.forEach(reminder => {
    const row = document.createElement('div'); row.className = 'dash-item';
    const text = document.createElement('div'); text.className = 'grow';
    const title = document.createElement('strong'); title.textContent = reminder.text || 'Reminder';
    const meta = document.createElement('small'); meta.textContent = reminder.date + (reminder.time ? ' · ' + reminder.time : '');
    text.append(title, meta); row.append(text); upcoming.append(row);
  });
}
const originalRenderAll = window.renderAll;
if (typeof originalRenderAll === 'function') window.renderAll = function (...args) {
  const result = originalRenderAll.apply(this, args); renderDashboardExtras(); return result;
};
['renderGoals', 'renderReminders'].forEach(name => {
  const original = window[name];
  if (typeof original === 'function') window[name] = function (...args) {
    const result = original.apply(this, args); renderDashboardExtras(); return result;
  };
});
renderDashboardExtras();
})();

/* LearningLife WEB Bible reader — offline after the first full download.
   Text source: public-domain World English Bible (WEB), book-by-book JSON.
*/
(() => {
  "use strict";
  const BOOKS = [
    ["Genesis","Gen"],["Exodus","Exod"],["Leviticus","Lev"],["Numbers","Num"],["Deuteronomy","Deut"],
    ["Joshua","Josh"],["Judges","Judg"],["Ruth","Ruth"],["1 Samuel","1Sam"],["2 Samuel","2Sam"],
    ["1 Kings","1Kgs"],["2 Kings","2Kgs"],["1 Chronicles","1Chr"],["2 Chronicles","2Chr"],["Ezra","Ezra"],
    ["Nehemiah","Neh"],["Esther","Esth"],["Job","Job"],["Psalms","Ps"],["Proverbs","Prov"],
    ["Ecclesiastes","Eccl"],["Song of Solomon","Song"],["Isaiah","Isa"],["Jeremiah","Jer"],
    ["Lamentations","Lam"],["Ezekiel","Ezek"],["Daniel","Dan"],["Hosea","Hos"],["Joel","Joel"],
    ["Amos","Amos"],["Obadiah","Obad"],["Jonah","Jonah"],["Micah","Mic"],["Nahum","Nah"],
    ["Habakkuk","Hab"],["Zephaniah","Zeph"],["Haggai","Hag"],["Zechariah","Zech"],["Malachi","Mal"],
    ["Matthew","Matt"],["Mark","Mark"],["Luke","Luke"],["John","John"],["Acts","Acts"],
    ["Romans","Rom"],["1 Corinthians","1Cor"],["2 Corinthians","2Cor"],["Galatians","Gal"],
    ["Ephesians","Eph"],["Philippians","Phil"],["Colossians","Col"],["1 Thessalonians","1Thess"],
    ["2 Thessalonians","2Thess"],["1 Timothy","1Tim"],["2 Timothy","2Tim"],["Titus","Titus"],
    ["Philemon","Phlm"],["Hebrews","Heb"],["James","Jas"],["1 Peter","1Pet"],["2 Peter","2Pet"],
    ["1 John","1John"],["2 John","2John"],["3 John","3John"],["Jude","Jude"],["Revelation","Rev"]
  ];
  const DB_NAME = "LearningLifeWEBBible";
  const STORE = "books";
  const BASE = "https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/web/books/";
  const $ = id => document.getElementById(id);
  let dbPromise;
  let currentBook = "Gen";
  let currentChapter = 1;

  function db() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "osis" });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }
  async function getBook(osis) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const req = d.transaction(STORE, "readonly").objectStore(STORE).get(osis);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }
  async function saveBook(book) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(book);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  async function loadBook(osis) {
    const saved = await getBook(osis);
    if (saved) return saved;
    const response = await fetch(BASE + encodeURIComponent(osis) + ".json");
    if (!response.ok) throw new Error("Could not download " + osis + ". Please check your connection.");
    const data = await response.json();
    data.osis = osis;
    await saveBook(data);
    return data;
  }
  function allVerses(book) {
    const rows = [];
    (book.chapters || []).forEach(ch => (ch.verses || []).forEach(v => {
      rows.push({ chapter: ch.chapter, verse: v.number, text: v.text });
    }));
    return rows;
  }
  function showStatus(message) { $("webBibleStatus").textContent = message; }
  function renderVerseRows(book, chapterNo, targetVerse) {
    const chapter = (book.chapters || []).find(x => Number(x.chapter) === Number(chapterNo));
    const area = $("webBiblePassage");
    area.innerHTML = "";
    if (!chapter) { area.textContent = "Chapter not found."; return; }
    chapter.verses.forEach(v => {
      const p = document.createElement("p");
      p.className = "webbible-verse" + (Number(v.number) === Number(targetVerse) ? " selected" : "");
      const n = document.createElement("b");
      n.textContent = v.number + " ";
      p.append(n, document.createTextNode(v.text));
      area.append(p);
    });
    $("webBibleHeading").textContent = book.englishName + " " + chapterNo;
    $("webBibleReference").textContent = "World English Bible (WEB)";
  }
  async function openPassage() {
    const name = $("webBibleBook").value;
    const item = BOOKS.find(x => x[0] === name);
    const chapter = Math.max(1, Number($("webBibleChapter").value) || 1);
    const verse = Math.max(0, Number($("webBibleVerse").value) || 0);
    try {
      showStatus("Opening " + name + "…");
      const book = await loadBook(item[1]);
      currentBook = item[1]; currentChapter = chapter;
      renderVerseRows(book, chapter, verse);
      showStatus("Loaded " + name + ". Download all books for full offline access.");
    } catch (err) { showStatus(err.message); }
  }
  async function downloadAll() {
    const button = $("webBibleDownload");
    button.disabled = true;
    try {
      for (let i = 0; i < BOOKS.length; i++) {
        const [name, osis] = BOOKS[i];
        showStatus("Downloading Bible: " + (i + 1) + " of 66 — " + name);
        await loadBook(osis);
      }
      showStatus("All 66 books are saved on this device. The Bible reader and search now work offline.");
      await dailyVerse();
    } catch (err) {
      showStatus(err.message + " You can retry the download when online.");
    } finally { button.disabled = false; }
  }
  async function dailyVerse() {
    try {
      const downloaded = [];
      for (const [name, osis] of BOOKS) {
        const b = await getBook(osis);
        if (b) downloaded.push({ name, osis, verses: allVerses(b) });
      }
      if (!downloaded.length) {
        $("webBibleDaily").textContent = "Download the WEB Bible while online to enable the changing daily verse offline.";
        $("webBibleDailyRef").textContent = "";
        return;
      }
      const verses = downloaded.flatMap(b => b.verses.map(v => ({...v, book:b.name})));
      const day = new Date();
      const dayKey = Math.floor(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()) / 86400000);
      const chosen = verses[((dayKey % verses.length) + verses.length) % verses.length];
      $("webBibleDaily").textContent = chosen.text;
      $("webBibleDailyRef").textContent = chosen.book + " " + chosen.chapter + ":" + chosen.verse + " · WEB";
    } catch (_) {}
  }
  async function searchBible() {
    const query = $("webBibleSearch").value.trim().toLowerCase();
    if (!query) { showStatus("Enter a word or phrase to search."); return; }
    const results = $("webBibleResults");
    results.innerHTML = "";
    let found = 0, complete = true;
    showStatus("Searching downloaded Bible books…");
    for (const [name, osis] of BOOKS) {
      const b = await getBook(osis);
      if (!b) { complete = false; continue; }
      for (const v of allVerses(b)) {
        if (v.text.toLowerCase().includes(query)) {
          const row = document.createElement("button");
          row.type = "button";
          row.className = "webbible-result";
          const ref = document.createElement("b");
          ref.textContent = name + " " + v.chapter + ":" + v.verse;
          row.append(ref, document.createTextNode(v.text));
          row.onclick = async () => {
            $("webBibleBook").value = name;
            $("webBibleChapter").value = v.chapter;
            $("webBibleVerse").value = v.verse;
            await openPassage();
            $("webBibleReader").scrollIntoView({behavior:"smooth", block:"start"});
          };
          results.append(row);
          found++;
          if (found >= 100) break;
        }
      }
      if (found >= 100) break;
    }
    showStatus(found + " result(s)." + (complete ? "" : " Some books are not downloaded yet; download all 66 books for complete search."));
    if (!found) results.textContent = "No matches in the books saved on this device.";
  }
  function mount() {
    const section = $("bible");
    if (!section) return;
    section.innerHTML = `
      <div class="welcome"><h1>Bible</h1><p>World English Bible (WEB) · 66 books · offline after download</p></div>
      <div class="panel">
        <h2>Verse of the day</h2>
        <p id="webBibleDaily" class="webbible-daily">Download the WEB Bible while online to enable the changing daily verse offline.</p>
        <span class="pill" id="webBibleDailyRef"></span>
      </div>
      <div class="panel">
        <div class="panelhead"><div><h2>Read the Bible</h2><div class="sub">Choose a book, chapter, and optional verse</div></div></div>
        <div class="webbible-controls">
          <select class="field" id="webBibleBook" aria-label="Bible book"></select>
          <input class="field" id="webBibleChapter" type="number" min="1" value="1" aria-label="Chapter" placeholder="Chapter">
          <input class="field" id="webBibleVerse" type="number" min="0" value="0" aria-label="Verse number" placeholder="Verse (optional)">
          <button class="btn" id="webBibleOpen">Open</button>
        </div>
        <div id="webBibleReader"><h2 id="webBibleHeading">Genesis 1</h2><div class="sub" id="webBibleReference">World English Bible (WEB)</div><div id="webBiblePassage" class="webbible-passage"></div></div>
      </div>
      <div class="panel">
        <h2>Search the Bible</h2>
        <div class="formrow"><input class="field" id="webBibleSearch" placeholder="Search a word or phrase…"><button class="btn" id="webBibleSearchButton">Search</button></div>
        <div id="webBibleResults"></div>
      </div>
      <div class="panel">
        <h2>Offline Bible</h2>
        <p class="sub">Connect to the internet once and download all 66 books. They will be stored on this device for offline reading, searching, and daily verses.</p>
        <button class="btn secondary" id="webBibleDownload">Download all 66 books for offline use</button>
        <p class="sub" id="webBibleStatus" role="status" aria-live="polite">Checking saved Bible books…</p>
      </div>
      <div class="panel"><h2>Reflection</h2><textarea class="field note" id="reflection" placeholder="Write what this verse means to you…"></textarea></div>
    `;
    const style = document.createElement("style");
    style.textContent = `
      .webbible-controls{display:grid;grid-template-columns:minmax(150px,2fr) 90px 110px auto;gap:8px;margin:12px 0 18px}
      .webbible-daily{font-size:18px;line-height:1.7;margin:10px 0}
      .webbible-passage{margin-top:12px;line-height:1.85}
      .webbible-verse{padding:7px 9px;border-radius:8px;margin:0}
      .webbible-verse.selected{background:var(--accent2);outline:1px solid var(--accent)}
      .webbible-result{display:block;width:100%;text-align:left;padding:10px;border:0;border-top:1px solid var(--line);background:transparent;color:var(--ink);line-height:1.6}
      .webbible-result b{display:block;color:var(--accent)}
      @media(max-width:520px){.webbible-controls{grid-template-columns:1fr 1fr}.webbible-controls select{grid-column:span 2}.webbible-controls button{grid-column:span 2}}
    `;
    document.head.append(style);
    const select = $("webBibleBook");
    BOOKS.forEach(([name]) => { const o=document.createElement("option");o.value=name;o.textContent=name;select.append(o); });
    $("webBibleOpen").onclick = openPassage;
    $("webBibleDownload").onclick = downloadAll;
    $("webBibleSearchButton").onclick = searchBible;
    $("webBibleSearch").addEventListener("keydown", e => { if(e.key==="Enter") searchBible(); });
    $("reflection").value = localStorage.getItem("myday_reflection") || "";
    $("reflection").oninput = () => localStorage.setItem("myday_reflection", JSON.stringify($("reflection").value));
    // Existing app stores reflection as JSON; read/write through its established key format.
    $("reflection").value = (() => { try { return JSON.parse(localStorage.getItem("myday_reflection")) || ""; } catch { return ""; } })();
    $("reflection").oninput = () => localStorage.setItem("myday_reflection", JSON.stringify($("reflection").value));
    dailyVerse();
    openPassage();
    getBook("Gen").then(async () => {
      let count=0; for(const [,osis] of BOOKS) if(await getBook(osis)) count++;
      showStatus(count + " of 66 books saved on this device.");
    }).catch(() => showStatus("Connect to the internet to open a book, or download the Bible for offline use."));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();

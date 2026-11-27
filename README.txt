Learning Life Theme 7 — v50 layout correction

Replace these two repository-root files:
- sw.js
- bubu-layout-fix.js

Keep index.html, bubu-theme.js, bubu-stickers.js, all assets, and sticker folder unchanged.

This fixes the v49 regression: it no longer forces every active feature page to flex.
The Settings page returns to a readable responsive grid, with two columns on wider
screens and one column on narrow screens. Only the Home dashboard gets the special
Theme 7 flex layout. Inactive sections remain hidden.

After GitHub Pages deploys, close all old Learning Life tabs and reopen the site.
If the old layout remains, clear the site's cached data once to remove the previous
service-worker cache. Your saved planner data is local to the browser; do not clear
site storage if you have not backed it up. Clearing only the browser cache is safer.

Learning Life — Theme 7 isolation repair v54

This small repair addresses the regression where the Bubu & Dudu script moved
the Home video card and added its sticker picker even when one of the original
six themes was selected.

Upload bubu-theme-isolation.js to the ROOT of the GitHub repository.

Then add this script tag immediately AFTER the existing bubu-stickers.js tag
and BEFORE </body> in index.html:

<script src="./bubu-theme-isolation.js?v=54"></script>

Do not replace index.html with this ZIP and do not delete any existing files.
Do not clear browser/site storage; that may erase locally stored planner data.

Expected result:
- Japanese Zen, Luxury Editorial, Linear Inspired, Notion Inspired,
  Glassmorphism, and Cozy Pastel keep their own layouts.
- Bubu & Dudu sticker decorations and the welcome-banner video remain
  exclusive to Theme 7.
- The original six themes do not show the Theme 7 sticker picker.

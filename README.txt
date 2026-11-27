Learning Life — Dashboard Visibility + Layout Fix v47

Replace ONLY:
- bubu-stickers.js
- sw.js

Keep the current index.html, bubu-theme.js, and sticker folder.

Root cause addressed:
The older Theme 7 stylesheet sets #home to display:grid!important. That overrides the app's normal hidden-page rule, so Dashboard remains visible while Settings or other pages are open. v47 explicitly hides inactive sections and lays out the active Dashboard as a clean vertical stack.

Also:
- Moves the existing cooking video card inside the Home welcome banner.
- Keeps the greeting on the left and video on the right.
- Removes the separate video-card position.
- Hides the extra static sticker from the Settings heading.
- Keeps the dashboard stats in a two-card row.
- Other themes are not affected.

After GitHub Pages deploys, reload the app. This package has not been live-browser tested.

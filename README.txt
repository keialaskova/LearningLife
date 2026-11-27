LEARNING LIFE — THEME 7 ISOLATION REPAIR v54

Included replacement files:
- index.html
- bubu-stickers.js
- bubu-theme.js
- bubu-layout-fix.js
- sw.js

WHAT THIS REPAIR ADDRESSES
1. Removes two obsolete embedded Theme 7 layout overrides that forced the navigation into five columns.
2. Forces Theme 7 Settings panels to stack as full-width panels, with a readable 3-column theme picker on larger screens and 2 columns on mobile.
3. Keeps the original six themes outside the Theme 7 CSS selectors.
4. Prevents the Bubu & Dudu video card from being moved while another theme is active.
5. Moves the dashboard stats out of the video card only while Theme 7 is active, then restores them to their original location when leaving Theme 7.
6. Removes the old layout-fix behavior that cleared display styles from every page section.
7. Restores original page headings when leaving Theme 7.
8. Bumps the service-worker cache to v54.

INSTALLATION
1. Make a backup of your current GitHub repository first.
2. Upload these five files to the repository root, replacing the files with the same names.
3. Do NOT delete or replace your existing assets folder, cute_bear_stickers_54 folder, manifest, or other app feature scripts.
4. Commit the changes to the main branch.
5. After GitHub Pages updates, open the site and do a hard refresh. If the old version remains, close the app tab and reopen it after the service worker updates.

IMPORTANT
- The repair bundle does not contain your data. Planner data is stored in the browser and is not modified by these source-file changes.
- Existing six theme CSS files and sticker image assets are not replaced.
- JavaScript syntax checks passed. This bundle has not been deployed to your GitHub repository or verified in a live browser, so please test the dashboard and Settings in all seven themes after publishing.

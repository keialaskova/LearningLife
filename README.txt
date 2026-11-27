Learning Life — Theme 7 isolation repair (v53)
================================================

This is a targeted repair bundle for the files you uploaded. It is NOT a full
copy of the Learning Life project.

Replace these four files in the repository root:
- bubu-theme.js
- bubu-stickers.js
- bubu-layout-fix.js
- sw.js

Keep index.html, both redesign CSS files, dashboard.js, the assets folder,
and cute_bear_stickers_54/ unchanged.

What this repair changes:
1. The sticker script no longer moves the Bubu video card into the Home
   welcome banner. That card contains the dashboard statistics in your HTML.
2. The layout script extracts the statistics once, keeps them in Home for
   every theme, and moves the video into the Bubu welcome banner only while
   Theme 7 is active.
3. When leaving Theme 7, the video is returned to its original card and
   paused; the Bubu welcome-video frame is removed.
4. Bubu sticker decorations and the sticker picker are hidden/removed from
   the other six themes.
5. Theme 7's heading icons are restored to their original text when leaving
   Theme 7.
6. The service-worker cache is incremented from v52 to v53 so the browser
   fetches the updated scripts.

No planner records, localStorage data keys, or backup data are changed.

Install:
- Extract this ZIP.
- Upload the four replacement files to the same root folder in your
  keialaskova/LearningLife GitHub repository, overwriting the old versions.
- Commit the changes.
- After GitHub Pages finishes publishing, reload the app. If an old version
  remains, close the app tab and reopen the site once so the updated service
  worker can take control.

Validation:
- All four JavaScript files passed Node.js syntax checks.
- The bundle has not been deployed to your GitHub repository or tested in
  your live browser. Please do not treat it as live until you upload it and
  check the six original themes and Theme 7.

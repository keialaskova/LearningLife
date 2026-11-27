Learning Life — Theme 7 structural repair v49

Upload/replace these two files in the repository root:
1. sw.js
2. bubu-layout-fix.js (new file)

Keep index.html, bubu-theme.js, bubu-stickers.js, assets, and cute_bear_stickers_54 unchanged.

What this repairs:
- Corrects the existing malformed Home layout at runtime: detaches the statistics row from the video card, then moves the video card into the welcome banner.
- Makes the welcome banner a single horizontal greeting + video composition.
- Overrides the old Theme 7 dashboard grid that was forcing two columns.
- Explicitly hides inactive feature sections while Theme 7 is active.
- Pauses the video when Theme 7 is not selected.

After upload and deployment, close the old tab and reopen the site. If the previous service worker is still serving old code, clear the site's cached data once and reload.

I have inspected the current GitHub HTML and scripts and built this correction against their current structure. I cannot run your live browser here, so please verify after deployment.

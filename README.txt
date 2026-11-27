Learning Life — Theme 7 all-categories + real stickers v53

Upload/replace these repository-root files:
- sw.js
- bubu-layout-fix.js
- bubu-stickers.js

Also upload the complete folder:
- cute_bear_stickers_54/ (all 54 PNG files)

The sticker picker lets you choose Bubu, Dudu, or both for each supported
feature. The stickers are the actual images from your cute_bear_stickers_54_HD.zip.
The layout fix applies to all feature pages and nested panels, not just the
screenshots.

Keep index.html, all existing application files, assets, and browser data.
The service worker cache version is bumped to v52 to refresh the files.
After publishing, close old app tabs and reopen Learning Life. Do not clear
site storage, as that can erase locally saved planner data.

Important: the repository's existing index.html must already load bubu-stickers.js
and bubu-layout-fix.js via the service worker injection or script tags. The
included sw.js injects both scripts into fetched HTML if they are not already
included.

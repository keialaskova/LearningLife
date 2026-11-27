Learning Life — Combined Display + Buttons Update v46

Upload/replace these files in the repository root:
1. index.html
2. bubu-stickers.js
3. sw.js

Also keep/upload the complete folder:
- cute_bear_stickers_54/ (all 54 PNG sticker assets)

This is a combined package:
- index.html: v45 display correction; moves the cooking video markup into the Home welcome banner and removes the oversized separate video-card position.
- bubu-stickers.js: v44 clickability integration correction; removes unnecessary navigation listeners and the document MutationObserver from the sticker integration.
- sw.js: cache v44 so the browser fetches the updated scripts and sticker assets.

Keep all other existing app files and assets. Do not delete the existing assets/ folder or any data.
After GitHub Pages deploys, reload the app. If the browser still shows old files, clear this site's cached data or unregister its old service worker, then reload.

Note: The package is assembled from the display and clickability fixes; the live site has not been browser-tested from this environment.

Learning Life — Bubu & Dudu Welcome Banner Video Fix v43

Replace these files in the repository root:
- index.html
- bubu-stickers.js
- sw.js

Upload/replace the complete folder:
- cute_bear_stickers_54/ (all individual PNG stickers)

What this fixes:
- Moves the existing bubuVideoCard DOM element inside the Home welcome banner.
- Places the cooking video on the right and greeting on the left.
- Removes the static home-banner sticker so it does not compete with the video.
- Hides the old standalone dashboard video card location.
- Keeps the Settings sticker picker and feature-page stickers.
- Keeps video muted, inline, looping, and best-effort autoplay.
- Animation Off hides and pauses the video.
- Bumps the service-worker cache to v43.

This package includes the full index.html and service worker, not just a script patch.
Keep all other existing app files and assets. Do not delete your existing assets folder.

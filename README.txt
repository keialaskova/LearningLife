Learning Life — Theme 7 upload package

Replace these two files in the ROOT of your GitHub repository:
- bubu-theme.js
- sw.js

Keep your latest index.html from the previous Theme 7 update. It already contains the Bubu theme selector, saved theme registry, home video element, and Animation On/Off control.

The service worker cache version is now v37. It injects bubu-theme.js into the page if the HTML does not already load it. The helper adds the full Theme 7 beach visual system only when body[data-design="bubu"] is active. The other six themes are not targeted.

The video is set to contain rather than crop, so both characters should fit inside the video frame. It remains muted and loops while Theme 7 and Animation On are active.

Keep all existing assets and sticker folders. This ZIP does not contain the media/sticker assets.

Learning Life — Theme 7 Visual Fix

Replace these two files in the ROOT of your GitHub repository:
1. bubu-theme.js
2. sw.js

Keep the latest index.html from the previous Theme 7 update. It already contains:
- Theme 7 selector and saved theme key
- Home video element
- Animation On/Off setting
- Theme 7 design registry

This update replaces the incomplete theme helper with a full-page responsive redesign for Theme 7 only. It changes the app frame, navigation, dashboard hero, stats, cards, forms, buttons, calendar, dialogs, and mobile layout. Theme 7 deliberately uses its own light beach palette even if the app's global dark-mode toggle is on. The other six themes are not targeted.

Service worker cache is bumped to v36. Existing sticker and Bubu asset paths are retained. Do not delete existing app files or asset folders.

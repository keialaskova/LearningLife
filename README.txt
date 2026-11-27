Learning Life — Theme 7 STRUCTURAL redesign (v38)

Replace these two files in your GitHub repository ROOT:
1. bubu-theme.js
2. sw.js

Keep the current index.html from the previous Theme 7 update. Keep all existing app assets and other app files.

What changes in Theme 7:
- Navigation is rebuilt visually as a full-width toolbar (3-column on phones), not the old dark sidebar.
- Dashboard becomes a new composition: illustrated welcome banner, summary cards, a media panel, and separate task/schedule panels.
- Feature pages get themed title banners and icons.
- Forms, money cards, calendar, buttons, dialogs, and theme picker receive a consistent Bubu & Dudu beach visual system.
- Video uses contain sizing so it does not crop the characters.
- Theme 7 has its own light beach palette. The other six themes are not targeted.
- Existing app page logic and local data are not rewritten.

The service worker cache is bumped to v38 so the new helper is fetched. It keeps the existing asset list and script injection behavior.

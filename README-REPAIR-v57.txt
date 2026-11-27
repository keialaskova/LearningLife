LEARNING LIFE — CLEAN STRUCTURAL REPAIR v57

This is a complete project based on the supplied LearningLife-main source ZIP.
It is a repair of the existing app, not a new app built from scratch.

MAIN FIXES
1. Dashboard HTML structure:
   - The Bubu & Dudu cooking-video card is now a separate Home element.
   - Dashboard statistics are a separate Home element, not nested inside the video card.
   - This matches the layout structure already expected by the Theme 7 stylesheet.
2. Theme 7 video behavior:
   - The video card is moved into the Home welcome banner only while Theme 7 is active.
   - When another theme is selected, the video card is restored to its original Home position and hidden.
   - Dashboard statistics are never moved by the sticker script.
3. Settings layout:
   - Settings is explicitly a vertical stack of full-width panels.
   - The seven theme choices use a readable responsive grid.
   - Theme labels are prevented from breaking one letter at a time.
4. Service worker:
   - Cache version is v57.
   - The new layout stylesheet is included in the offline app shell.
   - The old experimental Bubu layout-fix script is no longer injected.
   - The service worker now precaches the exact sticker filenames in the supplied asset folder.

PRESERVED
- Existing planner features and feature scripts.
- Six original themes and their color/design CSS.
- Theme 7 Bubu & Dudu styling and sticker choices.
- Supplied bear stickers, video, beach image, and icons.
- Existing localStorage-based data logic; no data-clearing code was added.

INSTALLATION
1. Download and keep a backup of your current GitHub repository.
2. Extract this ZIP.
3. Open the LearningLife-main folder.
4. Upload its contents to the root of the GitHub repository on the main branch, replacing matching files.
5. Do not merge the new files into an older project folder while leaving old copies of index.html or sw.js in place.
6. Wait for GitHub Pages to publish, then close the old tab and reopen the website.
7. Test Settings and Dashboard in all seven themes. Also test task creation, schedule creation, and backup download.

DATA SAFETY
The ZIP contains the app source and assets, not the user's browser-stored planner data.
The source changes do not intentionally clear localStorage or IndexedDB. Download a planner backup from Settings before replacing the live project.

VALIDATION
- All 18 JavaScript files pass Node syntax checks.
- CSS files parse without stylesheet syntax errors.
- All service-worker precache paths exist in this project.
- The HTML now places the stats block as a direct child of the Home section, separate from the video card.

LIMITATION
This package has not been deployed to GitHub Pages or verified on the user's physical Android/iPhone browsers. Please test after publishing before relying on it as fully repaired.

FINAL NAVIGATION OVERRIDE — Theme 7

Replace the ROOT index.html in the GitHub repository with this exact file.
Do not copy only part of it.

This file includes the full index.html plus a final, higher-specificity CSS override targeting the actual HTML structure:
.app > .layout > nav and .app > .layout > main

Expected result while Bubu & Dudu Beach is selected:
- Navigation becomes a full-width 5-column toolbar on wide screens.
- Navigation becomes 4 columns on medium screens and 3 columns on phones.
- Main content moves below the navigation and uses full width.

Keep the current bubu-theme.js, sw.js, and all existing assets. Other themes are not targeted.

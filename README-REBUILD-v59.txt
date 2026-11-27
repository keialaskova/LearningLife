Learning Life — Shared Layout Recovery v59

This package is based on the user-provided LearningLife-main (3).zip.

Changes:
- Adds a shared layout guard for all feature pages and all seven themes.
- Forces the Dashboard and dashboard extras to occupy the full content width instead of collapsing into narrow columns.
- Adds safe min-width and wrapping rules for form controls, calendar and Bible content.
- Adds a Theme 7-only mobile bottom navigation with Home, Calendar, Money and an expandable More tray.
- Keeps the six original theme definitions and their palettes unchanged.
- Keeps existing localStorage data keys and app features; no data migration or clearing is performed.
- Updates service-worker cache name to v59 and precaches the new files.

Validation performed:
- All JavaScript files pass Node syntax checks.
- All 85 service-worker precache paths exist in the package.
- No duplicate HTML IDs were found.

Limitations:
- This is a source-level repair and responsive layout pass, not a completed clean-room rewrite.
- Live browser visual testing on Android/iPhone has not been performed in this environment.
- Back up planner data in Settings before replacing a deployed version.

Learning Life — Theme 7 direct index layout fix

Replace the ROOT index.html in your GitHub repository with this file.

This version puts Theme 7's structural layout CSS directly into index.html after the existing stylesheet links. It does not depend on bubu-theme.js to change the navigation layout. The bubu-theme.js script is still loaded at the bottom for the animation/video behavior.

Keep your current bubu-theme.js and sw.js, and keep all existing assets and other app files. The rules only apply when body[data-design="bubu"], so the other six themes are not targeted.

After upload, reload the site. The Theme 7 navigation should become a horizontal toolbar instead of the left sidebar. If the browser still shows the old version, the service worker may need to be refreshed.

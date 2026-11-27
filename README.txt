Learning Life — index.html loader fix

Replace the ROOT index.html in your GitHub repository with this file.

This is based on the latest Theme 7 index update and adds the missing direct script include:
<script src="./bubu-theme.js"></script>

The script tag is placed immediately before </body>, after the app's existing inline JavaScript. This ensures bubu-theme.js actually runs when the page loads. Keep bubu-theme.js v38 and sw.js v38 in the repository root, along with all existing assets and folders.

Do not upload this README as an app file.

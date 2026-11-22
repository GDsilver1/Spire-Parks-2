# Spire Parks 2 — GitHub Pages

This is a standalone static-site package made from the Spire Parks 2 source files you supplied.

## Publish it with GitHub Pages

1. Download and unzip this project.
2. Create a new GitHub repository (for example, `spire-parks-2`).
3. Upload **everything inside this folder** to the repository's root:
   - `index.html`
   - `assets/game.js`
   - `assets/game.css`
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your main branch and the `/ (root)` folder, then save.
7. Wait for GitHub Pages to publish. Your site URL will appear in the Pages settings.

## Run it locally

Because the game uses JavaScript modules and WebGL, run it through a local web server rather than opening `index.html` as a `file://` URL. For example, in this folder run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- The game JavaScript and Three.js engine are bundled locally in `assets/game.js`.
- The stylesheet is local in `assets/game.css`.
- The page does not load the Combos host SDK, preview bridge, Combos deployment URLs, or the external html-to-image script.
- The game code still contains optional Combos layout/telemetry compatibility hooks. They are not required for the page to load; they are guarded and do not connect to a Combos server.
- Saved park data uses this browser's `localStorage`, so it is stored per browser/device.
- This package has been assembled from the provided files, but it has not been live-tested in your GitHub Pages account. After publishing, check the browser console if anything fails to initialize.

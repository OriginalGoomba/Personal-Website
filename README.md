# Personal Website

A static personal website built on the HTML5 UP "Massively" template, with a Formspree contact form. Hosted on GitHub Pages.

## Branches

- `main` — the original site, kept as-is.
- `v2-redesign` — the active redesign: Projects is the landing page, the Air Quality Monitor project covers three generations, and all personal identifying information has been removed from the repo (contact goes through the Formspree form only).

## Structure

- Plain static HTML pages (`index.html` is the projects landing page; `projects.html` redirects to it).
- `assets/` — template CSS/JS plus `assets/js/modelviewer.js` (three.js 3MF viewer module).
- `images/` — project and gallery photos.
- `models/` — 3D-printable model files (3MF), viewable at `viewer.html?model=<path>`.
- `AQM2/` — local-only asset drop-zone (gitignored); contents are curated into `images/`, `models/`, or the code repository before committing.

## Local preview

Any static server works, e.g. VS Code Live Server, or:

```
npx serve
```

## Credits

- Design: [Massively by HTML5 UP](https://html5up.net) (CCA 3.0 license)
- 3D viewer: [three.js](https://threejs.org) with the 3MFLoader, served from jsDelivr

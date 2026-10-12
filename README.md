# Personal Website

A static personal website documenting hardware and software projects. The design is a static port of the [Moonwalk](https://github.com/abhinavs/moonwalk) theme (MIT — see `LICENSE-Moonwalk.txt`), with a Formspree contact form. Hosted on GitHub Pages.

## Branches

- `main` — the currently published site.
- `v2-redesign` — the previous (Massively template) redesign.
- `v3-moonwalk` — the current Moonwalk redesign.

## Structure

Plain static HTML, no build step:

- `index.html` — home page with the portfolio and old projects.
- `aqm.html` — Air Quality Monitor comparison (charts from `assets/data/aqm-charts.json`, rendered with Chart.js).
- `aqm-v1/2/3.html` — one page per AQM generation.
- `rocketteststand-v1/2.html`, `apolloav-1parts.html`, `Weather_Station.html` — other projects.
- `plantwaterer.html`, `milltachometer.html` — old projects.
- `viewer.html` + `assets/js/modelviewer.js` — in-browser 3MF viewer (three.js from jsDelivr).
- `contactme.html` — Formspree contact form.
- `assets/css/main.css` — compiled Moonwalk theme CSS; `assets/css/extra.css` — tables, forms, charts, viewer.
- `models/` (3MF files), `code/` (redacted ESPHome configs), `docs/` (PDFs), `images/` (project photos).
- `AQM2/`, `AQM3/` — local-only asset drop-zones (gitignored).

## Local preview

Any static server works, e.g. VS Code Live Server on this folder (no build step required), or:

```
npx serve
```

## Deploying

- `.nojekyll` tells GitHub Pages to serve the static files verbatim (no Jekyll build).
- `CNAME` holds the custom domain; Pages deploys from `main`.
- To publish a branch: fast-forward `main` to it and push.

## Credits

- Theme: [Moonwalk by Abhinav Saxena](https://github.com/abhinavs/moonwalk) (MIT)
- Charts: [Chart.js](https://www.chartjs.org)
- 3D viewer: [three.js](https://threejs.org) with the 3MFLoader
- Contact form: [Formspree](https://formspree.io)

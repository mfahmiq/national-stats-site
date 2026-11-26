[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mfahmiq/national-stats-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mfahmiq/national-stats-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# NusaStat — Statistik Indonesia

Indonesia in numbers: 281.6 million people, 38 provinces, a Rp22,139 trillion economy —
every figure with its source and year. A static site (no build step, no network requests)
with seven linked pages: an overview with headline indicators, population, economy,
health & education, a searchable and sortable table of all 38 provinces, a
compare-two-provinces tool, and a sources & methods page. Charts are hand-rolled SVG
(line, bar, donut, population pyramid, horizontal bars); the data comes from Statistics
Indonesia (BPS), the World Bank, APJII, UN IGME and SSGI.

## How to run

Serve `app/` with any static server and open `index.html`, for example:

```sh
python3 -m http.server --directory app 8080
```

Then open http://localhost:8080 — it works on desktop and on a phone, with no network
request. Hash routes: `#/` overview, `#/population`, `#/economy`, `#/health`,
`#/provinces`, `#/compare`, `#/sources`.

## Handing it in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to
`$MAKEFUN_OUTPUT_DIR` (default `/output`) and writes `dossier.json` with the vendored
make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — shell: header, nav, footer; `#app` is filled by the router
- `app/main.js` — entry point, starts the router
- `app/router.js` — hash routes, page state, wiring for every control
- `app/data.js` — every figure, with its source and year
- `app/charts.js` — hand-rolled SVG charts (bar, line, donut, pyramid, horizontal bars)
- `app/format.js` — number formatting helpers
- `app/views-home.js`, `app/views-population.js`, `app/views-economy.js`,
  `app/views-health.js`, `app/views-provinces.js`, `app/views-compare.js`,
  `app/views-sources.js` — one page each
- `app/style.css` — the whole design, system fonts only
- `screenshots/` — 4 real renders of the site (desktop overview, charts, provinces table, phone)
- `vendor/makefun-frontend.ts` — the kit's copy, unchanged
- `shots.json` — which view each screenshot was taken of

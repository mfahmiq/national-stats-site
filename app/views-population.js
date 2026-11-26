// Population page: growth over time, the age pyramid, age shares, urban share,
// and a sortable table of every province's population.

import { POPULATION_YEARS, AGE_BANDS, AGE_SHARES, URBAN_SHARE, PROVINCES } from './data.js';
import { lineChart, pyramidChart, donutChart } from './charts.js';
import { fmt, esc } from './format.js';

export function population(state) {
  const growth = POPULATION_YEARS.map((y) => ({ label: String(y.year), value: y.value }));
  const rows = [...PROVINCES]
    .sort((a, b) => b.pop - a.pop)
    .map((p, i) => `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${fmt(p.pop, 1)}</td><td>${fmt((p.pop / 281.6) * 100, 1)}%</td></tr>`)
    .join('');

  return `
  <section class="page-head">
    <p class="eyebrow">Indonesia &middot; People</p>
    <h1>Population</h1>
    <p class="lede">281.6 million people in 2024 (BPS) — the fourth largest population on Earth,
    spread across 17,000 islands and 38 provinces.</p>
  </section>

  <section class="card">
    <h2>Growth, 2020–2024</h2>
    <p>Population in millions, mid-year estimates (BPS). Growth has slowed to about
    0.9% a year.</p>
    ${lineChart(growth, { valueLabel: (v) => fmt(v, 1) + 'm', yMin: 265, yMax: 285 })}
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Age pyramid</h2>
      <p>Millions of people by age group (BPS, 2024). Men on the left, women on the right.</p>
      ${pyramidChart(AGE_BANDS)}
    </section>
    <section class="card">
      <h2>Three age groups</h2>
      <p>Share of the population (BPS, 2024).</p>
      ${donutChart(AGE_SHARES, { colors: ['#0e7c7b', '#e8a33d', '#d96c4f'] })}
      <h2 class="sub">Urban or rural</h2>
      <p>Share of the population (World Bank, 2024).</p>
      ${donutChart(URBAN_SHARE, { colors: ['#16233f', '#8a97ad'] })}
    </section>
  </div>

  <section class="card">
    <h2>Population by province</h2>
    <p>All 38 provinces, largest first (BPS, 2024). West Java alone has more people
    than most countries — 49.9 million.</p>
    <table class="data-table">
      <thead><tr><th>#</th><th>Province</th><th>Population (millions)</th><th>Share of Indonesia</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="chart-note"><a href="#/provinces">Sort and search all provinces &rarr;</a></p>
  </section>`;
}

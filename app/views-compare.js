// Compare page: pick any two provinces and a measure, and see them side by
// side — bars, a table, and a plain-language verdict.

import { PROVINCES } from './data.js';
import { hbarChart } from './charts.js';
import { fmt, esc } from './format.js';

const METRICS = {
  pop: { label: 'Population (millions)', value: (p) => p.pop, format: (v) => fmt(v, 1) + 'm' },
  area: { label: 'Area (km²)', value: (p) => p.area, format: (v) => fmt(v, 0) + ' km²' },
  density: { label: 'Density (people / km²)', value: (p) => (p.pop * 1e6) / p.area, format: (v) => fmt(v, 0) },
};

function options(selected) {
  return PROVINCES.map((p) => `<option value="${esc(p.name)}" ${p.name === selected ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
}

export function compare(state) {
  const a = PROVINCES.find((p) => p.name === state.compareA) || PROVINCES[0];
  const b = PROVINCES.find((p) => p.name === state.compareB) || PROVINCES[1];
  const metric = METRICS[state.compareMetric] || METRICS.pop;
  const va = metric.value(a), vb = metric.value(b);
  const bigger = va >= vb ? a : b;
  const smaller = va >= vb ? b : a;
  const ratio = Math.max(va, vb) / Math.max(Math.min(va, vb), 0.0001);

  return `
  <section class="page-head">
    <p class="eyebrow">Indonesia &middot; Regions</p>
    <h1>Compare provinces</h1>
    <p class="lede">Pick any two of the 38 provinces and a measure. Population and area are
    BPS 2024 figures; density is computed from them.</p>
  </section>

  <section class="card">
    <form class="compare-form" id="compare-form">
      <label>First province
        <select id="compare-a">${options(a.name)}</select>
      </label>
      <label>Second province
        <select id="compare-b">${options(b.name)}</select>
      </label>
      <label>Measure
        <select id="compare-metric">
          ${Object.entries(METRICS).map(([k, m]) => `<option value="${k}" ${k === state.compareMetric ? 'selected' : ''}>${esc(m.label)}</option>`).join('')}
        </select>
      </label>
    </form>
    ${hbarChart(
      [
        { label: a.name, value: va },
        { label: b.name, value: vb },
      ],
      { valueLabel: metric.format, rowHeight: 44 },
    )}
    <p class="verdict"><strong>${esc(bigger.name)}</strong> is larger on this measure —
    ${metric.format(Math.max(va, vb))} against ${metric.format(Math.min(va, vb))} for
    <strong>${esc(smaller.name)}</strong>, about ${fmt(ratio, 1)}&times; as much.</p>
    <table class="data-table">
      <thead><tr><th></th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead>
      <tbody>
        <tr><td>Population (millions)</td><td>${fmt(a.pop, 1)}</td><td>${fmt(b.pop, 1)}</td></tr>
        <tr><td>Area (km&sup2;)</td><td>${fmt(a.area, 0)}</td><td>${fmt(b.area, 0)}</td></tr>
        <tr><td>Density (people / km&sup2;)</td><td>${fmt((a.pop * 1e6) / a.area, 0)}</td><td>${fmt((b.pop * 1e6) / b.area, 0)}</td></tr>
        <tr><td>Share of Indonesia</td><td>${fmt((a.pop / 281.6) * 100, 1)}%</td><td>${fmt((b.pop / 281.6) * 100, 1)}%</td></tr>
      </tbody>
    </table>
    <p class="source-line">Source: BPS, 2024. Try Jakarta against Papua for the starkest contrast:
    10.7 million people on 664 km&sup2; versus 1.1 million on 82,680 km&sup2;.</p>
  </section>`;
}

// Provinces page: a searchable, sortable table of all 38 provinces plus a
// detail card for the province the visitor picks.

import { PROVINCES } from './data.js';
import { fmt, esc } from './format.js';

const TOTAL_POP = PROVINCES.reduce((s, p) => s + p.pop, 0);

function density(p) {
  return (p.pop * 1e6) / p.area;
}

export function provinces(state) {
  const q = state.provinceQuery.trim().toLowerCase();
  let list = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
  const key = state.provinceSort.key;
  const dir = state.provinceSort.dir;
  list = [...list].sort((a, b) => {
    let cmp = 0;
    if (key === 'name') cmp = a.name.localeCompare(b.name);
    else if (key === 'pop') cmp = a.pop - b.pop;
    else if (key === 'area') cmp = a.area - b.area;
    else if (key === 'density') cmp = density(a) - density(b);
    return dir === 'asc' ? cmp : -cmp;
  });

  const arrow = (k) => (state.provinceSort.key === k ? (state.provinceSort.dir === 'asc' ? ' \u25B2' : ' \u25BC') : '');
  const rows = list.map((p, i) => `<tr data-province="${esc(p.name)}" class="${state.selectedProvince === p.name ? 'selected' : ''}">
      <td>${i + 1}</td><td>${esc(p.name)}</td><td>${fmt(p.pop, 1)}</td>
      <td>${fmtInt2(p.area)}</td><td>${fmt(density(p), 0)}</td>
      <td>${fmt((p.pop / TOTAL_POP) * 100, 1)}%</td></tr>`).join('');

  const sel = PROVINCES.find((p) => p.name === state.selectedProvince) || PROVINCES[0];
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((p) => p.name === sel.name) + 1;

  return `
  <section class="page-head">
    <p class="eyebrow">Indonesia &middot; Regions</p>
    <h1>Provinces</h1>
    <p class="lede">All 38 provinces, from West Java (49.9 million people) to South Papua
    (0.5 million). Click a column to sort; click a row to see that province.</p>
  </section>

  <section class="card">
    <div class="card-head">
      <div><h2>Search and sort</h2><p>Population in millions and area in km&sup2; (BPS, 2024).</p></div>
      <label class="search">Search a province
        <input id="province-search" type="search" value="${esc(state.provinceQuery)}" placeholder="e.g. Java, Papua, Bali" aria-label="Search provinces">
      </label>
    </div>
    <div class="table-wrap">
    <table class="data-table sortable">
      <thead><tr>
        <th>#</th>
        <th><button data-sort="name">Province${arrow('name')}</button></th>
        <th><button data-sort="pop">Population (m)${arrow('pop')}</button></th>
        <th><button data-sort="area">Area (km&sup2;)${arrow('area')}</button></th>
        <th><button data-sort="density">People / km&sup2;${arrow('density')}</button></th>
        <th>Share of Indonesia</th>
      </tr></thead>
      <tbody>${rows || `<tr><td colspan="6">No province matches &ldquo;${esc(state.provinceQuery)}&rdquo;.</td></tr>`}</tbody>
    </table>
    </div>
    <p class="source-line">${list.length} of 38 provinces shown. Density is computed from the population and area columns.</p>
  </section>

  <section class="card" id="province-detail">
    <h2>${esc(sel.name)}</h2>
    <dl class="facts">
      <div><dt>Population</dt><dd>${fmt(sel.pop, 1)} million</dd><dd class="fact-source">BPS, 2024</dd></div>
      <div><dt>Rank by population</dt><dd>${rank} of 38</dd><dd class="fact-source">of 38 provinces</dd></div>
      <div><dt>Area</dt><dd>${fmtInt2(sel.area)} km&sup2;</dd><dd class="fact-source">BPS / Kemendagri</dd></div>
      <div><dt>Density</dt><dd>${fmt(density(sel), 0)} people / km&sup2;</dd><dd class="fact-source">computed</dd></div>
      <div><dt>Share of Indonesia</dt><dd>${fmt((sel.pop / TOTAL_POP) * 100, 1)}%</dd><dd class="fact-source">computed</dd></div>
    </dl>
    <p>${provinceNote(sel)}</p>
    <p><a href="#/compare">Compare ${esc(sel.name)} with another province &rarr;</a></p>
  </section>`;
}

function fmtInt2(n) {
  return Math.round(n).toLocaleString('en-US');
}

function provinceNote(p) {
  if (p.name === 'Jakarta') return 'The capital: 10.7 million people on just 664 km² — the densest province in the country, and the centre of government, finance and media.';
  if (p.name === 'West Java') return 'The most populous province: 49.9 million people, more than Spain. Its factories around Bekasi and Bandung anchor Indonesian manufacturing.';
  if (p.area < 1000) return 'One of Indonesia\u2019s smallest provinces by land, and one of its densest — most of its people live in a single city region.';
  if (density(p) < 50) return 'A vast, thinly settled province: fewer than 50 people per square kilometre. Its economy runs on mining, timber and plantations.';
  if (p.pop > 15) return 'One of the big four provinces by population, and a regional hub for its island.';
  return 'A mid-sized province by population. Use the compare page to set it against any other province.';
}

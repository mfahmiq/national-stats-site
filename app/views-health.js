// Health and education page: the indicators that describe how long people live,
// how healthy children are, and how much schooling they get.

import { HEALTH, EDUCATION, WORK } from './data.js';
import { esc } from './format.js';

function factList(items) {
  return `<dl class="facts">` + items.map(
    (i) => `<div><dt>${esc(i.label)}</dt><dd>${esc(i.value)}</dd><dd class="fact-source">${esc(i.source)}</dd></div>`,
  ).join('') + `</dl>`;
}

export function health() {
  return `
  <section class="page-head">
    <p class="eyebrow">Indonesia &middot; People</p>
    <h1>Health &amp; education</h1>
    <p class="lede">How long Indonesians live, how healthy their children are, and how much
    schooling they get — the numbers behind the Human Development Index of 75.02 (BPS, 2024).</p>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Health</h2>
      ${factList(HEALTH)}
      <p class="chart-note">Life expectancy of 74.1 years is up from about 71 a decade ago.
      Stunting — children too short for their age — fell to 21.5% in 2023, but it is
      still the government&rsquo;s biggest health target.</p>
    </section>
    <section class="card">
      <h2>Education</h2>
      ${factList(EDUCATION)}
      <p class="chart-note">Nearly every adult can read and write (96.5%), and children now
      expect 13.2 years of schooling. The gap is tertiary education: only about
      one in three young people enrols.</p>
    </section>
  </div>

  <section class="card">
    <h2>Work</h2>
    <p>Labour market indicators (BPS, August 2024, except internet users).</p>
    ${factList(WORK)}
    <p class="chart-note">Unemployment is low at 4.91%, but 57.9% of workers are informal —
    without a contract or social security — which is the real jobs challenge.
    Meanwhile 221.6 million Indonesians are online (APJII, 2024).</p>
  </section>

  <section class="card">
    <h2>What to do with these numbers</h2>
    <ul>
      <li><strong>Planning a health programme?</strong> Start with stunting (21.5%, SSGI 2023) and infant mortality (17 per 1,000, UN IGME 2023) — both are published by province in BPS releases.</li>
      <li><strong>Opening a school or course?</strong> Mean schooling is 9.0 years (BPS, 2024): demand is strongest for senior-secondary and vocational places.</li>
      <li><strong>Hiring?</strong> 70.5% of working-age people are in the labour force (BPS, Aug 2024) — but expect informal work histories.</li>
    </ul>
    <p class="source-line">Every figure on this page names its source and year. Full list: <a href="#/sources">Sources &amp; methods</a>.</p>
  </section>`;
}

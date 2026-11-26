// Home page: the overview a visitor sees first — headline indicators, the GDP
// trend, the age pyramid, what the economy is made of, and the biggest provinces.

import { HEADLINE, GDP_YEARS, AGE_BANDS, GDP_SECTORS, PROVINCES } from './data.js';
import { lineChart, barChart, pyramidChart, donutChart, hbarChart } from './charts.js';
import { fmt, esc } from './format.js';

export function home(state) {
  const kpis = HEADLINE.map(
    (k) => `<a class="kpi" href="#/economy">
      <span class="kpi-label">${esc(k.label)}</span>
      <span class="kpi-value">${esc(k.value)}</span>
      <span class="kpi-note">${esc(k.note)}</span>
      <span class="kpi-source">${esc(k.source)}</span>
    </a>`,
  ).join('');

  const gdpPoints = GDP_YEARS.map((y) => ({ label: String(y.year), value: y.gdp }));
  const gdpChart =
    state.gdpView === 'bars'
      ? barChart(gdpPoints, { valueLabel: (v) => fmt(v, 0) })
      : lineChart(gdpPoints, { valueLabel: (v) => fmt(v, 0), yMin: 14000, yMax: 23000 });

  const topProvinces = [...PROVINCES]
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 8)
    .map((p) => ({ label: p.name, value: p.pop }));

  return `
  <section class="hero">
    <p class="eyebrow">National statistics &middot; Indonesia</p>
    <h1>Indonesia, in numbers.</h1>
    <p class="lede">281.6 million people, 38 provinces, one economy worth Rp22,139 trillion.
    Every figure below comes with its source and its year — nothing here is a guess.</p>
    <p class="hero-links">
      <a class="btn" href="#/population">Explore the population</a>
      <a class="btn btn-ghost" href="#/economy">See the economy</a>
    </p>
  </section>

  <section aria-label="Headline indicators">
    <div class="kpi-grid">${kpis}</div>
    <p class="source-line">Sources: Statistics Indonesia (BPS) and the World Bank, 2024. See the <a href="#/sources">Sources page</a> for every figure.</p>
  </section>

  <section class="card">
    <div class="card-head">
      <div><h2>The economy, 2019–2024</h2>
      <p>Gross domestic product at current prices, trillion rupiah (BPS).</p></div>
      <div class="toggle" role="group" aria-label="Chart type">
        <button data-gdp-view="line" class="${state.gdpView === 'line' ? 'active' : ''}">Line</button>
        <button data-gdp-view="bars" class="${state.gdpView === 'bars' ? 'active' : ''}">Bars</button>
      </div>
    </div>
    ${gdpChart}
    <p class="chart-note">Growth was 5.03% in 2024; the 2020 dip (−2.07%) is the pandemic year. <a href="#/economy">Full economy page &rarr;</a></p>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Who lives here</h2>
      <p>Population by age group, millions (BPS, 2024). The wide middle is the
      working-age bulge: 68.7% of Indonesians are 15 to 64.</p>
      ${pyramidChart(AGE_BANDS)}
      <p class="chart-note"><a href="#/population">Population in detail &rarr;</a></p>
    </section>
    <section class="card">
      <h2>What the economy is made of</h2>
      <p>Share of GDP by industry (BPS, 2024). Manufacturing is the largest single
      industry; services together are more than half.</p>
      ${donutChart(GDP_SECTORS)}
      <p class="chart-note"><a href="#/economy">Economy in detail &rarr;</a></p>
    </section>
  </div>

  <section class="card">
    <h2>The biggest provinces</h2>
    <p>Population in millions (BPS, 2024). Java alone holds more than half the country:
    West, East and Central Java together are 129.6 million people.</p>
    ${hbarChart(topProvinces, { valueLabel: (v) => fmt(v, 1) + 'm' })}
    <p class="chart-note"><a href="#/provinces">All 38 provinces, sortable &rarr;</a></p>
  </section>

  <section class="card findings">
    <h2>What the numbers say</h2>
    <ul>
      <li><strong>Growth is steady, not fast.</strong> Real GDP grew 5.03% in 2024 — the third year in a row around 5% (BPS).</li>
      <li><strong>Prices calmed down.</strong> Inflation fell to 1.57% in December 2024, from 5.51% in 2022 (BPS).</li>
      <li><strong>Poverty keeps edging down.</strong> 8.57% of Indonesians lived below the poverty line in September 2024 (BPS).</li>
      <li><strong>Most people live in cities now.</strong> 58.6% of the population is urban (World Bank, 2024).</li>
      <li><strong>The demographic window is open.</strong> With 68.7% of working age, the country has more earners than dependants (BPS, 2024).</li>
    </ul>
  </section>`;
}

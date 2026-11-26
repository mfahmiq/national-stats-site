// Economy page: GDP and growth, inflation, what the economy is made of, trade,
// and Indonesia beside its ASEAN neighbours.

import { GDP_YEARS, INFLATION_YEARS, GDP_SECTORS, ASEAN_GDP_PER_CAPITA, TRADE } from './data.js';
import { lineChart, barChart, donutChart, hbarChart } from './charts.js';
import { fmt, esc } from './format.js';

export function economy(state) {
  const years = state.gdpRange === 'recent' ? GDP_YEARS.slice(-3) : GDP_YEARS;
  const gdpPoints = years.map((y) => ({ label: String(y.year), value: y.gdp }));
  const growthPoints = years.map((y) => ({ label: String(y.year), value: y.growth }));
  const inflationPoints = INFLATION_YEARS.map((y) => ({ label: String(y.year), value: y.value }));
  const asean = ASEAN_GDP_PER_CAPITA.map((c) => ({ label: c.label, value: c.value }));
  const destinations = TRADE.topDestinations.map((d) => ({ label: d.label, value: d.value }));
  const goods = TRADE.topGoods.map((g) => `<li>${esc(g)}</li>`).join('');

  return `
  <section class="page-head">
    <p class="eyebrow">Indonesia &middot; Money</p>
    <h1>Economy</h1>
    <p class="lede">A US$1.40 trillion economy in 2024 (World Bank) — the largest in Southeast Asia —
    growing about 5% a year, with inflation back under 2%.</p>
  </section>

  <div class="kpi-grid small">
    <div class="kpi"><span class="kpi-label">GDP</span><span class="kpi-value">Rp22,139tn</span><span class="kpi-note">US$1.40 trillion</span><span class="kpi-source">BPS / World Bank, 2024</span></div>
    <div class="kpi"><span class="kpi-label">GDP per person</span><span class="kpi-value">US$4,925</span><span class="kpi-note">per year</span><span class="kpi-source">World Bank, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Growth</span><span class="kpi-value">5.03%</span><span class="kpi-note">year on year</span><span class="kpi-source">BPS, 2024</span></div>
    <div class="kpi"><span class="kpi-label">Exports</span><span class="kpi-value">US$264.7bn</span><span class="kpi-note">surplus US$31.0bn</span><span class="kpi-source">BPS, 2024</span></div>
  </div>

  <section class="card">
    <div class="card-head">
      <div><h2>GDP, 2019–2024</h2>
      <p>Gross domestic product at current prices, trillion rupiah (BPS).</p></div>
      <div class="toggle" role="group" aria-label="Year range">
        <button data-gdp-range="all" class="${state.gdpRange === 'all' ? 'active' : ''}">2019–2024</button>
        <button data-gdp-range="recent" class="${state.gdpRange === 'recent' ? 'active' : ''}">2022–2024</button>
      </div>
    </div>
    ${lineChart(gdpPoints, { valueLabel: (v) => fmt(v, 0), yMin: 14000, yMax: 23000 })}
    <h2 class="sub">Real growth, % per year (BPS)</h2>
    ${barChart(growthPoints, { valueLabel: (v) => fmt(v, 2) + '%', highlight: 1 })}
    <p class="chart-note">2020 is the pandemic contraction (−2.07%). Every other year in the series grew between 3.7% and 5.3%.</p>
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Inflation, December</h2>
      <p>Consumer prices, year on year (BPS). The 2022 spike to 5.51% followed the
      fuel-price rise; by December 2024 it was 1.57%.</p>
      ${lineChart(inflationPoints, { valueLabel: (v) => fmt(v, 2) + '%', yMin: 0, yMax: 6, color: '#d96c4f' })}
    </section>
    <section class="card">
      <h2>What the economy is made of</h2>
      <p>Share of GDP by industry (BPS, 2024).</p>
      ${donutChart(GDP_SECTORS)}
    </section>
  </div>

  <section class="card">
    <h2>Indonesia in ASEAN</h2>
    <p>GDP per person, US dollars (World Bank, 2024). Indonesia is fifth of the ten
    ASEAN members — ahead of Viet Nam and the Philippines, far behind Singapore.</p>
    ${hbarChart(asean, { valueLabel: (v) => '$' + fmt(v, 0), highlightLabel: 'Indonesia' })}
  </section>

  <div class="two-col">
    <section class="card">
      <h2>Trade, 2024 (BPS)</h2>
      <dl class="facts">
        <div><dt>Exports</dt><dd>US$${fmt(TRADE.exports, 1)} billion</dd></div>
        <div><dt>Imports</dt><dd>US$${fmt(TRADE.imports, 1)} billion</dd></div>
        <div><dt>Trade surplus</dt><dd>US$${fmt(TRADE.surplus, 1)} billion</dd></div>
      </dl>
      <h2 class="sub">Biggest export buyers</h2>
      ${hbarChart(destinations, { valueLabel: (v) => '$' + fmt(v, 1) + 'bn', color: '#3a6ea5' })}
      <p class="source-line">US$ billion, BPS, 2024.</p>
    </section>
    <section class="card">
      <h2>What Indonesia sells</h2>
      <p>Top export goods, by value (BPS, 2024). Coal and palm oil lead; nickel products
      have climbed fast as smelters opened.</p>
      <ol class="ranked">${goods}</ol>
      <h2 class="sub">For businesses</h2>
      <p>An economy of 281.6 million people with 5% growth and 1.57% inflation is a
      large, stable market — and the 58.6% urban share keeps rising, which is where
      consumer spending concentrates.</p>
      <p><a href="#/provinces">Where the people are &rarr;</a></p>
    </section>
  </div>`;
}

// Sources and methods page: every publisher behind the figures, what each one
// covers, and how the numbers were handled.

import { SOURCES } from './data.js';
import { esc } from './format.js';

export function sources() {
  const rows = SOURCES.map(
    (s) => `<tr><td>${esc(s.publisher)}</td><td>${esc(s.covers)}</td><td>${esc(s.year)}</td><td>${esc(s.note)}</td></tr>`,
  ).join('');

  return `
  <section class="page-head">
    <p class="eyebrow">About the data</p>
    <h1>Sources &amp; methods</h1>
    <p class="lede">A statistics site is only as good as its sources. Every figure on NusaStat
    names its publisher and year where it appears; this page lists them all.</p>
  </section>

  <section class="card">
    <h2>Where the numbers come from</h2>
    <div class="table-wrap">
    <table class="data-table">
      <thead><tr><th>Publisher</th><th>What it covers</th><th>Year</th><th>Note</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>
  </section>

  <section class="card">
    <h2>How the numbers were handled</h2>
    <ul>
      <li><strong>Rounding.</strong> Figures are shown rounded to one decimal place or the nearest whole number. Shares and densities are computed from the rounded figures shown, so a total may differ by 0.1 from the sum of its parts.</li>
      <li><strong>Population.</strong> Provincial populations are BPS 2024 mid-year estimates. The 38 provinces include the four new Papuan provinces created in 2022.</li>
      <li><strong>Money.</strong> GDP is shown in rupiah at current prices (BPS) and in US dollars (World Bank). The 2024 average exchange rate was about Rp15,900 per US dollar (Bank Indonesia).</li>
      <li><strong>Age pyramid.</strong> The male/female split in each band follows the national sex ratio of about 100.5 males per 100 females (BPS, 2024).</li>
      <li><strong>No live data.</strong> This site is a static snapshot of published figures. It fetches nothing from the network, so the numbers are fixed until the next edition.</li>
    </ul>
  </section>

  <section class="card">
    <h2>About NusaStat</h2>
    <p>NusaStat is an independent, original site built for the make.fun national
    statistics bounty. It is not affiliated with Statistics Indonesia (BPS), the
    World Bank, or any government body; their figures are cited, not copied as a
    brand. The design, text and charts are original.</p>
    <p><a href="#/">Back to the overview &rarr;</a></p>
  </section>`;
}

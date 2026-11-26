// Hand-rolled SVG charts. Every chart is a plain SVG string, so the site needs
// no chart library and no network request. All charts scale to their container
// through a viewBox, which is what makes them work on a phone.

import { fmt, fmtInt, esc } from './format.js';

const INK = '#16233f';
const TEAL = '#0e7c7b';
const AMBER = '#e8a33d';
const CORAL = '#d96c4f';
const GRID = '#e3ddd2';
const MUTED = '#6b7280';

function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid meet">`;
}

// Vertical bar chart. points: [{label, value}], valueLabel formats the top label.
export function barChart(points, { width = 640, height = 300, valueLabel = (v) => fmt(v), color = TEAL, highlight = -1 } = {}) {
  const padL = 46, padB = 30, padT = 26, padR = 10;
  const values = points.map((p) => p.value);
  const lo = Math.min(0, ...values);
  const hi = Math.max(...values) * 1.08;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const slot = innerW / points.length;
  const barW = Math.min(46, slot * 0.62);
  const yAt = (v) => padT + innerH - ((v - lo) / (hi - lo)) * innerH;
  const zeroY = yAt(0);
  let out = svgOpen(width, height, 'Bar chart');
  for (let i = 0; i <= 4; i++) {
    const y = padT + (innerH * i) / 4;
    const v = hi - ((hi - lo) * i) / 4;
    out += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(v, 0)}</text>`;
  }
  out += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - padR}" y2="${zeroY.toFixed(1)}" stroke="${INK}" stroke-width="1"/>`;
  points.forEach((p, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const top = Math.min(yAt(p.value), zeroY);
    const h = Math.abs(yAt(p.value) - zeroY);
    const fill = i === highlight ? CORAL : color;
    out += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(h, 1).toFixed(1)}" rx="3" fill="${fill}"/>`;
    const labelY = p.value >= 0 ? top - 6 : top + h / 2 + 4;
    const labelFill = p.value >= 0 ? INK : '#fff';
    const lx = Math.min(Math.max(x + barW / 2, 30), width - 30);
    out += `<text x="${lx.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${labelFill}">${valueLabel(p.value)}</text>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  return out + '</svg>';
}

// Line chart with dots and value labels. points: [{label, value}].
export function lineChart(points, { width = 640, height = 300, valueLabel = (v) => fmt(v), color = TEAL, yMin = null, yMax = null } = {}) {
  const padL = 46, padB = 30, padT = 26, padR = 14;
  const values = points.map((p) => p.value);
  const lo = yMin ?? Math.min(...values) * 0.92;
  const hi = yMax ?? Math.max(...values) * 1.06;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xAt = (i) => padL + (innerW * i) / (points.length - 1);
  const yAt = (v) => padT + innerH - ((v - lo) / (hi - lo)) * innerH;
  let out = svgOpen(width, height, 'Line chart');
  for (let i = 0; i <= 4; i++) {
    const y = padT + (innerH * i) / 4;
    const v = hi - ((hi - lo) * i) / 4;
    out += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(v, 0)}</text>`;
  }
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(' ');
  out += `<path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    const isFirst = i === 0;
    const isLast = i === points.length - 1;
    const anchor = isFirst ? 'start' : isLast ? 'end' : 'middle';
    const lx = isFirst ? xAt(i) + 2 : isLast ? xAt(i) - 2 : xAt(i);
    out += `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(p.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`;
    out += `<text x="${lx.toFixed(1)}" y="${(yAt(p.value) - 11).toFixed(1)}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${INK}">${valueLabel(p.value)}</text>`;
    out += `<text x="${xAt(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  return out + '</svg>';
}

// Donut chart with a legend. slices: [{label, value}].
export function donutChart(slices, { width = 640, height = 260, colors = [TEAL, AMBER, CORAL, '#3a6ea5', '#8a6fb8', '#5b9e6a', '#c98a2e', '#7d8a99', '#b7a99a'] } = {}) {
  const cx = 130, cy = height / 2, r = 92, inner = 58;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let out = svgOpen(width, height, 'Donut chart');
  let angle = -Math.PI / 2;
  slices.forEach((s, i) => {
    const frac = s.value / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    out += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="20" font-weight="800" fill="${INK}">${fmt(total, 0)}%</text>`;
  out += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">of GDP</text>`;
  slices.forEach((s, i) => {
    const y = 24 + i * 26;
    out += `<rect x="270" y="${y - 9}" width="12" height="12" rx="2" fill="${colors[i % colors.length]}"/>`;
    out += `<text x="290" y="${y + 2}" font-size="13" fill="${INK}">${esc(s.label)} — <tspan font-weight="700">${fmt(s.value)}%</tspan></text>`;
  });
  return out + '</svg>';
}

// Population pyramid: bands with a male bar to the left and a female bar to the
// right, split by the national sex ratio. bands: [{band, total}].
export function pyramidChart(bands, { width = 640, height = 340 } = {}) {
  const mid = width / 2;
  const padT = 12, padB = 26;
  const rowH = (height - padT - padB) / bands.length;
  const maxHalf = Math.max(...bands.map((b) => b.total * 0.504));
  // Leave room for the value labels outside the longest bars.
  const scale = (mid - 120) / maxHalf;
  let out = svgOpen(width, height, 'Population pyramid');
  out += `<text x="${((mid - 40) / 2).toFixed(0)}" y="${padT + 2}" text-anchor="middle" font-size="11" font-weight="700" fill="${MUTED}">MEN</text>`;
  out += `<text x="${(mid + 40 + (width - mid - 40) / 2).toFixed(0)}" y="${padT + 2}" text-anchor="middle" font-size="11" font-weight="700" fill="${MUTED}">WOMEN</text>`;
  bands.forEach((b, i) => {
    const y = padT + 14 + i * rowH;
    const male = b.total * 0.504, female = b.total * 0.496;
    const mw = male * scale, fw = female * scale;
    out += `<rect x="${(mid - 40 - mw).toFixed(1)}" y="${y.toFixed(1)}" width="${mw.toFixed(1)}" height="${(rowH - 5).toFixed(1)}" rx="2" fill="${TEAL}"/>`;
    out += `<rect x="${(mid + 40).toFixed(1)}" y="${y.toFixed(1)}" width="${fw.toFixed(1)}" height="${(rowH - 5).toFixed(1)}" rx="2" fill="${AMBER}"/>`;
    out += `<text x="${mid}" y="${(y + rowH / 2 + 1).toFixed(1)}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(b.band)}</text>`;
    out += `<text x="${(mid - 46 - mw).toFixed(1)}" y="${(y + rowH / 2 + 1).toFixed(1)}" text-anchor="end" font-size="11" fill="${INK}">${fmt(male, 1)}m</text>`;
    out += `<text x="${(mid + 46 + fw).toFixed(1)}" y="${(y + rowH / 2 + 1).toFixed(1)}" font-size="11" fill="${INK}">${fmt(female, 1)}m</text>`;
  });
  out += `<text x="${mid}" y="${height - 6}" text-anchor="middle" font-size="11" fill="${MUTED}">Age group, millions of people (BPS, 2024)</text>`;
  return out + '</svg>';
}

// Horizontal bar list, best for ranked comparisons. rows: [{label, value}].
export function hbarChart(rows, { width = 640, rowHeight = 34, valueLabel = (v) => fmt(v), color = TEAL, highlightLabel = null } = {}) {
  const height = rows.length * rowHeight + 14;
  const padL = 108, padR = 64;
  const max = Math.max(...rows.map((r) => r.value));
  let out = svgOpen(width, height, 'Horizontal bar chart');
  rows.forEach((r, i) => {
    const y = 8 + i * rowHeight;
    const w = ((width - padL - padR) * r.value) / max;
    const fill = r.label === highlightLabel ? CORAL : color;
    out += `<text x="${padL - 8}" y="${y + 15}" text-anchor="end" font-size="12" fill="${INK}">${esc(r.label)}</text>`;
    out += `<rect x="${padL}" y="${y + 3}" width="${Math.max(w, 2).toFixed(1)}" height="18" rx="3" fill="${fill}"/>`;
    out += `<text x="${(padL + Math.max(w, 2) + 6).toFixed(1)}" y="${y + 16}" font-size="12" font-weight="700" fill="${INK}">${valueLabel(r.value)}</text>`;
  });
  return out + '</svg>';
}

export { fmtInt };

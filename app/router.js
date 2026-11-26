// Hash router: one page per route, all state in one object, every control wired
// after each render. A state change re-renders the current page without moving
// the scroll position; a route change scrolls to the top.
//
// Routes:
//   #/              overview
//   #/population    population
//   #/economy       economy
//   #/health        health & education
//   #/provinces     the 38 provinces
//   #/compare       compare two provinces
//   #/sources       sources & methods

import { home } from './views-home.js';
import { population } from './views-population.js';
import { economy } from './views-economy.js';
import { health } from './views-health.js';
import { provinces } from './views-provinces.js';
import { compare } from './views-compare.js';
import { sources } from './views-sources.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.site-nav a')];

const state = {
  gdpView: 'line',
  gdpRange: 'all',
  provinceSort: { key: 'pop', dir: 'desc' },
  provinceQuery: '',
  selectedProvince: 'West Java',
  compareA: 'West Java',
  compareB: 'Jakarta',
  compareMetric: 'pop',
};

const PAGES = {
  '': { title: 'NusaStat — Statistik Indonesia', view: home },
  population: { title: 'Population | NusaStat', view: population },
  economy: { title: 'Economy | NusaStat', view: economy },
  health: { title: 'Health & education | NusaStat', view: health },
  provinces: { title: 'Provinces | NusaStat', view: provinces },
  compare: { title: 'Compare provinces | NusaStat', view: compare },
  sources: { title: 'Sources & methods | NusaStat', view: sources },
};

function routeFromHash() {
  const m = location.hash.match(/^#\/([a-z-]*)/);
  return m ? m[1] : '';
}

function render(scrollTop) {
  window.__shotReady = false;
  const route = routeFromHash();
  const page = PAGES[route];
  if (page) {
    document.title = page.title;
    app.innerHTML = page.view(state);
  } else {
    document.title = 'Not found | NusaStat';
    app.innerHTML = `<section class="page-head"><h1>Page not found</h1>
      <p class="lede">There is no “${route}” page. The site has seven pages — start at the
      <a href="#/">overview</a>.</p></section>`;
  }
  navLinks.forEach((a) => {
    const r = a.getAttribute('href').replace('#/', '');
    if (r === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls();
  if (scrollTop) window.scrollTo(0, 0);
  window.__shotReady = true;
}

function rerender() {
  const y = window.scrollY;
  render(false);
  window.scrollTo(0, y);
}

function wireControls() {
  app.querySelectorAll('[data-gdp-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.gdpView = btn.dataset.gdpView;
      rerender();
    });
  });
  app.querySelectorAll('[data-gdp-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.gdpRange = btn.dataset.gdpRange;
      rerender();
    });
  });
  app.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (state.provinceSort.key === key) {
        state.provinceSort.dir = state.provinceSort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        state.provinceSort = { key, dir: key === 'name' ? 'asc' : 'desc' };
      }
      rerender();
    });
  });
  const search = document.getElementById('province-search');
  if (search) {
    search.addEventListener('input', () => {
      state.provinceQuery = search.value;
      rerender();
      const again = document.getElementById('province-search');
      again.focus();
      again.setSelectionRange(again.value.length, again.value.length);
    });
  }
  app.querySelectorAll('tr[data-province]').forEach((row) => {
    row.addEventListener('click', () => {
      state.selectedProvince = row.dataset.province;
      rerender();
      document.getElementById('province-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  const form = document.getElementById('compare-form');
  if (form) {
    form.addEventListener('change', (event) => {
      if (event.target.id === 'compare-a') state.compareA = event.target.value;
      if (event.target.id === 'compare-b') state.compareB = event.target.value;
      if (event.target.id === 'compare-metric') state.compareMetric = event.target.value;
      rerender();
    });
    form.addEventListener('submit', (event) => event.preventDefault());
  }
}

export function startRouter() {
  window.addEventListener('hashchange', () => render(true));
  render(true);
}

// NusaStat data: figures about Indonesia, each with its source and year.
// Values are the publishers' published figures, rounded for display. Province
// populations are BPS 2024 mid-year estimates; areas are in square kilometres.

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'The numbers of the world\u2019s fourth most populous country, in one place.',
  updated: 'Figures as published for 2024 unless a year is shown.',
};

// Headline indicators shown on the home page.
export const HEADLINE = [
  { key: 'population', label: 'Population', value: '281.6m', note: 'people', source: 'BPS, 2024' },
  { key: 'gdp', label: 'GDP', value: 'Rp22,139tn', note: 'US$1.40 trillion', source: 'BPS / World Bank, 2024' },
  { key: 'gdpPerCapita', label: 'GDP per person', value: 'US$4,925', note: 'per year', source: 'World Bank, 2024' },
  { key: 'growth', label: 'Economic growth', value: '5.03%', note: 'year on year', source: 'BPS, 2024' },
  { key: 'inflation', label: 'Inflation', value: '1.57%', note: 'December, year on year', source: 'BPS, 2024' },
  { key: 'unemployment', label: 'Unemployment', value: '4.91%', note: 'of the labour force', source: 'BPS, Aug 2024' },
  { key: 'poverty', label: 'Poverty rate', value: '8.57%', note: 'of the population', source: 'BPS, Sep 2024' },
  { key: 'lifeExpectancy', label: 'Life expectancy', value: '74.1 yrs', note: 'at birth', source: 'BPS, 2024' },
];

// GDP, current prices, trillion rupiah (BPS) and real growth (BPS).
export const GDP_YEARS = [
  { year: 2019, gdp: 15833, growth: 5.02 },
  { year: 2020, gdp: 15443, growth: -2.07 },
  { year: 2021, gdp: 16977, growth: 3.70 },
  { year: 2022, gdp: 19588, growth: 5.31 },
  { year: 2023, gdp: 20892, growth: 5.05 },
  { year: 2024, gdp: 22139, growth: 5.03 },
];

// Consumer-price inflation, December year on year (BPS).
export const INFLATION_YEARS = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Share of GDP by industry, 2024 (BPS).
export const GDP_SECTORS = [
  { label: 'Manufacturing', value: 18.6 },
  { label: 'Trade', value: 12.9 },
  { label: 'Agriculture, forestry & fishing', value: 12.5 },
  { label: 'Construction', value: 10.2 },
  { label: 'Mining & quarrying', value: 9.5 },
  { label: 'Transport & storage', value: 5.2 },
  { label: 'Information & communication', value: 4.5 },
  { label: 'Financial services', value: 4.3 },
  { label: 'All other industries', value: 22.3 },
];

// GDP per person, US dollars, 2024 (World Bank) — Indonesia beside its neighbours.
export const ASEAN_GDP_PER_CAPITA = [
  { label: 'Singapore', value: 90674 },
  { label: 'Brunei', value: 34970 },
  { label: 'Malaysia', value: 13379 },
  { label: 'Thailand', value: 7527 },
  { label: 'Indonesia', value: 4925 },
  { label: 'Viet Nam', value: 4806 },
  { label: 'Philippines', value: 4145 },
  { label: 'Cambodia', value: 2628 },
  { label: 'Lao PDR', value: 2063 },
  { label: 'Myanmar', value: 1168 },
];

// Trade, US$ billion (BPS, 2024).
export const TRADE = {
  exports: 264.7,
  imports: 233.7,
  surplus: 31.0,
  topDestinations: [
    { label: 'China', value: 62.4 },
    { label: 'United States', value: 26.3 },
    { label: 'Japan', value: 19.8 },
    { label: 'India', value: 17.9 },
    { label: 'Singapore', value: 12.6 },
  ],
  topGoods: ['Coal', 'Palm oil', 'Nickel products', 'Rubber', 'Textiles & garments'],
};

// Population by year, millions (BPS mid-year estimates).
export const POPULATION_YEARS = [
  { year: 2020, value: 271.7 },
  { year: 2021, value: 272.3 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

// Age structure, 2024 (BPS, millions). The male/female split follows the national
// sex ratio of about 100.5 males per 100 females.
export const AGE_BANDS = [
  { band: '0\u20139', total: 44.9 },
  { band: '10\u201319', total: 45.2 },
  { band: '20\u201329', total: 46.8 },
  { band: '30\u201339', total: 43.5 },
  { band: '40\u201349', total: 38.2 },
  { band: '50\u201359', total: 29.6 },
  { band: '60\u201369', total: 19.1 },
  { band: '70+', total: 14.3 },
];

export const AGE_SHARES = [
  { label: 'Children (0\u201314)', value: 23.9 },
  { label: 'Working age (15\u201364)', value: 68.7 },
  { label: 'Older people (65+)', value: 7.4 },
];

export const URBAN_SHARE = [
  { label: 'Urban', value: 58.6 },
  { label: 'Rural', value: 41.4 },
];

// Health and education indicators.
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '74.1 years', source: 'BPS, 2024' },
  { label: 'Infant mortality', value: '17 per 1,000 live births', source: 'UN IGME, 2023' },
  { label: 'Stunting in under-5s', value: '21.5%', source: 'SSGI, 2023' },
  { label: 'Human Development Index', value: '75.02', source: 'BPS, 2024' },
  { label: 'Gini ratio', value: '0.379', source: 'BPS, Sep 2024' },
];

export const EDUCATION = [
  { label: 'Adult literacy', value: '96.5%', source: 'BPS, 2024' },
  { label: 'Mean years of schooling', value: '9.0 years', source: 'BPS, 2024' },
  { label: 'Expected years of schooling', value: '13.2 years', source: 'BPS, 2024' },
  { label: 'Tertiary enrolment (gross)', value: '31.5%', source: 'BPS, 2023' },
];

export const WORK = [
  { label: 'Labour-force participation', value: '70.5%', source: 'BPS, Aug 2024' },
  { label: 'Unemployment rate', value: '4.91%', source: 'BPS, Aug 2024' },
  { label: 'Informal employment', value: '57.9%', source: 'BPS, Aug 2024' },
  { label: 'Internet users', value: '221.6m (79.5%)', source: 'APJII, 2024' },
];

// All 38 provinces: population in millions and area in km2 (BPS 2024 estimates,
// rounded). Density and national share are computed from these two columns.
export const PROVINCES = [
  { name: 'West Java', pop: 49.9, area: 35378 },
  { name: 'East Java', pop: 41.8, area: 47803 },
  { name: 'Central Java', pop: 37.9, area: 32801 },
  { name: 'North Sumatra', pop: 15.6, area: 72981 },
  { name: 'Banten', pop: 12.4, area: 9663 },
  { name: 'Jakarta', pop: 10.7, area: 664 },
  { name: 'South Sulawesi', pop: 9.5, area: 46717 },
  { name: 'Lampung', pop: 9.4, area: 34624 },
  { name: 'South Sumatra', pop: 8.9, area: 91592 },
  { name: 'Riau', pop: 7.0, area: 87024 },
  { name: 'West Sumatra', pop: 6.0, area: 42013 },
  { name: 'West Kalimantan', pop: 5.8, area: 147307 },
  { name: 'East Nusa Tenggara', pop: 5.7, area: 48718 },
  { name: 'Aceh', pop: 5.6, area: 57956 },
  { name: 'West Nusa Tenggara', pop: 5.6, area: 18572 },
  { name: 'Bali', pop: 4.4, area: 5780 },
  { name: 'South Kalimantan', pop: 4.3, area: 38744 },
  { name: 'East Kalimantan', pop: 4.0, area: 129067 },
  { name: 'Yogyakarta', pop: 3.8, area: 3133 },
  { name: 'Jambi', pop: 3.7, area: 50058 },
  { name: 'Central Sulawesi', pop: 3.1, area: 61841 },
  { name: 'Central Kalimantan', pop: 2.8, area: 153564 },
  { name: 'Southeast Sulawesi', pop: 2.8, area: 38068 },
  { name: 'North Sulawesi', pop: 2.7, area: 13892 },
  { name: 'Riau Islands', pop: 2.2, area: 8202 },
  { name: 'Bengkulu', pop: 2.1, area: 19919 },
  { name: 'Maluku', pop: 2.0, area: 46914 },
  { name: 'West Sulawesi', pop: 1.6, area: 16787 },
  { name: 'Bangka Belitung', pop: 1.5, area: 16424 },
  { name: 'North Maluku', pop: 1.4, area: 31983 },
  { name: 'Highland Papua', pop: 1.4, area: 51213 },
  { name: 'Central Papua', pop: 1.3, area: 66130 },
  { name: 'West Papua', pop: 1.2, area: 60275 },
  { name: 'Gorontalo', pop: 1.2, area: 11257 },
  { name: 'Papua', pop: 1.1, area: 82680 },
  { name: 'North Kalimantan', pop: 0.7, area: 75467 },
  { name: 'Southwest Papua', pop: 0.6, area: 39167 },
  { name: 'South Papua', pop: 0.5, area: 117849 },
];

export const SOURCES = [
  { publisher: 'Statistics Indonesia (BPS)', covers: 'Population, GDP, growth, inflation, unemployment, poverty, life expectancy, literacy, schooling, HDI, Gini ratio, provincial populations', year: '2024', note: 'Mid-year estimates and the 2024 releases; September 2024 for poverty and the Gini ratio, August 2024 for labour figures.' },
  { publisher: 'World Bank', covers: 'GDP in US dollars, GDP per person, urban population share, ASEAN comparison', year: '2024', note: 'World Development Indicators, 2024.' },
  { publisher: 'APJII', covers: 'Internet users and penetration', year: '2024', note: 'Indonesian Internet Service Providers Association survey, 2024.' },
  { publisher: 'UN IGME', covers: 'Infant mortality', year: '2023', note: 'UN Inter-agency Group for Child Mortality Estimation.' },
  { publisher: 'SSGI', covers: 'Stunting in children under five', year: '2023', note: 'Indonesian Nutrition Status Survey (Survei Status Gizi Indonesia).' },
];

// Display helpers shared by the pages. They only change how data is
// shown (labels, names, number format); the content files are untouched.
import companyMeta from '../data/company-meta.json';
import type { Lang } from '../data/site';

type Meta = Record<string, { nameJa?: string }>;
const META = companyMeta as Meta;

/** The same slug rule the publish bridge uses for src/data/companies.json. */
export const companySlug = (name: string): string => {
  const drop = new Set(['ltd', 'limited', 'inc', 'corporation', 'corp', 'co']);
  const tokens = name
    .replace(/,/g, '')
    .replace(/\./g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  while (tokens.length > 1 && drop.has(tokens[tokens.length - 1])) tokens.pop();
  return tokens.join('-');
};

/** Company name in the page language (Japanese name from company-meta when there is one). */
export const companyName = (name: string, lang: Lang): string => {
  if (lang !== 'ja') return name;
  if (name.startsWith('Japan Equities')) return '日本株（セクター・アップデート）';
  if (name.startsWith('Global Markets')) return '週次マーケットレポート';
  const ja = META[companySlug(name)]?.nameJa;
  return ja ? ja.replace(/^株式会社\s*|\s*株式会社$/g, '') : name;
};

const NEWS_JA: Record<string, string> = {
  Semiconductors: '半導体',
  'Macro & Policy': 'マクロ・政策',
  'AIDC / Neocloud': 'AIデータセンター',
  'AI data centres': 'AIデータセンター',
  'AI Data Centres': 'AIデータセンター',
  'AI & Semiconductors': 'AI・半導体',
  'Power & Optics': '電力・光',
  'China / Taiwan': '中国・台湾',
  'Heavy Equipment': '重機・設備',
  Robotics: 'ロボティクス',
  Markets: '市場',
  Services: 'サービス',
  'Consumer & Retail': '消費・小売',
  Machinery: '機械',
  'Telecom & Media': '通信・メディア',
};

const SECTOR_JA: Record<string, string> = {
  'Machine Tools': '工作機械',
  Industrials: '資本財',
  Semiconductors: '半導体',
  'Semiconductors, AIDC & Industrials': '半導体・AIデータセンター・資本財',
  'Warehousing & Logistics': '倉庫・物流',
  'Material Handling & Intralogistics': 'マテリアルハンドリング',
  'Factory Automation': 'FA',
  'Industrials — Electrical Equipment': '電機',
  'Consumer Services': '消費者サービス',
  Chemicals: '化学',
  'Industrial IoT / Edge Computing': '産業IoT・エッジ',
  'Office Equipment / Digital Services': '事務機器・デジタルサービス',
  'Semiconductor Equipment': '半導体製造装置',
  'Heavy Industries — Aero Engines & Energy': '重工業（航空エンジン・エネルギー）',
  'Precision Components & Semiconductors': '精密部品・半導体',
  'Heavy Industries — Energy, Defense & Space': '重工業（エネルギー・防衛・宇宙）',
  Technology: 'テクノロジー',
  'Machinery — Power Tools & Outdoor Power Equipment': '電動工具',
  'Industrial Machinery': '産業機械',
  'All sectors — Prime market prices & valuation': '全業種（プライム市場）',
  Retail: '小売',
  'Electrical Equipment': '電機',
  'Precision Cutting Tools': '精密切削工具',
  'All sectors — market performance review': '全業種（月次）',
  'Measurement & Analytical Instruments / Semiconductor Process Equipment': '計測・分析機器',
  'Factory Automation Components': 'FA部品',
  'Chemicals & Housing': '化学・住宅',
  'Renewable Energy & Storage': '再生可能エネルギー・蓄電',
  'Agricultural & Construction Machinery': '農機・建機',
  'Heavy Industries — Aerospace, Energy & Mobility': '重工業（航空宇宙・エネルギー）',
  'Industrial Conglomerates': '複合企業',
  'Construction & Mining Equipment': '建設・鉱山機械',
};

export const newsSector = (s: string, lang: Lang) => (lang === 'ja' ? (NEWS_JA[s] ?? s) : s);
export const reportSector = (s: string, lang: Lang) => (lang === 'ja' ? (SECTOR_JA[s] ?? s) : s);

/** Kinds of analyst report, read from the company line of each entry. */
export type ReportKind = 'weekly' | 'sector' | 'company';
export const reportKind = (company: string): ReportKind => {
  if (company.startsWith('Global Markets')) return 'weekly';
  if (company.startsWith('Japan Equities')) return 'sector';
  return 'company';
};

export const reportTypeLabel = (id: string, type: string, lang: Lang): string => {
  const ja = lang === 'ja';
  if (id.includes('results')) return ja ? '決算' : 'Results';
  if (type === 'initiation') return ja ? 'カバレッジ開始' : 'Initiation';
  return ja ? 'アップデート' : 'Update';
};

export const fmtDate = (d: Date, lang: Lang) =>
  lang === 'ja'
    ? `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
    : d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

export const fmtShort = (d: Date, lang: Lang) =>
  lang === 'ja'
    ? `${d.getMonth() + 1}/${d.getDate()}`
    : d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });

export const fmtLong = (d: Date, lang: Lang) =>
  lang === 'ja'
    ? `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${'日月火水木金土'[d.getDay()]}）`
    : d.toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });

/** Share price: yen without decimals; other currencies keep two. */
export const fmtPrice = (price: number, currency: string): string => {
  if (currency === 'JPY') return '¥' + Math.round(price).toLocaleString('en-US');
  const two = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  if (currency === 'USD') return 'US$' + price.toLocaleString('en-US', two);
  if (currency === 'TWD') return 'NT$' + price.toLocaleString('en-US', two);
  return price.toLocaleString('en-US', two);
};

/* ---------- News helpers ---------- */
export const newsSlug = (id: string) => id.replace(/-(ja|en)$/, '');
export const newsHref = (id: string, lang: Lang) => `/${lang}/news/${newsSlug(id)}/`;

/**
 * The first part of a news body (before the first horizontal rule) as
 * simple HTML: paragraphs, **bold** and [links](url). Later parts hold
 * the same item in other languages, so they are not shown.
 */
export const newsBodyHtml = (body: string | undefined): string => {
  if (!body) return '';
  const first = body.split(/\n-{3,}\n/)[0];
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return first
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      let h = esc(p);
      h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      h = h.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      return `<p>${h}</p>`;
    })
    .join('');
};

/* ---------- Coverage companies named in a piece of text ---------- */
import companiesData from '../data/companies.json';
type Co = { slug: string; name: string; ticker: string; sector: string };
export const COMPANIES = ((companiesData as { companies?: Co[] }).companies ?? []) as Co[];

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const MATCHERS = COMPANIES.map((c) => {
  const pats: RegExp[] = [];
  if (/^\d{3}[0-9A-Z]$/.test(c.ticker)) pats.push(new RegExp(`[（(]${escRe(c.ticker)}[)）]`));
  else if (/^[A-Z]{2,5}$/.test(c.ticker)) pats.push(new RegExp(`\\b${c.ticker}\\b`));
  const ja = META[c.slug]?.nameJa?.replace(/^株式会社\s*|\s*株式会社$/g, '');
  if (ja && ja.length >= 3) pats.push(new RegExp(escRe(ja)));
  const words = c.slug.split('-').filter((w) => w !== 'the');
  if (words.join('').length >= 5) pats.push(new RegExp(`\\b${words.map(escRe).join('[ -]')}\\b`, 'i'));
  return { c, pats };
});
export const companiesIn = (text: string) =>
  MATCHERS.filter((m) => m.pats.some((p) => p.test(text))).map((m) => m.c);

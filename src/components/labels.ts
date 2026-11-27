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

/* ---------- Related stocks for an industry report ----------
 * Listed companies the report itself names: covered companies (by name,
 * short name or code), any company written as "name (code)", and a few
 * listed companies the reports often name without a code. Ranked by how
 * often they appear; the top four are shown. Covered ones link to their
 * company page.
 */
export interface RelatedStock { name: string; code: string; slug: string | null }
const KATA = 'ァ-ヶー';
const jaPat = (s: string) => new RegExp(`(?<![${KATA}])${s}(?![${KATA}])`, 'g');
const COVER_PATS = COMPANIES.map((c) => {
  const pats: RegExp[] = [];
  if (/^\d{3}[0-9A-Z]$/.test(c.ticker)) pats.push(new RegExp(`[（(]${escRe(c.ticker)}[)）]`, 'g'));
  else if (/^[A-Z]{2,5}$/.test(c.ticker)) pats.push(new RegExp(`\\b${c.ticker}\\b`, 'g'));
  const ja = META[c.slug]?.nameJa?.replace(/^株式会社\s*|\s*株式会社$/g, '');
  if (ja && ja.length >= 3) pats.push(/^[\x00-\x7f]+$/.test(ja) ? new RegExp(`\\b${escRe(ja)}\\b`, 'g') : jaPat(escRe(ja)));
  const words = c.slug.split('-').filter((w) => w !== 'the');
  if (words.join('').length >= 5) pats.push(new RegExp(`\\b${words.map(escRe).join('[ -]')}\\b`, 'gi'));
  const alias: Record<string, string[]> = {
    'mitsubishi-heavy-industries': ['三菱重工(?!業)'],
    'kawasaki-heavy-industries': ['川崎重工(?!業)'],
    'sumitomo-electric-industries': ['住友電工'],
    'furukawa-electric': ['古河電工'],
    komatsu: ['コマツ'],
  };
  for (const a of alias[c.slug] ?? []) pats.push(new RegExp(`(?<![${KATA}])${a}`, 'g'));
  return { c, name: ja || c.name, pats };
});
const NAMED: [string, string, string[]][] = [
  ['パナソニックHD', '6752', ['パナソニック']], ['トヨタ自動車', '7203', ['トヨタ']], ['住友金属鉱山', '5713', ['住友金属鉱山']],
  ['マクセル', '6810', ['マクセル']], ['村田製作所', '6981', ['村田製作所']], ['日産自動車', '7201', ['日産']],
  ['三井物産', '8031', ['三井物産']], ['旭化成', '3407', ['旭化成']], ['千代田化工建設', '6366', ['千代田化工']],
  ['北海道電力', '9509', ['北海道電力']], ['富士電機', '6504', ['富士電機']], ['京セラ', '6971', ['京セラ']],
  ['明電舎', '6508', ['明電舎']], ['GSユアサ', '6674', ['GSユアサ', 'ジーエス・ユアサ']], ['信越化学工業', '4063', ['信越化学']],
  ['SUMCO', '3436', ['SUMCO']], ['キオクシアHD', '285A', ['キオクシア']], ['ルネサスエレクトロニクス', '6723', ['ルネサス']],
  ['ローム', '6963', ['ローム']], ['ソニーグループ', '6758', ['ソニー']],
  ['ヤマハ発動機', '7272', ['ヤマハ発動機']], ['ニコン', '7731', ['ニコン']], ['フジシールインターナショナル', '7864', ['フジシール']],
];
const CODED = /([一-龥々ァ-ヶーＡ-Ｚａ-ｚA-Za-z0-9・&＆]{2,24}|(?:[A-Z][A-Za-z&.\-]+ ){0,3}[A-Z][A-Za-z&.\-]+)[（(](\d{4}|\d{3}[A-Z])[)）]/g;
/* Corrections where a report writes the wrong code or an old spelling
 * (JUKI is 6440, not 6444; 6245 is ヒラノテクシード). */
const CODE_FIX: Record<string, string> = { '6444': '6440' };
const NAME_FIX: Record<string, string> = { '6245': 'ヒラノテクシード' };
const count = (re: RegExp, text: string) => (text.match(re) ?? []).length;
const cleanName = (nm: string) => {
  let n = nm.replace(/^(?:[0-9]+|図表|表|出典|注|例|約|計|うち)+/, '');
  if (n.includes('・')) {
    const [head, ...rest] = n.split('・');
    if (/(最大手|大手|首位|トップ|専業|系)$/.test(head)) n = rest.join('・');
  }
  return n;
};
export const relatedStocks = (body: string | undefined, max = 4): RelatedStock[] => {
  if (!body) return [];
  const score = new Map<string, number>();
  const names = new Map<string, string>();
  const slugs = new Map<string, string>();
  const add = (code: string, k: number) => score.set(code, (score.get(code) ?? 0) + k);
  const covered = new Set(COMPANIES.map((c) => c.ticker));
  for (const { c, name, pats } of COVER_PATS) {
    const k = pats.reduce((n, p) => n + count(p, body), 0);
    if (k >= 2) {
      add(c.ticker, k);
      names.set(c.ticker, name);
      slugs.set(c.ticker, c.slug);
    }
  }
  for (const m of body.matchAll(CODED)) {
    const nm = cleanName(m[1]);
    const code = CODE_FIX[m[2]] ?? m[2];
    if (covered.has(code) || nm.length < 2 || /^(19[89]\d|20[0-3]\d)$/.test(code)) continue;
    add(code, 1);
    if (!names.has(code)) names.set(code, nm);
  }
  for (const [disp, code, alts] of NAMED) {
    const k = alts.reduce((n, a) => n + count(jaPat(escRe(a)), body), 0);
    if (k) add(code, k);
    if (score.has(code)) names.set(code, disp);
  }
  const ranked = [...score.entries()].sort((a, b) => b[1] - a[1]);
  let top = ranked.filter(([, v]) => v >= 2).slice(0, max);
  if (top.length === 0) top = ranked.slice(0, max);
  return top.map(([code]) => ({ name: NAME_FIX[code] ?? names.get(code) ?? code, code, slug: slugs.get(code) ?? null }));
};

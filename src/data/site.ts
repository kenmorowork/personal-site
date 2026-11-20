// Shared facts about Ken and his channels. Single source of truth for
// every page in both languages.

export type Lang = 'ja' | 'en';

export const NAME = 'Ken Morozumi';

// Role line — used verbatim wherever a tagline is needed.
export const TAGLINE =
  'JP Equity Analyst (Industrials, Materials, others) | Tokyo |';

// TODO: once the custom domain is registered and mail is set up,
// replace this placeholder with hello@<your-domain>.
export const EMAIL_PLACEHOLDER = 'hello@kenmorozumi.com';

export interface Channel {
  name: string;
  handle: string;
  url: string;
  blurb: { ja: string; en: string };
}

export const CHANNELS: Channel[] = [
  {
    name: 'X',
    handle: '@moro_ken_jp',
    url: 'https://x.com/moro_ken_jp',
    blurb: {
      ja: '市場・業界の短報を1日3回配信しています。',
      en: 'Short market and industry reports, three times a day.',
    },
  },
  {
    name: 'Threads',
    handle: '@moro.ken.jp',
    url: 'https://www.threads.com/@moro.ken.jp',
    blurb: {
      ja: '短報の全文と出典リンクはこちらに置いています。',
      en: 'Full short reports with source links.',
    },
  },
  {
    name: 'Instagram',
    handle: '@moro.ken.jp',
    url: 'https://www.instagram.com/moro.ken.jp',
    blurb: {
      ja: '毎日のレポートから、チャートと数字のハイライトを投稿しています。',
      en: 'Chart and number highlights from the daily reports.',
    },
  },
  {
    name: 'Substack',
    handle: 'morokenjp',
    url: 'https://morokenjp.substack.com',
    blurb: {
      ja: '長文レポートを週3回（月・水・土）無料で配信しています。',
      en: 'Long-form reports, three times a week (Mon / Wed / Sat), free.',
    },
  },
  {
    name: 'note',
    handle: 'moro_ken_jp',
    url: 'https://note.com/moro_ken_jp',
    blurb: {
      ja: '長文レポートの日本語での公開先です。',
      en: 'Long-form reports in Japanese.',
    },
  },
];

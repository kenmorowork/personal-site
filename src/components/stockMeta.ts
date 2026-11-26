/* Industry (業種) of the listed companies that appear as related stocks on the
 * industry reports, keyed by securities code. Source: EDINET DB company
 * search (industry field), checked 2026-11-26. A code that is not listed here
 * falls back to the coverage sector (covered companies) or shows no industry.
 */
const IND: Record<string, string> = {
  '1961': '建設業', '1964': '建設業', '1969': '建設業', '1979': '建設業', '285A': '電気機器',
  '3401': '繊維製品', '3402': '繊維製品', '3407': '化学', '3436': '金属製品', '4004': '化学',
  '4062': '電気機器', '4063': '化学', '4091': '化学', '4182': '化学', '4188': '化学',
  '5186': 'ゴム製品', '5192': 'ゴム製品', '5195': 'ゴム製品', '5214': 'ガラス・土石製品', '5331': 'ガラス・土石製品',
  '5393': 'ガラス・土石製品', '5609': '鉄鋼', '5632': '鉄鋼', '5711': '非鉄金属', '5713': '非鉄金属',
  '5741': '非鉄金属', '5801': '非鉄金属', '5802': '非鉄金属', '5803': '非鉄金属', '5851': '非鉄金属',
  '5852': '非鉄金属', '5957': '金属製品', '5991': '金属製品', '6103': '機械', '6113': '機械',
  '6141': '機械', '6143': '機械', '6146': '機械', '6165': '機械', '6245': '機械',
  '6268': '機械', '6273': '機械', '6278': '機械', '6301': '機械', '6324': '機械',
  '6326': '機械', '6340': '機械', '6349': '機械', '6361': '機械', '6366': '建設業',
  '6367': '機械', '6371': '機械', '6383': '機械', '6407': '機械', '6440': '機械',
  '6467': '機械', '6472': '機械', '6473': '機械', '6479': '電気機器', '6481': '機械',
  '6501': '電気機器', '6503': '電気機器', '6504': '電気機器', '6506': '電気機器', '6508': '電気機器',
  '6594': '電気機器', '6645': '電気機器', '6701': '電気機器', '6723': '電気機器', '6752': '電気機器',
  '6762': '電気機器', '6810': '電気機器', '6856': '電気機器', '6857': '電気機器', '6861': '電気機器',
  '6920': '電気機器', '6954': '電気機器', '6963': '電気機器', '6971': '電気機器', '6981': '電気機器',
  '6986': '電気機器', '7003': '機械', '7004': '機械', '7011': '機械', '7012': '輸送用機器',
  '7013': '機械', '7201': '輸送用機器', '7203': '輸送用機器', '7272': '輸送用機器', '7731': '精密機器',
  '7735': '電気機器', '7752': '電気機器', '7864': 'その他製品', '8031': '卸売業', '8035': '電気機器',
  '8078': '卸売業', '8088': '卸売業', '9301': '倉庫・運輸関連業', '9302': '倉庫・運輸関連業', '9303': '倉庫・運輸関連業',
  '9830': '卸売業', '9962': '卸売業',
};

/* TSE's own English names for the 33 industries used above. */
const IND_EN: Record<string, string> = {
  建設業: 'Construction', 繊維製品: 'Textiles & Apparels', 化学: 'Chemicals', 金属製品: 'Metal Products',
  ゴム製品: 'Rubber Products', 'ガラス・土石製品': 'Glass & Ceramics Products', 鉄鋼: 'Iron & Steel',
  非鉄金属: 'Nonferrous Metals', 機械: 'Machinery', 電気機器: 'Electric Appliances',
  輸送用機器: 'Transportation Equipment', 精密機器: 'Precision Instruments', その他製品: 'Other Products',
  卸売業: 'Wholesale Trade', '倉庫・運輸関連業': 'Warehousing & Harbor Transportation Services',
};

export const industryOf = (code: string, lang: 'ja' | 'en'): string => {
  const ja = IND[code];
  if (!ja) return '';
  return lang === 'ja' ? ja : (IND_EN[ja] ?? ja);
};

/** Tokyo-listed codes: four digits, or three digits and a letter. */
export const isTseCode = (code: string) => /^\d{3}[0-9A-Z]$/.test(code);

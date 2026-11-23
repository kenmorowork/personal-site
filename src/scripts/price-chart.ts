import { createChart, CandlestickSeries } from 'lightweight-charts';
import type { CandlestickData, Time } from 'lightweight-charts';

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

/** Chart colours follow the site's neutral palette and its .dark theme class. */
function themeOptions() {
  const dark = document.documentElement.classList.contains('dark');
  return {
    layout: {
      background: { color: 'transparent' },
      textColor: dark ? '#a3a3a3' : '#525252',
      fontSize: 11,
    },
    grid: {
      vertLines: { color: dark ? '#262626' : '#f0f0f0' },
      horzLines: { color: dark ? '#262626' : '#f0f0f0' },
    },
    crosshair: {
      vertLine: { color: dark ? '#525252' : '#a3a3a3' },
      horzLine: { color: dark ? '#525252' : '#a3a3a3' },
    },
    rightPriceScale: { borderColor: dark ? '#404040' : '#d4d4d4' },
    timeScale: { borderColor: dark ? '#404040' : '#d4d4d4' },
  };
}

document
  .querySelectorAll<HTMLElement>('[data-price-chart]')
  .forEach((root) => {
    const payloadEl = root.querySelector('[data-price-chart-payload]');
    const canvas = root.querySelector<HTMLElement>('[data-price-chart-canvas]');
    if (!payloadEl || !canvas) return;

    let candles: Candle[] = [];
    try {
      candles = JSON.parse(payloadEl.textContent || '{}').candles ?? [];
    } catch {
      return;
    }
    if (candles.length === 0) return;

    const chart = createChart(canvas, {
      ...themeOptions(),
      autoSize: true,
      height: 360,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      borderVisible: false,
      priceFormat: { type: 'price', precision: 1, minMove: 0.1 },
    });
    series.setData(
      candles.map((c) => ({ ...c, time: c.time as Time })) as CandlestickData<Time>[],
    );
    chart.timeScale().fitContent();

    // Re-theme when the site's dark-mode toggle flips the .dark class.
    new MutationObserver(() => chart.applyOptions(themeOptions())).observe(
      document.documentElement,
      { attributes: true, attributeFilter: ['class'] },
    );
  });

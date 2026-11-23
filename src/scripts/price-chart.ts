import { createChart, AreaSeries } from 'lightweight-charts';
import type { LineData, Time } from 'lightweight-charts';

interface Close {
  time: string;
  value: number;
}

/**
 * Colours follow the site's neutral palette and its .dark theme class.
 * The chart is deliberately plain: one area series of daily closes,
 * no indicators, no markers, no extra series.
 */
function themeOptions() {
  const dark = document.documentElement.classList.contains('dark');
  return {
    chart: {
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
    },
    series: {
      lineColor: dark ? '#d4d4d4' : '#404040',
      topColor: dark ? 'rgba(212, 212, 212, 0.15)' : 'rgba(64, 64, 64, 0.12)',
      bottomColor: 'rgba(128, 128, 128, 0)',
    },
  };
}

document
  .querySelectorAll<HTMLElement>('[data-price-chart]')
  .forEach((root) => {
    const payloadEl = root.querySelector('[data-price-chart-payload]');
    const canvas = root.querySelector<HTMLElement>('[data-price-chart-canvas]');
    if (!payloadEl || !canvas) return;

    let closes: Close[] = [];
    try {
      closes = JSON.parse(payloadEl.textContent || '{}').closes ?? [];
    } catch {
      return;
    }
    if (closes.length === 0) return;

    const theme = themeOptions();
    const chart = createChart(canvas, {
      ...theme.chart,
      autoSize: true,
      height: 280,
    });

    const series = chart.addSeries(AreaSeries, {
      ...theme.series,
      lineWidth: 2,
      priceLineVisible: false,
      priceFormat: { type: 'price', precision: 1, minMove: 0.1 },
    });
    series.setData(
      closes.map((c) => ({ ...c, time: c.time as Time })) as LineData<Time>[],
    );
    chart.timeScale().fitContent();

    // Re-theme when the site's dark-mode toggle flips the .dark class.
    new MutationObserver(() => {
      const t = themeOptions();
      chart.applyOptions(t.chart);
      series.applyOptions(t.series);
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });

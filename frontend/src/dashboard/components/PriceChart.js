import React from 'react';

function PriceChart({ selectedStockData, timeframes, selectedTimeframe, onTimeframeChange }) {
  const isPositive = selectedStockData.positive;

  return (
    <article className='chart-panel panel'>
      <div className='panel-heading'>
        <div>
          <h2>{selectedStockData.symbol}</h2>
          <span>{selectedStockData.exchange} · {selectedTimeframe}</span>
        </div>
        <strong className={isPositive ? 'positive' : 'negative'}>{selectedStockData.change}</strong>
      </div>

      <div className='price-line'>
        <b>₹ {selectedStockData.price}</b>
        <span>{selectedStockData.asOf}</span>
      </div>

      <div className='chart-timeframes' role='tablist' aria-label='Chart timeframe'>
        {timeframes.map((timeframe) => (
          <button
            type='button'
            className={selectedTimeframe === timeframe ? 'is-active' : ''}
            key={timeframe}
            onClick={() => onTimeframeChange(timeframe)}
          >
            {timeframe}
          </button>
        ))}
      </div>

      <div className='market-chart' aria-label={`${selectedStockData.symbol} price chart`}>
        <div className='chart-plot'>
          <div className='chart-y-labels' aria-hidden='true'>
            <span>₹{Number(selectedStockData.price.replace(/,/g, '')) + 80}</span>
            <span>₹{Number(selectedStockData.price.replace(/,/g, '')) + 40}</span>
            <span>₹{Number(selectedStockData.price.replace(/,/g, '')) + 20}</span>
            <span>₹{selectedStockData.price}</span>
            <span>₹{Number(selectedStockData.price.replace(/,/g, '')) - 20}</span>
          </div>

          <svg viewBox='0 0 500 150' role='img'>
            <defs>
              <linearGradient id='chart-fill' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='0%' stopColor={isPositive ? '#65c98a' : '#f16d6d'} stopOpacity='.2' />
                <stop offset='100%' stopColor={isPositive ? '#65c98a' : '#f16d6d'} stopOpacity='0' />
              </linearGradient>
            </defs>
            <path className='chart-grid-line' d='M0 18 H500 M0 54 H500 M0 90 H500 M0 126 H500' />
            <path d={`${selectedStockData.sparkline} V150 H0Z`} fill='url(#chart-fill)' />
            <path className='chart-line' d={selectedStockData.sparkline} />
            <line className='chart-marker' x1='455' y1='0' x2='455' y2='150' />
            <circle cx='500' cy='18' r='4.5' fill={isPositive ? '#65c98a' : '#f16d6d'} stroke='#172231' strokeWidth='2' />
          </svg>
        </div>
      </div>

      <div className='chart-labels'>
        <span>10:00</span>
        <span>12:00</span>
        <span>14:00</span>
        <span>15:00</span>
        <span>15:30</span>
      </div>

      <div className='chart-stats'>
        <span>Open <b>₹{selectedStockData.open}</b></span>
        <span>High <b>₹{selectedStockData.high}</b></span>
        <span>Low <b>₹{selectedStockData.low}</b></span>
        <span>Prev close <b>₹{selectedStockData.previousClose}</b></span>
      </div>
    </article>
  );
}

export default PriceChart;

import React, { useMemo, useState } from 'react';

const logoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/media/logo.png` : '/media/logo.png';

const initialWatchlist = [
  { symbol: 'NIFTY 50', exchange: 'INDICES', price: '22,487.35', change: '+0.42%', positive: true },
  { symbol: 'SENSEX', exchange: 'INDICES', price: '74,119.39', change: '+0.31%', positive: true },
  { symbol: 'RELIANCE', exchange: 'NSE', price: '2,942.50', change: '-0.18%', positive: false },
  { symbol: 'TCS', exchange: 'NSE', price: '3,842.10', change: '+0.65%', positive: true },
  { symbol: 'INFY', exchange: 'NSE', price: '1,528.75', change: '-0.27%', positive: false },
];

const positions = [
  { symbol: 'HDFCBANK', qty: '12', avg: '1,628.40', ltp: '1,664.20', pnl: '+429.60', positive: true },
  { symbol: 'TATAMOTORS', qty: '25', avg: '947.80', ltp: '932.45', pnl: '-383.75', positive: false },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [selectedStock, setSelectedStock] = useState('RELIANCE');

  const filteredWatchlist = useMemo(
    () =>
      initialWatchlist.filter((item) =>
        item.symbol.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  return (
    <div className='trading-dashboard'>
      <header className='trading-header'>
        <a href='/' className='trading-brand' aria-label='Zerodha home'>
          <img src={logoSrc} alt='Zerodha' />
        </a>
        <nav className='trading-nav' aria-label='Trading navigation'>
          {['Dashboard', 'Orders', 'Holdings', 'Positions', 'Funds'].map((tab) => (
            <button
              type='button'
              className={activeTab === tab ? 'is-active' : ''}
              onClick={() => setActiveTab(tab)}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className='trading-user'>
          <span className='trading-avatar'>VK</span>
          <span>Vivek Kumar</span>
          <button type='button' aria-label='Open profile menu' className='profile-menu'>⌄</button>
        </div>
      </header>

      <main className='trading-main'>
        <div className='dashboard-heading'>
          <div>
            <p className='dashboard-eyebrow'>Overview</p>
            <h1>{activeTab}</h1>
          </div>
          <div className='market-status'><span /> Market open <small>· NSE</small></div>
        </div>

        {activeTab === 'Dashboard' ? (
          <>
            <section className='portfolio-grid' aria-label='Portfolio summary'>
              <article className='portfolio-card portfolio-card--highlight'>
                <p>Equity</p>
                <strong>₹ 1,24,580.25</strong>
                <span className='positive'>+ ₹ 2,840.50 <small>(2.33%)</small></span>
                <div className='mini-chart' aria-hidden='true'><i /><i /><i /><i /><i /><i /><i /></div>
              </article>
              <article className='portfolio-card'>
                <p>Holdings</p>
                <strong>₹ 86,420.00</strong>
                <span className='positive'>+ ₹ 4,128.75 <small>(5.02%)</small></span>
                <div className='portfolio-meta'>Invested <b>₹ 82,291.25</b></div>
              </article>
              <article className='portfolio-card'>
                <p>Available margin</p>
                <strong>₹ 38,160.25</strong>
                <span className='muted'>Available to trade</span>
                <div className='margin-bar'><span /></div>
              </article>
            </section>

            <section className='dashboard-content'>
              <div className='watchlist-panel panel'>
                <div className='panel-heading'>
                  <div><h2>Market watch</h2><span>{filteredWatchlist.length} instruments</span></div>
                  <button type='button' className='icon-button' aria-label='Add instrument'>＋</button>
                </div>
                <label className='watchlist-search'>
                  <span aria-hidden='true'>⌕</span>
                  <input
                    type='search'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='Search instruments'
                    aria-label='Search instruments'
                  />
                </label>
                <div className='watchlist-table'>
                  {filteredWatchlist.map((item) => (
                    <button
                      type='button'
                      className={`watchlist-row${selectedStock === item.symbol ? ' selected' : ''}`}
                      onClick={() => setSelectedStock(item.symbol)}
                      key={item.symbol}
                    >
                      <span><b>{item.symbol}</b><small>{item.exchange}</small></span>
                      <strong>{item.price}</strong>
                      <em className={item.positive ? 'positive' : 'negative'}>{item.change}</em>
                    </button>
                  ))}
                  {!filteredWatchlist.length && <p className='empty-state'>No instruments found.</p>}
                </div>
              </div>

              <div className='dashboard-side'>
                <article className='chart-panel panel'>
                  <div className='panel-heading'>
                    <div><h2>{selectedStock}</h2><span>NSE · 1D</span></div>
                    <strong className='positive'>+0.42%</strong>
                  </div>
                  <div className='price-line'><b>₹ 2,942.50</b><span>As of 3:30 PM</span></div>
                  <div className='chart-timeframes' role='tablist' aria-label='Chart timeframe'>
                    {['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'Max'].map((timeframe, index) => (
                      <button type='button' className={index === 0 ? 'is-active' : ''} key={timeframe}>{timeframe}</button>
                    ))}
                  </div>
                  <div className='market-chart' aria-label={`${selectedStock} price chart`}>
                    <div className='chart-plot'>
                      <div className='chart-y-labels' aria-hidden='true'><span>₹3,000</span><span>₹2,980</span><span>₹2,960</span><span>₹2,940</span><span>₹2,920</span></div>
                      <svg viewBox='0 0 500 150' role='img'>
                      <defs><linearGradient id='chart-fill' x1='0' x2='0' y1='0' y2='1'><stop offset='0%' stopColor='#65c98a' stopOpacity='.2' /><stop offset='100%' stopColor='#65c98a' stopOpacity='0' /></linearGradient></defs>
                      <path className='chart-grid-line' d='M0 18 H500 M0 54 H500 M0 90 H500 M0 126 H500' />
                      <path d='M0 126 C18 124 24 117 42 119 C60 121 67 112 82 114 C98 116 104 100 120 104 C138 109 145 91 161 94 C178 97 186 76 203 82 C220 88 228 68 246 71 C263 74 271 53 289 59 C307 65 316 49 333 53 C351 57 360 38 378 44 C396 50 405 31 422 35 C440 39 452 26 468 30 C481 33 490 22 500 18 V150 H0Z' fill='url(#chart-fill)' />
                      <path className='chart-line' d='M0 126 C18 124 24 117 42 119 C60 121 67 112 82 114 C98 116 104 100 120 104 C138 109 145 91 161 94 C178 97 186 76 203 82 C220 88 228 68 246 71 C263 74 271 53 289 59 C307 65 316 49 333 53 C351 57 360 38 378 44 C396 50 405 31 422 35 C440 39 452 26 468 30 C481 33 490 22 500 18' />
                      <line className='chart-marker' x1='455' y1='0' x2='455' y2='150' />
                      <circle cx='500' cy='18' r='4.5' fill='#65c98a' stroke='#172231' strokeWidth='2' />
                      </svg>
                    </div>
                  </div>
                  <div className='chart-labels'><span>10:00</span><span>12:00</span><span>14:00</span><span>15:00</span><span>15:30</span></div>
                  <div className='chart-stats'><span>Open <b>₹2,933.40</b></span><span>High <b>₹2,989.15</b></span><span>Low <b>₹2,926.60</b></span><span>Prev close <b>₹2,930.60</b></span></div>
                </article>

                <article className='positions-panel panel'>
                  <div className='panel-heading'><div><h2>Open positions</h2><span>Today</span></div><button type='button' className='text-button'>View all</button></div>
                  {positions.map((position) => (
                    <div className='position-row' key={position.symbol}>
                      <span><b>{position.symbol}</b><small>{position.qty} shares · Avg ₹{position.avg}</small></span>
                      <span><b>₹{position.ltp}</b><em className={position.positive ? 'positive' : 'negative'}>{position.pnl}</em></span>
                    </div>
                  ))}
                </article>
              </div>
            </section>
          </>
        ) : (
          <section className='empty-tab panel'>
            <div className='empty-tab-icon'>▦</div>
            <h2>{activeTab}</h2>
            <p>Your {activeTab.toLowerCase()} will appear here. Use the dashboard to monitor your portfolio and markets.</p>
            <button type='button' onClick={() => setActiveTab('Dashboard')} className='primary-button'>Back to dashboard</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;

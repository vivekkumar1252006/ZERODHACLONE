import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import PortfolioSummary from './components/PortfolioSummary';
import MarketWatch from './components/MarketWatch';
import PriceChart from './components/PriceChart';
import OpenPositions from './components/OpenPositions';
import EmptyTabState from './components/EmptyTabState';
import {
  navigationTabs,
  portfolioCards,
  watchlistData,
  positionsData,
  chartTimeframes,
  stockSnapshots,
} from './data';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const filteredWatchlist = useMemo(
    () =>
      watchlistData.filter((item) =>
        item.symbol.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const selectedStockData = stockSnapshots[selectedStock] || stockSnapshots.RELIANCE;

  return (
    <div className='trading-dashboard'>
      <Header
        navTabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => navigate('/login', { replace: true })}
      />

      <main className='trading-main'>
        <div className='dashboard-heading'>
          <div>
            <p className='dashboard-eyebrow'>Overview</p>
            <h1>{activeTab}</h1>
          </div>
          <div className='market-status'>
            <span /> Market open <small>· NSE</small>
          </div>
        </div>

        {activeTab === 'Dashboard' ? (
          <>
            <PortfolioSummary cards={portfolioCards} />

            <section className='dashboard-content'>
              <MarketWatch
                watchlist={filteredWatchlist}
                search={search}
                onSearchChange={setSearch}
                selectedStock={selectedStock}
                onSelectStock={setSelectedStock}
              />

              <div className='dashboard-side'>
                <PriceChart
                  selectedStockData={selectedStockData}
                  timeframes={chartTimeframes}
                  selectedTimeframe={selectedTimeframe}
                  onTimeframeChange={setSelectedTimeframe}
                />
                <OpenPositions positions={positionsData} />
              </div>
            </section>
          </>
        ) : (
          <EmptyTabState activeTab={activeTab} onReturn={() => setActiveTab('Dashboard')} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;

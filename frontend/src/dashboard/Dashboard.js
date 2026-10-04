import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import PortfolioSummary from './components/PortfolioSummary';
import MarketWatch from './components/MarketWatch';
import PriceChart from './components/PriceChart';
import OpenPositions from './components/OpenPositions';
import EmptyTabState from './components/EmptyTabState';
import { apiRequest, AUTH_TOKEN_KEY, ApiError } from '../api';
import {
  navigationTabs,
  watchlistData,
  chartTimeframes,
  stockSnapshots,
} from './data';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestError, setRequestError] = useState('');
  const [saving, setSaving] = useState(false);
  const [newHolding, setNewHolding] = useState({ name: '', qty: '', price: '', avg: '' });

  useEffect(() => {
    let active = true;
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      navigate('/login', { replace: true });
      return () => {
        active = false;
      };
    }

    Promise.all([apiRequest('/api/auth/me'), apiRequest('/api/holdings')])
      .then(([account, accountHoldings]) => {
        if (!active) return;
        setUser(account.user);
        setHoldings(accountHoldings);
      })
      .catch((error) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          sessionStorage.removeItem(AUTH_TOKEN_KEY);
          navigate('/login', { replace: true });
          return;
        }
        setRequestError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleAddHolding(event) {
    event.preventDefault();
    setRequestError('');
    setSaving(true);
    try {
      const holding = await apiRequest('/api/holdings', {
        method: 'POST',
        body: newHolding,
      });
      setHoldings((current) => [holding, ...current]);
      setNewHolding({ name: '', qty: '', price: '', avg: '' });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        navigate('/login', { replace: true });
        return;
      }
      setRequestError(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteHolding(id) {
    setRequestError('');
    try {
      await apiRequest(`/api/holdings/${id}`, { method: 'DELETE' });
      setHoldings((current) => current.filter((holding) => holding._id !== id));
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        navigate('/login', { replace: true });
        return;
      }
      setRequestError(error.message);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/login', { replace: true });
  }

  const filteredWatchlist = useMemo(
    () =>
      watchlistData.filter((item) =>
        item.symbol.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const selectedStockData = stockSnapshots[selectedStock] || stockSnapshots.RELIANCE;
  const totals = holdings.reduce(
    (result, holding) => ({
      current: result.current + holding.qty * holding.price,
      invested: result.invested + holding.qty * holding.avg,
    }),
    { current: 0, invested: 0 }
  );
  const change = totals.current - totals.invested;
  const percent = totals.invested ? (change / totals.invested) * 100 : 0;
  const portfolioCards = [
    {
      label: 'Equity',
      value: currency.format(totals.current),
      change: `${change >= 0 ? '+' : '−'} ${currency.format(Math.abs(change))}`,
      percent: `(${percent.toFixed(2)}%)`,
      positive: change >= 0,
      investedLabel: 'Invested',
      investedValue: currency.format(totals.invested),
      accent: 'highlight',
    },
    {
      label: 'Holdings',
      value: currency.format(totals.current),
      change: `${holdings.length} saved ${holdings.length === 1 ? 'instrument' : 'instruments'}`,
      percent: '',
      positive: null,
      investedLabel: 'Cost basis',
      investedValue: currency.format(totals.invested),
      accent: 'default',
    },
    {
      label: 'Available margin',
      value: '—',
      change: 'Not connected to a broker',
      percent: '',
      positive: null,
      accent: 'default',
    },
  ];
  const positions = holdings.map((holding) => {
    const profitLoss = (holding.price - holding.avg) * holding.qty;
    return {
      id: holding._id,
      symbol: holding.name,
      qty: holding.qty,
      avg: currency.format(holding.avg),
      ltp: currency.format(holding.price),
      pnl: `${profitLoss >= 0 ? '+' : '−'}${currency.format(Math.abs(profitLoss))}`,
      positive: profitLoss >= 0,
    };
  });

  return (
    <div className='trading-dashboard'>
      <Header
        navTabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      <main className='trading-main'>
        {loading ? (
          <p className='dashboard-message' role='status'>Loading your account…</p>
        ) : (
          <>
        <div className='dashboard-heading'>
          <div>
            <p className='dashboard-eyebrow'>Overview</p>
            <h1>{activeTab}</h1>
          </div>
          <div className='market-status'>
            <span /> Simulated market data <small>· Not broker-connected</small>
          </div>
        </div>

        {activeTab === 'Dashboard' ? (
          <>
            <PortfolioSummary cards={portfolioCards} />
            {requestError && <p className='form-error' role='alert'>{requestError}</p>}

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
                <section className='panel holding-form-panel'>
                  <h2>Add a holding</h2>
                  <form className='holding-form' onSubmit={handleAddHolding}>
                    <label>
                      Symbol
                      <input
                        value={newHolding.name}
                        onChange={(event) => setNewHolding({ ...newHolding, name: event.target.value })}
                        maxLength='20'
                        required
                      />
                    </label>
                    <label>
                      Quantity
                      <input
                        type='number'
                        min='0.01'
                        step='any'
                        value={newHolding.qty}
                        onChange={(event) => setNewHolding({ ...newHolding, qty: event.target.value })}
                        required
                      />
                    </label>
                    <label>
                      Current price (₹)
                      <input
                        type='number'
                        min='0'
                        step='any'
                        value={newHolding.price}
                        onChange={(event) => setNewHolding({ ...newHolding, price: event.target.value })}
                        required
                      />
                    </label>
                    <label>
                      Average price (₹)
                      <input
                        type='number'
                        min='0'
                        step='any'
                        value={newHolding.avg}
                        onChange={(event) => setNewHolding({ ...newHolding, avg: event.target.value })}
                        required
                      />
                    </label>
                    <button type='submit' className='primary-button' disabled={saving}>
                      {saving ? 'Saving…' : 'Save holding'}
                    </button>
                  </form>
                </section>
                <OpenPositions positions={positions} onDelete={handleDeleteHolding} />
              </div>
            </section>
          </>
        ) : (
          <EmptyTabState activeTab={activeTab} onReturn={() => setActiveTab('Dashboard')} />
        )}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;

import React from 'react';

function MarketWatch({ watchlist, search, onSearchChange, selectedStock, onSelectStock }) {
  return (
    <div className='watchlist-panel panel'>
      <div className='panel-heading'>
        <div>
          <h2>Market watch</h2>
          <span>{watchlist.length} instruments</span>
        </div>
        <button type='button' className='icon-button' aria-label='Add instrument'>＋</button>
      </div>

      <label className='watchlist-search'>
        <span aria-hidden='true'>⌕</span>
        <input
          type='search'
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder='Search instruments'
          aria-label='Search instruments'
        />
      </label>

      <div className='watchlist-table'>
        {watchlist.map((item) => (
          <button
            type='button'
            className={`watchlist-row${selectedStock === item.symbol ? ' selected' : ''}`}
            onClick={() => onSelectStock(item.symbol)}
            key={item.symbol}
          >
            <span>
              <b>{item.symbol}</b>
              <small>{item.exchange}</small>
            </span>
            <strong>{item.price}</strong>
            <em className={item.positive ? 'positive' : 'negative'}>{item.change}</em>
          </button>
        ))}

        {!watchlist.length && <p className='empty-state'>No instruments found.</p>}
      </div>
    </div>
  );
}

export default MarketWatch;

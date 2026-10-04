import React from 'react';

function OpenPositions({ positions }) {
  return (
    <article className='positions-panel panel'>
      <div className='panel-heading'>
        <div>
          <h2>Open positions</h2>
          <span>Today</span>
        </div>
        <button type='button' className='text-button'>View all</button>
      </div>

      {positions.map((position) => (
        <div className='position-row' key={position.symbol}>
          <span>
            <b>{position.symbol}</b>
            <small>{position.qty} shares · Avg ₹{position.avg}</small>
          </span>
          <span>
            <b>₹{position.ltp}</b>
            <em className={position.positive ? 'positive' : 'negative'}>{position.pnl}</em>
          </span>
        </div>
      ))}
    </article>
  );
}

export default OpenPositions;

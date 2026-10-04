import React from 'react';

function OpenPositions({ positions, onDelete }) {
  return (
    <article className='positions-panel panel'>
      <div className='panel-heading'>
        <div>
          <h2>Holdings</h2>
          <span>{positions.length} saved</span>
        </div>
      </div>

      {!positions.length && <p className='empty-state'>No holdings saved yet. Add one to start tracking your portfolio.</p>}
      {positions.map((position) => (
        <div className='position-row' key={position.id}>
          <span>
            <b>{position.symbol}</b>
            <small>{position.qty} shares · Avg {position.avg}</small>
          </span>
          <span>
            <b>{position.ltp}</b>
            <em className={position.positive ? 'positive' : 'negative'}>{position.pnl}</em>
          </span>
          <button
            type='button'
            className='holding-delete'
            onClick={() => onDelete(position.id)}
            aria-label={`Remove ${position.symbol}`}
          >
            Remove
          </button>
        </div>
      ))}
    </article>
  );
}

export default OpenPositions;

import React from 'react';

function PortfolioSummary({ cards }) {
  return (
    <section className='portfolio-grid' aria-label='Portfolio summary'>
      {cards.map((card) => (
        <article
          className={`portfolio-card${card.accent === 'highlight' ? ' portfolio-card--highlight' : ''}`}
          key={card.label}
        >
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          {card.positive !== null && (
            <span className={card.positive ? 'positive' : 'negative'}>
              {card.change} <small>{card.percent}</small>
            </span>
          )}
          {card.positive === null && <span className='muted'>{card.change}</span>}

          {card.investedValue && (
            <div className='portfolio-meta'>
              <span>{card.investedLabel}</span>
              <b>{card.investedValue}</b>
            </div>
          )}

        </article>
      ))}
    </section>
  );
}

export default PortfolioSummary;

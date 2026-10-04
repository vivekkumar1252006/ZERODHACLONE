import React from 'react';
import Navbar from '../support/Navbar';
import Footer from '../../footer';

const charges = [
  {
    title: 'Equity delivery',
    brokerage: '₹0',
    detail: 'Free investing in stocks for delivery.',
  },
  {
    title: 'Intraday trading',
    brokerage: '₹20 or 0.03%',
    detail: 'Per executed order, whichever is lower.',
  },
  {
    title: 'Futures and options',
    brokerage: '₹20',
    detail: 'Flat charge per executed order.',
  },
];

const additionalCharges = [
  ['Account opening', 'Free for resident individual accounts'],
  ['AMC', 'Free for the first year; applicable charges thereafter'],
  ['Call and trade', '₹50 per executed order through a dealer'],
  ['DP charges', 'Applicable when shares are sold from your demat account'],
];

function Pricing() {
  return (
    <>
      <Navbar />
      <main className='pricing-page'>
        <section className='pricing-hero'>
          <div className='container'>
            <img
              src='/media/homehero.png'
              alt='Zerodha investing and trading platform'
              className='pricing-hero-image'
            />
            <span className='section-kicker'>Simple. Transparent. Fair.</span>
            <h1>Pricing</h1>
            <p>
              We believe investing should be simple and affordable. Here is a clear
              breakdown of what you pay when you invest or trade with us.
            </p>
          </div>
        </section>

      <section className='pricing-rate-section'>
        <div className='container'>
          <div className='pricing-rate-grid'>
            {charges.map((charge) => (
              <article className='pricing-rate-card' key={charge.title}>
                <div className='pricing-rate-card__icon' aria-hidden='true'>₹</div>
                <h2>{charge.title}</h2>
                <strong>{charge.brokerage}</strong>
                <p>{charge.detail}</p>
              </article>
            ))}
          </div>
          <p className='pricing-note'>
            All statutory taxes and exchange charges are applied as per the applicable
            regulations. There are no hidden platform or subscription fees.
          </p>
        </div>
      </section>

      <section className='pricing-details-section'>
        <div className='container pricing-details-layout'>
          <div className='pricing-details-copy'>
            <span className='section-kicker'>Know what you pay</span>
            <h2>Other charges</h2>
            <p>
              A few charges are collected by exchanges, regulators, or depositories.
              We show them clearly so you always know the complete cost of a trade.
            </p>
            <a href='/Signup' className='pricing-action'>
              Open an account <i className='fa fa-long-arrow-right' aria-hidden='true' />
            </a>
          </div>

          <div className='pricing-table-wrap'>
            <table className='pricing-table'>
              <thead>
                <tr>
                  <th>Charge</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {additionalCharges.map(([name, detail]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className='pricing-bottom-cta'>
        <div className='container'>
          <h2>Invest in yourself</h2>
          <p>Start your investing journey with a simple, transparent pricing model.</p>
          <a href='/Signup' className='hero-cta'>Sign up now</a>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Pricing;

import React from 'react';
import { appPath, mediaPath } from '../../paths';

function Stats() {
  return (
    <section className='landing-section'>
      <div className='container info-layout'>
        <div className='info-panel'>
          <h1>Trust with confidence</h1>
          <h2>Customer-first always</h2>
          <p>
            That&apos;s why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2>No spam or gimmicks</h2>
          <p>
            No gimmicks, spam, or annoying push notifications. High-quality apps that
            you use at your pace, the way you like.
          </p>
          <h2>The Zerodha universe</h2>
          <p>
            Not just a broker app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2>Do better with money</h2>
          <p>
            With initiatives like Nudge and Kill Switch, we don&apos;t just facilitate
            transactions; we help you make better financial decisions and protect your
            hard-earned money.
          </p>
        </div>

        <div className='info-visual'>
          <img
            src={mediaPath('home-trust-universe.jpeg')}
            alt='Zerodha trust and support'
            className='img-fluid'
          />
          <div className='info-links'>
            <a href={appPath('/product')} className='info-link'>
              Explore our products <i className='fa fa-long-arrow-right' aria-hidden='true' />
            </a>
            <a href={appPath('/product')} className='info-link'>
              Try Kite demo <i className='fa fa-long-arrow-right' aria-hidden='true' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
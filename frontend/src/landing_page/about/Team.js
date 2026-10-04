import React from 'react';
import { mediaPath } from '../../paths';

function Team() {
  return (
    <section className='landing-section'>
      <div className='container info-layout'>
        <div style={{ width: 'min(100%, 340px)', transform: 'translateX(-28px)' }}>
          <img
            src={mediaPath('about-founder.jpeg')}
            alt='Nithin Kamath, founder of Zerodha'
            className='img-fluid'
            style={{
              maxWidth: '340px',
              display: 'block',
              margin: '0 auto',
              borderRadius: '50%',
            }}
          />
          <p
            style={{
              margin: '16px 0 0',
              color: 'var(--zerodha-muted)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
            }}
          >
            <span
              style={{
                display: 'block',
                color: 'var(--zerodha-text)',
                fontSize: '0.95rem',
                letterSpacing: '0.04em',
              }}
            >
              Nithin Kamath
            </span>
            <span style={{ display: 'block', marginTop: '4px' }}>
              Founder, CEO
            </span>
          </p>
        </div>

        <div className='info-panel'>
          <p
            style={{
              marginBottom: '12px',
              color: 'var(--zerodha-green)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.8rem',
            }}
          >
            Meet the founder
          </p>
          <h1>Nithin Kamath</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--zerodha-text)' }}>
            Founder &amp; CEO, Zerodha
          </p>
          <p>
            Nithin Kamath built Zerodha with a simple belief: investing should be
            clear, affordable, and accessible to everyone. His vision continues
            to shape a new generation of investors in India.
          </p>
          <p>
            By putting customers first and keeping things transparent, Zerodha
            is making wealth creation feel simpler for millions of Indians.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Team;
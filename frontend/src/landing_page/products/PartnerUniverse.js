import React from 'react';

const partnerPlatforms = [
  {
    imageUrl: '/media/partner-sensibull.jpeg',
    imageAlt: 'Sensibull',
  },
  {
    imageUrl: '/media/partner-fund-house.jpeg',
    imageAlt: 'Zerodha Fund House',
  },
  {
    imageUrl: '/media/partner-goldenpi.jpeg',
    imageAlt: 'GoldenPi',
  },
  {
    imageUrl: '/media/partner-streak.jpeg',
    imageAlt: 'Streak',
  },
  {
    imageUrl: '/media/partner-smallcase.jpeg',
    imageAlt: 'smallcase',
  },
  {
    imageUrl: '/media/partner-ditto.jpeg',
    imageAlt: 'Ditto',
  },
];

function PartnerUniverse() {
  return (
    <section className='landing-section universe-section'>
      <div className='container'>
        <h1 className='universe-title'>The Zerodha universe</h1>
        <p className='universe-description'>
          Extend your trading and investments experience even further with our
          partner platforms.
        </p>
        <div className='universe-platforms'>
          {partnerPlatforms.map((platform) => (
            <div className='universe-platform' key={platform.imageUrl}>
              <img src={platform.imageUrl} alt={platform.imageAlt} className='universe-platform__image' />
            </div>
          ))}
        </div>
        <a href='/Signup' className='universe-signup'>
          Sign up now
        </a>
      </div>
    </section>
  );
}

export default PartnerUniverse;

import React from 'react';
import { appPath, mediaPath } from '../../paths';

const partnerPlatforms = [
  {
    imageUrl: mediaPath('partner-sensibull.jpeg'),
    imageAlt: 'Sensibull',
  },
  {
    imageUrl: mediaPath('partner-fund-house.jpeg'),
    imageAlt: 'Zerodha Fund House',
  },
  {
    imageUrl: mediaPath('partner-goldenpi.jpeg'),
    imageAlt: 'GoldenPi',
  },
  {
    imageUrl: mediaPath('partner-streak.jpeg'),
    imageAlt: 'Streak',
  },
  {
    imageUrl: mediaPath('partner-smallcase.jpeg'),
    imageAlt: 'smallcase',
  },
  {
    imageUrl: mediaPath('partner-ditto.jpeg'),
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
        <a href={appPath('/Signup')} className='universe-signup'>
          Sign up now
        </a>
      </div>
    </section>
  );
}

export default PartnerUniverse;

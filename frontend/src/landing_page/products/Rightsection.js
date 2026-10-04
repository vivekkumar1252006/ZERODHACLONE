import React from 'react';
import { appPath, mediaPath } from '../../paths';

function RightSection({
  imageUrl = mediaPath('product-coin.jpeg'),
  imageAlt = 'Product feature illustration',
  title = 'Built for everyday investors',
  description = 'Simple tools, transparent pricing, and a frictionless experience help you stay focused on the long-term plan.',
  actionLabel = 'Explore more',
  actionLink = '#',
}) {
  return (
    <section className='landing-section product-right-section'>
      <div className='container education-layout'>
        <div className='education-copy'>
          <h1>{title}</h1>
          <p>{description}</p>
          <a href={appPath(actionLink)} className='info-link'>
            {actionLabel} <i className='fa fa-long-arrow-right' aria-hidden='true' />
          </a>
        </div>

        <div className='info-visual'>
          <img src={imageUrl} alt={imageAlt} className='img-fluid' />
        </div>
      </div>
    </section>
  );
}

export default RightSection;

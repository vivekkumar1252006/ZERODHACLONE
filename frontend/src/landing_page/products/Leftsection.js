import React from 'react';

function LeftSection({
  imageUrl = '/media/product-feature.jpeg',
  imageAlt = 'Product feature illustration',
  title = 'Trade smarter with clarity',
  description = 'Access a sharper way to manage your investments with a platform designed for speed, precision, and confidence.',
  actionLabel = 'Learn more',
  actionLink = '#',
  children,
}) {
  return (
    <section className='landing-section'>
      <div className='container education-layout'>
        <div className='info-visual'>
          <img src={imageUrl} alt={imageAlt} className='img-fluid' />
        </div>

        <div className='education-copy'>
          <h1>{title}</h1>
          <p>{description}</p>
          <a href={actionLink} className='info-link'>
            {actionLabel} <i className='fa fa-long-arrow-right' aria-hidden='true' />
          </a>
          {children}
        </div>
      </div>
    </section>
  );
}

export default LeftSection;

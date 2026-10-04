import React from 'react';
import { mediaPath } from '../../paths';

function LeftImage({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googleplay,
  appstore,
}) {
  return (
    <div className='container product-showcase'>
      <div className='row product-layout align-items-center'>
        <div className='col-md-6 product-media order-1'>
          <img src={imageUrl} alt={productName} className='img-fluid product-image' />
        </div>

        <div className='col-md-6 product-copy order-2'>
          <p className='product-kicker'>Trading platform</p>
          <h2>{productName}</h2>
          <p>{productDescription}</p>

          <div className='product-actions' role='group' aria-label='Kite actions'>
            <button type='button' className='product-button product-button--primary'>
              {tryDemo}
            </button>
            <button type='button' className='product-button product-button--secondary'>
              {learnMore}
            </button>
          </div>

          <div className='store-actions'>
            <a href={googleplay} className='store-button store-button--badge' target='_blank' rel='noreferrer'>
              <img src={mediaPath('google-play-badge.png')} alt='Get it on Google Play' className='store-badge' />
            </a>
            <a href={appstore} className='store-button store-button--badge' target='_blank' rel='noreferrer'>
              <img src={mediaPath('app-store-badge.png')} alt='Download on the App Store' className='store-badge' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImage;
import React from 'react';
import LeftSection from '../products/Leftsection';

function Education() {
  return (
    <LeftSection
      imageUrl='/media/home-education-varsity.jpeg'
      imageAlt='Education'
      title='Free and open market education'
      description='Varsity is the largest online stock market education book in the world, covering everything from the basics to advanced trading.'
      actionLabel='Varsity'
      actionLink='/Education'
    >
      <p className='mt-4'>
        TradingQ&amp;A is the most active trading and investment community in India
        for all your market-related queries.
      </p>
      <a href='/support' className='info-link'>
        TradingQ&amp;A <i className='fa fa-long-arrow-right' aria-hidden='true' />
      </a>
    </LeftSection>
  );
}

export default Education;
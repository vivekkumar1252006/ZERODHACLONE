import React from 'react';
import Hero from './Hero';
import LeftImage from './leftimage';
import RightSection from './Rightsection';
import PartnerUniverse from './PartnerUniverse';
import Navbar from '../support/Navbar';
import Footer from '../../footer';

function Product() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LeftImage
          imageUrl='/media/product-showcase.png'
          productName='Kite'
          productDescription='Trade stocks for delivery or intraday on over 5000 stocks listed on NSE and BSE.'
          tryDemo='Try demo'
          learnMore='Learn more'
          googleplay='https://play.google.com/store/apps/details?id=com.zerodha.kite3'
          appstore='https://apps.apple.com/in/app/kite-trading-platform/id1234'
        />

        <RightSection
          imageUrl='/media/product-console.jpeg'
          imageAlt='Console trading dashboard'
          title='Console'
          description='The central dashboard for your Zerodha account. Gain insights into your investments with in-depth reports and visualizations.'
          actionLabel='Learn more'
          actionLink='#'
        />

        <RightSection
          imageUrl='/media/product-coin.jpeg'
          imageAlt='Coin mutual fund experience'
          title='Coin'
          description='Zero-commission investing with a diversified set of mutual funds and a simpler experience for long-term wealth building.'
          actionLabel='Explore more'
          actionLink='#'
        />
        <PartnerUniverse />
      </main>
      <Footer />
    </>
  );
}

export default Product;

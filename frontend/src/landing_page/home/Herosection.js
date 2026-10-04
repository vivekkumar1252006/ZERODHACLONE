import React from 'react';

function Hero() {
  return (
    <section className='landing-section hero-section'>
      <div className='container'>
        <div className='row'>
          <img src='/media/homehero.png' alt='HomeHero' className='hero-image' />
          <h1 className='hero-title'>Invest in everything</h1>
          <p className='hero-subtitle'>
            Online platform to invest in stocks, derivatives, mutual funds, and more.
          </p>
          <a href='/Signup' className='hero-cta'>Sign up Now</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
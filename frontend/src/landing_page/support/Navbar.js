import React from 'react';

const logoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/media/logo.png` : '/media/logo.png';

function Navbar({ variant }) {
  return (
    <nav className={`top-nav${variant ? ` top-nav--${variant}` : ''}`}>
      <div className='container top-nav__inner'>
        <a href='/' aria-label='Zerodha home'>
          <img src={logoSrc} alt='Zerodha Logo' className='navbar-logo' />
        </a>
        <div className='top-nav__links'>
          <a href='/Signup'>Sign up</a>
          <a href='/About'>About</a>
          <a href='/product'>Products</a>
          <a href='/pricing'>Pricing</a>
          <a href='/support'>Support</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
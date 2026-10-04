import React from 'react';
import { appPath, mediaPath } from '../../paths';

function Navbar({ variant }) {
  return (
    <nav className={`top-nav${variant ? ` top-nav--${variant}` : ''}`}>
      <div className='container top-nav__inner'>
        <a href={appPath('/')} aria-label='Zerodha home'>
          <img src={mediaPath('logo.png')} alt='Zerodha Logo' className='navbar-logo' />
        </a>
        <div className='top-nav__links'>
          <a href={appPath('/Signup')}>Sign up</a>
          <a href={appPath('/About')}>About</a>
          <a href={appPath('/product')}>Products</a>
          <a href={appPath('/pricing')}>Pricing</a>
          <a href={appPath('/support')}>Support</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
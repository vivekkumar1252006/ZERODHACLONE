import React from 'react';
import { appPath, mediaPath } from '../../paths';

function Header({ navTabs, activeTab, onTabChange, user, onLogout }) {
  return (
    <header className='trading-header'>
      <a href={appPath('/')} className='trading-brand' aria-label='Zerodha home'>
        <img src={mediaPath('logo.png')} alt='Zerodha' />
      </a>

      <nav className='trading-nav' aria-label='Trading navigation'>
        {navTabs.map((tab) => (
          <button
            type='button'
            className={activeTab === tab ? 'is-active' : ''}
            onClick={() => onTabChange(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className='trading-user'>
        <span className='trading-avatar'>{user?.email?.slice(0, 2).toUpperCase() || 'U'}</span>
        <span>{user?.email || 'Account'}</span>
        <button type='button' className='logout-button' onClick={onLogout}>Log out</button>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';

const logoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/media/logo.png` : '/media/logo.png';

function Header({ navTabs, activeTab, onTabChange }) {
  return (
    <header className='trading-header'>
      <a href='/' className='trading-brand' aria-label='Zerodha home'>
        <img src={logoSrc} alt='Zerodha' />
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
        <span className='trading-avatar'>VK</span>
        <span>Vivek Kumar</span>
        <button type='button' aria-label='Open profile menu' className='profile-menu'>⌄</button>
      </div>
    </header>
  );
}

export default Header;

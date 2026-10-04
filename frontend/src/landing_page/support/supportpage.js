import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../../footer';
import { appPath } from '../../paths';

const categories = [
  {
    icon: 'fa-user-circle-o',
    title: 'Account opening',
    description: 'Opening an account, KYC, documents, and login help.',
    links: ['How do I open an account?', 'Account opening charges'],
  },
  {
    icon: 'fa-line-chart',
    title: 'Trading and markets',
    description: 'Orders, positions, margins, and trading queries.',
    links: ['How do I place an order?', 'Why was my order rejected?'],
  },
  {
    icon: 'fa-inr',
    title: 'Funds and withdrawals',
    description: 'Add money, withdraw funds, and check settlements.',
    links: ['How do I add funds?', 'How do I withdraw funds?'],
  },
  {
    icon: 'fa-bar-chart',
    title: 'Console and reports',
    description: 'Statements, reports, holdings, and your portfolio.',
    links: ['Where can I view my reports?', 'How do I download a statement?'],
  },
  {
    icon: 'fa-mobile',
    title: 'Kite mobile app',
    description: 'Use Kite on web, mobile, and other devices.',
    links: ['Kite login help', 'How do I create a watchlist?'],
  },
  {
    icon: 'fa-question-circle-o',
    title: 'General queries',
    description: 'Charges, security, and other common questions.',
    links: ['Charges and pricing', 'How do I contact support?'],
  },
];

function Support() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = categories.filter((category) => (
    !normalizedQuery
    || `${category.title} ${category.description} ${category.links.join(' ')}`
      .toLowerCase()
      .includes(normalizedQuery)
  ));

  return (
    <>
      <Navbar />
      <main className='support-page'>
        <section className='support-hero'>
          <div className='container'>
            <div className='support-hero__copy'>
              <h1>How can we help you?</h1>
              <p>Search for answers to your questions.</p>
              <label className='support-search'>
                <i className='fa fa-search' aria-hidden='true' />
                <span className='sr-only'>Search support articles</span>
                <input
                  type='search'
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder='Search for articles, topics, or questions'
                />
              </label>
            </div>
          </div>
        </section>

        <section className='support-content'>
          <div className='container'>
            <div className='support-heading'>
              <h2>Explore our help topics</h2>
            </div>

            <div className='support-grid'>
              {visibleCategories.map((category) => (
                <article className='support-card' key={category.title}>
                  <div className='support-card__icon'><i className={`fa ${category.icon}`} aria-hidden='true' /></div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <ul>
                    {category.links.map((link) => <li key={link}><a href={appPath('/support')}>{link}</a></li>)}
                  </ul>
                </article>
              ))}
            </div>

            {visibleCategories.length === 0 && (
              <p className='support-empty'>No articles found. Try a different search term.</p>
            )}

            <div className='support-contact'>
              <div>
                <h2>Can&apos;t find what you&apos;re looking for?</h2>
                <p>Raise a ticket and our support team will help you.</p>
              </div>
              <a href={appPath('/support')} className='support-button'>Create a ticket</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Support;

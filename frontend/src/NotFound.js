import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className='not-found-page'>
      <div className='container not-found-box'>
        <p className='not-found-eyebrow'>404</p>
        <h1>Page not found</h1>
        <p className='not-found-text'>
          The page you are looking for doesn't exist or may have moved.
        </p>
        <div className='not-found-actions'>
          <Link to='/' className='not-found-btn primary'>Go to home</Link>
          <Link to='/support' className='not-found-btn secondary'>Contact support</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;

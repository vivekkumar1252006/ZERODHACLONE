import React from 'react';

function Awards() {
  return (
    <section className='landing-section'>
      <div className='container awards-layout'>
        <div className='award-visual'>
          <img
            src='/media/home-awards-trophy.jpeg'
            alt='Zerodha awards'
            className='img-fluid'
          />
        </div>

        <div className='section-copy'>
          <h1>Largest stock broker in india</h1>
          <p>
            2+ million Zerodha clients contribute to over 15% of all retail order
            volumes in India daily by trading and investing in:
          </p>

          <div className='row text-start'>
            <div className='col-6'>
              <ul className='feature-list'>
                <li>
                  <p>Futures and options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className='col-6'>
              <ul className='feature-list'>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. security</p>
                </li>
              </ul>
            </div>
          </div>

          <img
            src='/media/home-awards-press.jpeg'
            alt='Zerodha awards'
            className='img-fluid mt-3'
          />
        </div>
      </div>
    </section>
  );
}

export default Awards;
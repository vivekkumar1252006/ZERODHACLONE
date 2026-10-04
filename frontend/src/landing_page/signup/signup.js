import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../support/Navbar';
import Footer from '../../footer';

function Signup() {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <>
      <Navbar variant='signup' />
      <main className='signup-page'>
        <section className='signup-section'>
          <div className='signup-video' aria-hidden='true'>
            <video autoPlay loop muted playsInline poster='/media/trading-hero.png'>
              <source src='/media/trading-side.mp4' type='video/mp4' />
            </video>
          </div>
          <div className='container signup-layout'>
            <div className='signup-form-panel'>
              <h2>Sign up with your mobile number</h2>
              <p>We will send you an OTP to verify your number.</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor='mobile'>Mobile number</label>
                <div className='mobile-input'>
                  <span>+91</span>
                  <input
                    id='mobile'
                    name='mobile'
                    type='tel'
                    inputMode='numeric'
                    pattern='[0-9]{10}'
                    maxLength='10'
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value.replace(/\D/g, ''))}
                    placeholder='Enter 10-digit mobile number'
                  />
                </div>
                <label htmlFor='email'>Email address</label>
                <input
                  className='signup-email-input'
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder='Enter your email address'
                />
                <button type='submit' className='signup-submit'>Continue</button>
              </form>
              <p className='signup-terms'>
                By continuing, you agree to Zerodha&apos;s <a href='/support'>terms and policies</a>.
              </p>
            </div>
          </div>
        </section>

        <section className='signup-video-showcase' aria-label='Trading platform preview'>
          <video autoPlay loop muted playsInline poster='/media/trading-hero.png'>
            <source src='/media/trading-side.mp4' type='video/mp4' />
          </video>
          <div className='signup-video-showcase__overlay'>
            <div className='container'>
              <div className='signup-video-copy'>
                <span className='section-kicker'>Invest points</span>
                <h2>Make every market move count.</h2>
                <p>Everything you need to invest with confidence.</p>
                <ul>
                  <li><i className='fa fa-check' aria-hidden='true' /> Track markets in real time</li>
                  <li><i className='fa fa-check' aria-hidden='true' /> Build a diversified portfolio</li>
                  <li><i className='fa fa-check' aria-hidden='true' /> Invest with transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className='signup-trust'>
          <div className='container'>
            <h2>Trusted by investors across India</h2>
            <p>Everything you need to build your investing journey, in one place.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Signup;

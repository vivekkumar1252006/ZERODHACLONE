import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../support/Navbar';
import Footer from '../../footer';
import { appPath, mediaPath } from '../../paths';
import { apiRequest, AUTH_TOKEN_KEY } from '../../api';

function Signup() {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: { mobile, email, password },
      });
      sessionStorage.setItem(AUTH_TOKEN_KEY, result.token);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar variant='signup' />
      <main className='signup-page'>
        <section className='signup-section'>
          <div className='signup-video' aria-hidden='true'>
            <video autoPlay loop muted playsInline poster={mediaPath('trading-hero.png')}>
              <source src={mediaPath('trading-side.mp4')} type='video/mp4' />
            </video>
          </div>
          <div className='container signup-layout'>
            <div className='signup-form-panel'>
              <h2>Create your account</h2>
              <p>Enter your details to securely create an account.</p>
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
                    required
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
                  autoComplete='email'
                  required
                />
                <label htmlFor='signup-password'>Password</label>
                <input
                  className='signup-email-input'
                  id='signup-password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  minLength='8'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder='At least 8 characters'
                  required
                />
                <label htmlFor='signup-confirm-password'>Confirm password</label>
                <input
                  className='signup-email-input'
                  id='signup-confirm-password'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  minLength='8'
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder='Re-enter your password'
                  required
                />
                {error && <p className='form-error' role='alert'>{error}</p>}
                <button type='submit' className='signup-submit' disabled={submitting}>
                  {submitting ? 'Creating account…' : 'Continue'}
                </button>
              </form>
              <p className='signup-terms'>
                By continuing, you agree to Zerodha&apos;s <a href={appPath('/support')}>terms and policies</a>.
              </p>
            </div>
          </div>
        </section>

        <section className='signup-video-showcase' aria-label='Trading platform preview'>
          <video autoPlay loop muted playsInline poster={mediaPath('trading-hero.png')}>
            <source src={mediaPath('trading-side.mp4')} type='video/mp4' />
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

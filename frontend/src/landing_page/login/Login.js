import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../support/Navbar';
import { appPath, mediaPath } from '../../paths';
import { apiRequest, AUTH_TOKEN_KEY } from '../../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const result = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password },
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
      <Navbar variant='login' />
      <main className='login-page'>
        <div className='login-background-video' aria-hidden='true'>
          <video autoPlay loop muted playsInline poster={mediaPath('trading-hero.png')}>
            <source src={mediaPath('trading-side.mp4')} type='video/mp4' />
          </video>
        </div>
        <section className='login-card' aria-labelledby='login-title'>
          <div className='login-form-panel'>
            <span className='login-form-panel__eyebrow'>WELCOME BACK</span>
            <h2 id='login-title'>Log in to your account</h2>
            <p className='login-form-panel__description'>Enter your details to continue to your dashboard.</p>

            <form className='login-form' onSubmit={handleSubmit}>
              <label htmlFor='login-email'>Email address</label>
              <input
                id='login-email'
                name='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='Enter your email address'
                required
              />

              <label htmlFor='login-password'>Password</label>
              <div className='login-password-field'>
                <input
                  id='login-password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder='Enter your password'
                  required
                />
                <button
                  className='login-password-toggle'
                  type='button'
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <a className='login-forgot-link' href={appPath('/support')}>Forgot password?</a>
              {error && <p className='form-error' role='alert'>{error}</p>}
              <button className='login-submit' type='submit' disabled={submitting}>
                {submitting ? 'Signing in…' : 'Continue'}
              </button>
            </form>

            <p className='login-demo-note'>
              Your account is securely verified before opening the dashboard.
            </p>
            <p className='login-signup-link'>
              New to investing? <a href={appPath('/Signup')}>Create an account</a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;

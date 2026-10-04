import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../support/Navbar';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <>
      <Navbar variant='login' />
      <main className='login-page'>
        <div className='login-background-video' aria-hidden='true'>
          <video autoPlay loop muted playsInline poster='/media/trading-hero.png'>
            <source src='/media/trading-side.mp4' type='video/mp4' />
          </video>
        </div>
        <section className='login-card' aria-labelledby='login-title'>
          <div className='login-form-panel'>
            <span className='login-form-panel__eyebrow'>WELCOME BACK</span>
            <h2 id='login-title'>Log in to your account</h2>
            <p className='login-form-panel__description'>Enter your details to continue to your dashboard.</p>

            <form className='login-form' onSubmit={handleSubmit}>
              <label htmlFor='login-user-id'>User ID</label>
              <input
                id='login-user-id'
                name='userId'
                type='text'
                autoComplete='username'
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder='Enter your user ID'
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

              <a className='login-forgot-link' href='/support'>Forgot password?</a>
              <button className='login-submit' type='submit'>Continue</button>
            </form>

            <p className='login-demo-note'>
              Demo access: click Continue to open the dashboard. Credentials are not checked or stored.
            </p>
            <p className='login-signup-link'>
              New to investing? <a href='/Signup'>Create an account</a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;

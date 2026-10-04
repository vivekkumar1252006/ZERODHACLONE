import React from 'react';

const logoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/media/logo.png` : '/media/logo.png';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container footer-inner'>
        <div className='footer-column footer-brand'>
          <img src={logoSrc} alt='Zerodha Logo' className='footer-small-logo' />
          <p>© 2010 - 2024, Not Zerodha Broking Ltd.</p>
          <p>All rights reserved.</p>
          <div className='footer-socials'>
            <a href='https://x.com' target='_blank' rel='noreferrer' aria-label='Twitter'><i className='fa fa-twitter' /></a>
            <a href='https://www.facebook.com' target='_blank' rel='noreferrer' aria-label='Facebook'><i className='fa fa-facebook-official' /></a>
            <a href='https://www.instagram.com' target='_blank' rel='noreferrer' aria-label='Instagram'><i className='fa fa-instagram' /></a>
            <a href='https://www.linkedin.com' target='_blank' rel='noreferrer' aria-label='LinkedIn'><i className='fa fa-linkedin' /></a>
            <a href='https://web.telegram.org' target='_blank' rel='noreferrer' aria-label='Telegram'><i className='fa fa-telegram' /></a>
          </div>
        </div>

        <div className='footer-column'>
          <h3>Company</h3>
          <a href='/About'>About</a>
          <a href='/product'>Products</a>
          <a href='/pricing'>Pricing</a>
          <a href='/support'>Referral programme</a>
          <a href='/support'>Careers</a>
          <a href='/'>Zerodha.tech</a>
          <a href='/'>Press &amp; media</a>
          <a href='/'>Zerodha cares (CSR)</a>
        </div>

        <div className='footer-column'>
          <h3>Support</h3>
          <a href='/support'>Contact</a>
          <a href='/support'>Support portal</a>
          <a href='/'>Z-Connect blog</a>
          <a href='/'>List of charges</a>
          <a href='/'>Downloads &amp; resources</a>
        </div>

        <div className='footer-column'>
          <h3>Quick links</h3>
          <a href='/Signup'>Open an account</a>
          <a href='/support'>Fund transfer</a>
          <a href='/pricing'>60 day challenge</a>
        </div>
      </div>

      <div className='footer-disclaimer'>
        <p>
          Zerodha Broking Ltd.: Member of NSE &amp; BSE – SEBI Registration no.:
          INZ000316333 CDSL: Depository services through Zerodha Securities Pvt. Ltd.
          – SEBI Registration no.: IN-DP-257-2016. MCX: 46025 – SEBI Registration
          no.: INZ0000382338 Registered Address: Zerodha Broking Ltd., #153/154,
          4th Cross, Dollars Colony, Opp. Clarence Public School, J.P. Nagar 4th
          Phase, Bengaluru - 560078, Karnataka, India.
        </p>
        <p>
          Procedure to file a complaint on SEBI SCORES: Register on SCORES portal.
          Mandatory details for filing complaints on SCORES: Name, PAN, Address,
          Mobile Number, E-mail ID. Benefits: Effective communication, Speedy
          redressal of the grievances.
        </p>
        <p>
          Investments in securities market are subject to market risks; read all the
          related documents carefully before investing.
        </p>
        <p>
          “Prevent unauthorised transactions in your account. Update your mobile
          numbers/email IDs with your stock brokers. Receive information of your
          transactions directly from Exchange on your mobile/email at the end of the
          day. Issued in the interest of investors. KYC is one time exercise when
          dealing in securities markets - once KYC is done through a SEBI registered
          intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same
          process again with another intermediary. As a business, Zerodha does not
          give stock tips and recommendations, and has not authorised anyone to trade
          on behalf of others. If you find anyone claiming to be part of Zerodha and
          offering such services, please create a ticket here.”
        </p>
        <div className='footer-legal-links'>
          <a href='/'>NSE</a>
          <a href='/'>BSE</a>
          <a href='/'>MCX</a>
          <a href='/'>Terms &amp; conditions</a>
          <a href='/'>Policies &amp; procedures</a>
          <a href='/'>Privacy policy</a>
          <a href='/'>Disclosure</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
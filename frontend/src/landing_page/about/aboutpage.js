import React from 'react';
import Navbar from '../support/Navbar';
import Footer from '../../footer';
import { appPath, mediaPath } from '../../paths';

function About() {
  return (
    <>
      <Navbar />
      <main className='about-page'>
        <section className='about-hero'>
          <div className='container'>
            <h1>We pioneered the discount broking model in India.</h1>
            <p>
              Now, we are pioneering the next generation of investing.
            </p>
          </div>
        </section>

        <section className='about-story'>
          <div className='container about-story__grid'>
            <div>
              <span className='section-kicker'>Our story</span>
              <h2>Breaking barriers for traders and investors.</h2>
            </div>
            <div className='about-story__copy'>
              <p>
                We kick-started operations on the 15th of August, 2010 with the
                goal of breaking all barriers that traders and investors face in
                India in terms of cost, support, and technology. We named the
                company Zerodha, a combination of Zero and “Rodha”, the Sanskrit
                word for barrier.
              </p>
              <p>
                Today, our disruptive pricing models and in-house technology have
                made us one of the largest stock brokers in India. Over 1.8 crore
                clients place billions of orders every year through our ecosystem
                of investment platforms.
              </p>
              <p>
                We also run open online educational and community initiatives to
                empower retail traders and investors, and Rainmatter, our fintech
                fund and incubator, supports the growth of India’s capital markets.
              </p>
            </div>
          </div>
        </section>

        <section className='about-values'>
          <div className='container'>
            <div className='about-section-heading'>
              <span className='section-kicker'>Our approach</span>
              <h2>Built around customers, technology, and education.</h2>
            </div>
            <div className='about-values__grid'>
              <article>
                <h3>Customer first</h3>
                <p>We build for the people who use our products every day.</p>
              </article>
              <article>
                <h3>Transparency</h3>
                <p>Clear pricing and straightforward products, without surprises.</p>
              </article>
              <article>
                <h3>Innovation</h3>
                <p>We use technology to make investing faster, clearer, and better.</p>
              </article>
            </div>
          </div>
        </section>

        <section className='about-founder'>
          <div className='container about-founder__grid'>
            <div className='about-founder__image'>
              <img
                src={mediaPath('about-founder.jpeg')}
                alt='Nithin Kamath, founder and CEO of Zerodha'
              />
            </div>
            <div>
              <span className='section-kicker'>Leadership</span>
              <h2>Putting customers and long-term thinking first.</h2>
              <p>
                Nithin Kamath is the founder and CEO of Zerodha. His focus is on
                building a company that keeps customers at the centre and thinks
                beyond short-term gains.
              </p>
              <strong>Nithin Kamath</strong>
              <span className='about-founder__role'>Founder &amp; CEO</span>
            </div>
          </div>
        </section>

        <section className='about-cta'>
          <div className='container'>
            <h2>Join the investing revolution.</h2>
            <p>Open your account and start investing with Zerodha.</p>
            <a href={appPath('/Signup')} className='hero-cta'>Sign up now</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;

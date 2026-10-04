import React from 'react';
import { appPath } from '../../paths';

function Hero() {
    return (
        <section className='hero-section'>
        <div className='container'>
            <h1 className='hero-title'>Technology</h1>
            <h3 className='hero-subtitle'>
                Sleek, modern and intuitive trading platforms
            </h3>
            <p className='mt-3'>
                Check out our{' '}
                <a className='info-link' href={appPath('/pricing')}>
                    investment offerings{' '}
                    <i className='fa fa-long-arrow-right' aria-hidden='true' />
                </a>
            </p>
        </div>
        </section>
    );
}
export default Hero;
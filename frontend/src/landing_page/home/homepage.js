import React from 'react';
import Hero from './Herosection';
import Award from './Awards';
import Stats from './stats';
import Pricing from './pricing';
import Education from './Education';
import OpenAccount from '../../openaccount';
import Team from '../about/Team';
import Navbar from '../support/Navbar';
import Footer from '../../footer';

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Award />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      <Team />
      <Footer />
    </>
  );
}

export default Homepage;
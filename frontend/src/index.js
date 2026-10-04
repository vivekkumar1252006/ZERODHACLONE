import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Homepage from './landing_page/home/homepage';
import Signup from './landing_page/signup/signup';
import Login from './landing_page/login/Login';
import Education from './landing_page/home/Education';
import Pricing from './landing_page/home/pricing';
import Product from './landing_page/products/universe';
import About from './landing_page/about/aboutpage';
import Support from './landing_page/support/supportpage';
import NotFound from './NotFound';
import Dashboard from './dashboard/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Education' element={<Education />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/product' element={<Product />} />
      <Route path='/About' element={<About />} />
      <Route path='/support' element={<Support />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

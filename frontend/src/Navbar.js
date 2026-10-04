import React from 'react';
import { mediaPath } from './paths';

function Navbar(){
    return(     
        <div className='navbar'>
            <div className='navbar-logo'>
                <img src={mediaPath('logo.png')} alt='Logo' className='logo-image' />
            </div>
        </div>
    );
}

export default Navbar;
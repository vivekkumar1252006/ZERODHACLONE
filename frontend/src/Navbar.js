import React from 'react';

const logoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/media/logo.png` : '/media/logo.png';

function Navbar(){
    return(     
        <div className='navbar'>
            <div className='navbar-logo'>
                <img src={logoSrc} alt='Logo' className='logo-image' />
            </div>
        </div>
    );
}

export default Navbar;
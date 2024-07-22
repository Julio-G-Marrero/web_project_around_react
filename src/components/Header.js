import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return( 
        <header class="header">
            <div class="header__logo">
            <img src={logo} alt="logo" />
            </div>
        </header>
    );
}

export default Header;
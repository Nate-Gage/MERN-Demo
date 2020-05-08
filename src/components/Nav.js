import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../wishlist-logo.png';

function Nav() {
    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <Link to="/"><img className="logo" src={Logo} alt="Logo Icon" /></Link>
            <ul className="nav-links">
                <Link style={navStyle} to='/add'>
                    <li>Add a Wish</li>
                </Link>
                <Link style={navStyle} to='/wishlist'>
                    <li>My Wishlist</li>
                </Link>
                <Link style={navStyle} to='/login'>
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;

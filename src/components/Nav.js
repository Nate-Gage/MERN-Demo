import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import Logo from '../wishlist-logo.png';

function Nav() {

    const { userValue } = useContext(UserContext);

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
                {userValue ?
                    <Link style={navStyle} to='/login'>
                        <li>Sign Out</li>
                    </Link>
                    :
                    <Link style={navStyle} to='/login'>
                        <li>Sign In</li>
                    </Link>
                }
            </ul>
        </nav>
    )
}

export default Nav;

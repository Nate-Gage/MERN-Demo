import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <Link to="/"><h3>Logo</h3></Link>
            <ul className="nav-links">
                <Link style={navStyle} to='/add'>
                    <li>Add a Recipe</li>
                </Link>
                <Link style={navStyle} to='/recipes'>
                    <li>My Recipes</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;

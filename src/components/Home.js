import React from 'react';
import PropTypes from 'prop-types';

function Home() {
    return (
        <div className="homePage" data-test="homePage">
            <div className="container">
                <h1 className="homeTitle" data-test="header">Welcome to your Wishlist!</h1>
            </div>
        </div>
    )
}

Home.propTypes = {
    header: PropTypes.string
};

export default Home;

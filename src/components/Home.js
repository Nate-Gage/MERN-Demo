import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function Home() {
    const {user, setUser} = useContext(UserContext);
    return (
        <div className="container">
            <p className="header">This is the Wishlist home page. Go to 'Add an Item' to add an item to the wishlist. To view entries or edit an item, click 'My Wishlist' above.</p>
            <p>{user}</p>
            <button onClick={() => setUser('Hi there')}>Change value</button>
        </div>
    )
}

export default Home;

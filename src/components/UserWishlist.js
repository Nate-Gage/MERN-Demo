import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import '../App';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function UserWishlist() {

    const { userValue, setUserValue } = useContext(UserContext);
    const [wishlist, setWishlist] = useState([]);

    useEffect(function () {
        const options = {
            headers: { 'Authorization': userValue[0] }
        };

        axios.get('http://localhost:5000/wishlist/', options)
            .then(res => {
                if (res.data.length > 0) {
                    setWishlist(res.data.map(item => {
                        return item;
                    }));
                } else {
                    console.log('There was an error getting the wishlist');
                }
            });
    }, [])

    const deleteItem = (id) => {
        axios.delete('http://localhost:5000/wishlist/' + id)
            .then(
                setWishlist(wishlist.filter(item => item._id !== id)));
    };

    return (
        <div className="container">
            {userValue ? <p>{userValue}</p> : <p>There's nothing here.</p>}
            <h1 className="wishlist__mainheader">MY WISHLIST</h1>
            <h4 className="header wishlist__subheader">Click on an item below to edit or delete details</h4>
            {wishlist.map(item => (
                <WishlistItem
                    deleteItem={deleteItem}
                    key={item._id}
                    item={item}
                    title={item.title}
                    price={item.price}
                    notes={item.notes}
                    id={item._id}
                />
            ))}
        </div>
    );
}

const WishlistItem = props => {

    return (
        <div className="listContainer">
            <Card className="listCard">
                <CardContent>
                    <p className="cardTitle">{props.title}</p>
                    <p className="cardPrice" color="textSecondary">Price: {props.price}</p>
                    <p className="cardNotes"><span className="notesTitle">Notes:</span> <br />
                        {props.notes}
                    </p>
                    <p className="cardEditDelete"><button className="linkStyled" onClick={() => { props.deleteItem(props.id) }}>DELETE</button> | <Link to={'/edit/' + props.id}>EDIT</Link></p>
                </CardContent>
            </Card>
        </div>
    );
}

WishlistItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default UserWishlist;

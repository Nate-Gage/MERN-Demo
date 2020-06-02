import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import '../App';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function PublicWishlist() {

    const { userValue } = useContext(UserContext);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {

        const json = localStorage.getItem('user');
        const user = JSON.parse(json);
        console.log(user);

        if (userValue === null || userValue[0] === null ) {
            return;
        } else {
            const options = {
                headers: {
                    'Authorization': userValue[0],
                    'OwnerId': userValue[1]
                }
            };
            axios.get('http://localhost:5000/wishlist/public', options)
                .then(res => {
                    if (res.data.length > 0) {
                        setWishlist(res.data.map(item => {
                            return item;
                        }));
                    } else {
                        console.log('There was an error getting the wishlist');
                    }
                });
        }
    }, [])

    return (
        <div className="container">
            {userValue ?
                <div>
                    <h1 className="wishlist__mainheader">CLAIM AN ITEM</h1>
                    <h4 className="header wishlist__subheader">Click 'claim' on an item to claim that item.</h4>
                    {wishlist.map(item => (
                        <WishlistItem
                            key={item._id}
                            item={item}
                            title={item.title}
                            price={item.price}
                            notes={item.notes}
                            id={item._id}
                        />
                    ))}
                </div>
                :
                <h3 className="h3msg h3msg__add">Please login to view your wishlist</h3>
            }
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
                </CardContent>
            </Card>
        </div>
    );
}

WishlistItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default PublicWishlist;

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import '../App';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import checkmark from '../checkmark.png';

function UserWishlist() {

    const { userValue } = useContext(UserContext);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (userValue === null || userValue[0] === null) {
            return;
        } else {
            const options = {
                headers: {
                    'Authorization': userValue[0],
                    'OwnerId': userValue[1]
                }
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
        }
    }, [])

    const deleteItem = (id) => {
        axios.delete('http://localhost:5000/wishlist/' + id)
            .then(
                setWishlist(wishlist.filter(item => item._id !== id)));
    };

    return (
        <div className="container">
            {userValue ?
                <div>
                    <h1 className="wishlist__mainheader">MY WISHLIST</h1>
                    <h4 className="wishlist__subheader">Click on an item below to edit or delete details. <br />
                    Or <span>email</span> your wishlist for others to claim items.</h4>
                    <div className="wishlist__scroll">
                        {wishlist.map(item => (
                            <WishlistItem
                                deleteItem={deleteItem}
                                key={item._id}
                                item={item}
                                title={item.title}
                                price={item.price}
                                notes={item.notes}
                                id={item._id}
                                claimed={item.claimed}
                            />
                        ))}
                    </div>
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
                    {props.claimed === true &&
                        <span>
                            <img className="claimedLogo" src={checkmark} alt="claimed logo" />
                            <p className="privateClaimedStyle">Claimed</p>
                        </span>
                    }
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

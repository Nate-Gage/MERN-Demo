import React, { useState, useEffect } from 'react';

import axios from 'axios';
import '../App';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import checkmark from '../checkmark.png';

function PublicWishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/wishlist/claim/')
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

    return (
        <div className="container">
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
        </div>
    );
}

const WishlistItem = props => {

    const [claimItemStatus, setClaimItemStatus] = useState(false);

    //SET CLAIMED STATUS IN DATABASE 
    const claimItem = (id) => {
        axios.patch('http://localhost:5000/wishlist/claim/' + id)
            .then(res => res.status(200).send())
            .catch(err => console.log(err));
        setClaimItemStatus(true);
    };

    //SET UNCLAIMED STATUS IN DATABASE
    const unclaimItem = (id) => {
        axios.patch('http://localhost:5000/wishlist/claim/' + id)
            .then(res => res.status(200).send())
            .catch(err => console.log(err));
        setClaimItemStatus(true);
    };

    return (
        <div className="listContainer">
            <Card className="listCard">
                <CardContent>
                    <p className="cardTitle">{props.title}</p>
                    {claimItemStatus ?
                        <span>
                            <img className="claimedLogo" src={checkmark} alt="claimed logo" />
                            <p className="claimedStyle" onClick={() => { unclaimItem(props.id) }}>Claimed</p>
                        </span>
                        :
                        <p className="claimedStyle" onClick={() => { claimItem(props.id) }}>Claim Item</p>
                    }
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

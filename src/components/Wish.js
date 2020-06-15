import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import checkmark from '../checkmark.png';

const WishlistItem = props => {

    const [claimItemStatus, setClaimItemStatus] = useState(false);

    //CHECK ITEM CLAIMED STATUS
    useEffect(() => {
        if (props.claimed === true) {
            return setClaimItemStatus(true);
        }
    }, [props.claimed])

    //SET CLAIMED STATUS IN DATABASE 
    const claimItem = (id) => {
        console.log('Claimed! ' + id);
        axios.patch('http://localhost:5000/claim/'+id)
            .then(res => res.status(200).send())
            .catch(err => console.log(err));
        setClaimItemStatus(true);
    };

    //SET UNCLAIMED STATUS IN DATABASE
    const unclaimItem = (id) => {
        console.log('Unclaimed! ' + id);
        axios.patch('http://localhost:5000/unclaim/'+id)
            .then(res => res.status(200).send())
            .catch(err => console.log(err));
        setClaimItemStatus(false);
    };

    return (
        <div className="listContainer">
            <Card className="listCard">
                <CardContent>
                    {claimItemStatus ?
                        <span>
                            <img className="claimedLogo" src={checkmark} alt="claimed logo" />
                            <p className="claimedStyle" onClick={() => { unclaimItem(props.id) }}>Claimed</p>
                        </span>
                        :
                        <p className="unclaimedStyle" onClick={() => { claimItem(props.id) }}>Claim Item</p>
                    }
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

export default WishlistItem;
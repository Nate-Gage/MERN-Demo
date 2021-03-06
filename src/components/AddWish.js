import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../App';
import { UserContext } from './UserContext';

function AddWish() {

    const { userValue } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [notes, setNotes] = useState('');
    const [itemTitleAlert, setItemTitleAlert] = useState(false);
    const [isRightNotesLength, setIsRightNotesLength] = useState(false);
    const [submittedMsg, setSubmittedMsg] = useState(false);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangePrice = (e) => {
        const amount = e.target.value;
        if (amount && amount.match(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/)) {
            setPrice(amount);
        }
    };
    const onChangeNotes = (e) => {
        setNotes(e.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();

        const options = {
            headers: { 'Authorization': userValue[0] }
        };
        const wishlistItem = {
            title,
            price,
            notes
        };

        if (title.length === 0) {
            return setItemTitleAlert(true);
        } else {
            setItemTitleAlert(false);
        }

        if (notes.length < 4) {
            setIsRightNotesLength(true);
        } else {
            setIsRightNotesLength(false);
        }

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/add', wishlistItem, options)
            .then(res => {
                if (res.status === 201) {
                    setSubmittedMsg(true);
                }
            });

        //window.location = '/wishlist';
    }

    return (
        <div>
            {userValue ?
                <div>
                    <h1 className="add__mainheader">ADD A WISH</h1>
                    <form onSubmit={addItem} className="addForm">
                        <div className="form-group">
                            <label className="header">Item Name (required)</label><br />
                            <input type="text" className="form-control" placeholder="e.g. 'New Shoes'" value={title} onChange={onChangeTitle} />
                            {itemTitleAlert && <p className="formAlert">*Item title is required.</p>}
                        </div>
                        <div className="form-group">
                            <label className="header">Price</label>
                            <input type="text" className="form-control" value={price} onChange={onChangePrice} />
                        </div>
                        <div className="form-group">
                            <label className="header">Add Notes (links, sales, etc.)</label>
                            <textarea className="form-control" value={notes} onChange={onChangeNotes}></textarea>
                            {isRightNotesLength && <p className="formAlert">*Notes must be more than 4 characters long.</p>}
                        </div>
                        {submittedMsg && <p>Item added to wishlist!</p>}
                        <button className="loginBtn btn btn-primary">Submit</button>
                    </form>
                </div>
                :
                <h3 className="h3msg h3msg__add">Please sign in to add an item to your Wishlist</h3>
            }
        </div>
    )
}

export default AddWish;

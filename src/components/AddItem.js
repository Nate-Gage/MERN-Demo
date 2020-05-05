import React from 'react';
import axios from 'axios';
import '../App';

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.addItem = this.addItem.bind(this);

        this.state = {
            title: '',
            price: 0,
            notes: ''
        };
    };
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangePrice(e) {
        const amount = e.target.value;
        if (!amount || amount.match(/^\$?[0-9]+(\.[0-9][0-9])?$/)) {
            this.setState({ price: amount });
        }
    }
    onChangeNotes(e) {
        this.setState({
            notes: e.target.value
        });
    }
    addItem(e) {
        e.preventDefault();

        const wishlistItem = {
            title: this.state.title,
            price: this.state.price,
            notes: this.state.notes
        };

        console.log(wishlistItem);

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/add', wishlistItem)
            .then(res => console.log(res.data));

        window.location = '/wishlist';
    }
    render() {
        return (
            <div>
                <h1 className="header">Add a Recipe</h1>
                <form onSubmit={this.addItem} className="addForm">
                    <label className="addItem__subheading">Item Name</label><br />
                    <input type="text" placeholder="e.g. 'New Shoes'" className="addItem__input" value={this.state.title} onChange={this.onChangeTitle} />
                    <br />
                    <label className="addItem__subheading">Price</label>
                    <input type="text" className="addItem__input" value={this.state.price} onChange={this.onChangePrice} />
                    <br />
                    <h5 className="addItem__subheading">Add Notes</h5>
                    <textarea className="addItem__input" value={this.state.notes} onChange={this.onChangeNotes}></textarea>
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
};

export default AddItem;

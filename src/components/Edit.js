import React from 'react';
import axios from 'axios';

class EditItem extends React.Component {
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

    componentDidMount() {
        axios.get('http://localhost:5000/wishlist/edit/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data.title,
                    price: res.data.price,
                    notes: res.data.notes
                })
            })
            .catch(error => console.log('Error: ' + error));
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangePrice(e) {
        const amount = e.target.value;
        if (amount && amount.match(/^\$?[0-9]+(\.[0-9][0-9])?$/)) {
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

        const recipe = {
            title: this.state.title,
            price: this.state.price,
            notes: this.state.notes
        };

        console.log(recipe);

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/wishlist/edit/' + this.props.match.params.id, recipe)
            .then(res => console.log(res.data));

        //window.location = '/wishlist';
    }
    render() {
        return (
            <div>
                <h1 className="header add__mainheader">ADD A WISH</h1>
                <form onSubmit={this.addItem} className="addForm">
                    <div className="form-group">
                        <label className="header">Item Name (required)</label><br />
                        <input type="text" className="form-control" placeholder="e.g. 'New Shoes'" value={this.state.title} onChange={this.onChangeTitle} />
                        {this.state.itemTitleAlert && <p className="formAlert">*Item title is required.</p>}
                    </div>
                    <div className="form-group">
                        <label className="header">Price</label>
                        <input type="text" className="form-control" value={this.state.price} onChange={this.onChangePrice} />
                    </div>
                    <div className="form-group">
                        <label className="header">Add Notes (where item can be found, sales, etc.)</label>
                        <textarea className="form-control" value={this.state.notes} onChange={this.onChangeNotes}></textarea>
                        {this.state.isRightNotesLength && <p className="formAlert">*Notes must be more than 4 characters long.</p>}
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
};

export default EditItem;

import React, { Component } from 'react';
import axios from 'axios';
import '../App';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class WishList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wishlist: []
        };

        this.deleteItem = this.deleteItem.bind(this);
    };

    componentDidMount() {
        axios.get('http://localhost:5000/wishlist')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        wishlist: res.data.map(item => {
                            return item
                        })
                    });
                    console.log(this.state.wishlist);
                } else {
                    console.log('There was an error getting the wishlist');
                }
            });
    }

    deleteItem(id) {
        console.log('ID: ' + id);
        axios.delete('http://localhost:5000/wishlist/' + id)
            .then(
                this.setState({
                    wishlist: this.state.wishlist.filter(item => item._id !== id)
                }));
    }

    render() {
        return (
            <div className="container">
                <h1 className="header">My Wishlist</h1>
                <h4 className="header">Click on an item below to edit details</h4>
                {this.state.wishlist.map(item => (
                    <WishlistItem
                        deleteItem={this.deleteItem}
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
};

const WishlistItem = props => {

    return (
        <div className="listContainer">
            <Card className="listCard">
                <CardContent>
                    <Typography component="h1">{props.title}</Typography>
                    <Typography color="textSecondary" component="p">Price: {props.price}</Typography>
                    <Typography variant="body2" component="p">Notes: <br />
                        {props.notes}
                    </Typography>
                    <Typography variant="body2"><a href='#' onClick={() => { props.deleteItem(props.id) }}>DELETE</a> | <Link to={'/edit/' + props.id}>EDIT</Link></Typography>
                </CardContent>
            </Card>
        </div>
    );
}

WishlistItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default WishList;


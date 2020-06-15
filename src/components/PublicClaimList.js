import React from 'react';
import axios from 'axios';
import '../App';
import WishlistItem from './Wish';

class PublicClaimList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wishlist: []
        }
    };

    componentDidMount() {
        axios.get('http://localhost:5000/wishlist/claim/'+this.props.match.params.id)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        wishlist: res.data.map(item => {
                            return item;
                        })
                    });
                } else {
                    console.log('There was an error getting the wishlist');
                }
            });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="wishlist__mainheader">CLAIM AN ITEM</h1>
                    <h4 className="header wishlist__subheader">Click 'claim' on an item to claim that item.</h4>
                    {this.state.wishlist.map(item => (
                        <WishlistItem
                            key={item._id}
                            item={item}
                            title={item.title}
                            price={item.price}
                            notes={item.notes}
                            id={item._id}
                            owner={item.owner}
                            index={item.index}
                            claimed={item.claimed}
                        />
                    ))}
                </div>
            </div>
        );
    }
};

export default PublicClaimList;

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length = 0) {
                throw new Error('Item Name field cannot be left blank.');                
            }
        }
    },
    price: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        trim: true,
        validate(value) {
            if (value.length < 4) {
                throw new Error('Notes must be more than 4 characters long');
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    claimed: {
        type: Boolean
    }
}, {
    timestamps: true,
});

const wishItem = mongoose.model('Wishlist', wishlistSchema);

module.exports = wishItem;
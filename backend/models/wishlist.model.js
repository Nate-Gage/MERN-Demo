const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
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
                throw new Error('Notes must be more than 4 characters long')
            }
        }
    },
}, {
    timestamps: true,
});

const wishItem = mongoose.model('Wishlist', wishlistSchema);

module.exports = wishItem;
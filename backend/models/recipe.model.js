const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cooktime: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
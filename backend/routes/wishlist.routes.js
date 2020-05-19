const wishlistRouter = require('express').Router();
let WishItem = require('../models/wishlist.model');
const auth = require('../middleware/auth');

//GET ALL WISHLIST ITEMS
// wishlistRouter.route('/wishlist').get((req, res) => {
//     WishItem.find()
//         .then(items => res.json(items))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

//GET ALL WISHLIST ITEMS
wishlistRouter.get('/wishlist', async (req, res) => {
    WishItem.find()
    .then(items => res.send(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

//GET WISHLIST ITEM BY ID
wishlistRouter.route('/wishlist/:id').get((req, res) => {
    WishItem.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

//ADD A WISHLIST ITEM
wishlistRouter.post('/add', auth, async (req, res) => {
    //const item = new WishItem(req.body);
    const item = new WishItem({
        ...req.body,
        owner: req.user._id
    });

    try {
        await item.save();
        res.status(201).send('Item added to wishlist!');
    } catch (err) {
        res.status(400).send(err);
    }
});

//EDIT A WISHLIST ITEM BY ID
wishlistRouter.route('/wishlist/edit/:id').post((req, res) => {
    WishItem.findById(req.params.id)
        .then(item => {
            item.title = req.body.title;
            item.price = Number(req.body.price);
            item.notes = req.body.notes;

            item.save()
                .then(() => res.json('Wishlist item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE A WISHLIST ITEM
wishlistRouter.route('/wishlist/:id').delete((req, res) => {
    WishItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Wishlist item deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = wishlistRouter;
const wishlistRouter = require('express').Router();
let WishItem = require('../models/wishlist.model');
const User = require('../models/user.model');
const auth = require('../middleware/auth');


//GET PRIVATE WISHLIST ITEMS BY USER
wishlistRouter.get('/wishlist', auth, async (req, res) => {
    console.log(req.headers.ownerid);
    try {
        const item = await WishItem.find({ owner: req.headers.ownerid });
        if (!item) {
            return res.status(400).send();
        }

        res.send(item);
    } catch (err) {
        res.status(500).send();
    }
});

//GET PUBLIC WISHLIST FROM SENDER EMAIL
wishlistRouter.get('/wishlist/public', async (req, res) => {
    console.log(req.headers.ownerid);
    try {
        const item = await WishItem.find({ owner: req.headers.ownerid });
        if (!item) {
            return res.status(400).send();
        }

        res.send(item);
    } catch (err) {
        res.status(500).send();
    }
});

// //GET ALL WISHLIST ITEMS
// wishlistRouter.get('/wishlist', auth, async (req, res) => {
//     WishItem.find()
//     .then(items => res.send(items))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

//GET WISHLIST ITEM BY ID
// wishlistRouter.route('/wishlist/:id').get((req, res) => {
//     WishItem.findById(req.params.id)
//         .then(item => res.json(item))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

//ADD A WISHLIST ITEM
wishlistRouter.post('/add', auth, async (req, res) => {
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
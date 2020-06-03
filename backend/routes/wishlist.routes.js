const wishlistRouter = require('express').Router();
let WishItem = require('../models/wishlist.model');
const User = require('../models/user.model');
const auth = require('../middleware/auth');


//GET PRIVATE WISHLIST ITEMS BY USER
wishlistRouter.get('/wishlist', auth, async (req, res) => {
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

//GET PUBLIC WISHLIST FROM SENDER
wishlistRouter.get('/wishlist/claim/:id', async (req, res) => {
    try {
        console.log(req)
    console.log('asdfsadfsadfsadfasdfasd')
        const item = await WishItem.find({ owner: req.params.id });
        if (!item) {
            return res.status(400).send();
        }

        res.send(item);
    } catch (err) {
        res.status(500).send();
    }
});

//UPDATE CLAIMED PROPERTY IN DATABASE
wishlistRouter.patch('/wishlist', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'completed'];
    const validOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if (!validOperation) {
        res.status(400).send('Invalid Operation');
    }

    try {
        const item = await WishItem.findOne({ owner: req.headers.ownerid })
        if (!item) {
            return res.status(400).send();
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()

    } catch (err) {
        res.status(500).send(err);
    }
})

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
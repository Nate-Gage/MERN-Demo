const userRouter = require('express').Router();
const User = require('../models/user.model');

//CREATE USER
userRouter.route('/login/create').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        name,
        email,
        password
    });

    newUser.save()
        .then(() => res.status(201).send('User created!'))
        .catch(err => res.status(400).send('Error: ' + err));
});

//LOGIN USER
userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user);
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = userRouter;
const userRouter = require('express').Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth');

//CREATE USER
userRouter.post('/login/create', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send();
    }
});

//LOGIN USER
userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send();
    }
});

//GET USER
userRouter.get('/login/me', auth, async (req, res) => {
    res.send(req.user);
});

module.exports = userRouter;
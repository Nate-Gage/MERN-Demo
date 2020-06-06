const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const figlet = require('figlet');
const chalk = require('chalk');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//MONGOOSE CONNECTION
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true ,
    useFindAndModify: false 
});

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("MongoDB connection successful.")
});

//ROUTERS
const wishlistRouter = require('./routes/wishlist.routes');
const userRouter = require('./routes/user.routes');

app.use(wishlistRouter);
app.use(userRouter);

app.listen(port, () => {
    //console.log(chalk.red(figlet.textSync('Wishlist', {horizontalLayout: 'full'})))
    console.log(`Server is up on port ${port}`);
});


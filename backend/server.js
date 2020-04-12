const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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
    useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log("MongoDB connection successful.")
});

//ROUTERS
const recipesRouter = require('./routes/recipes.routes');

app.use(recipesRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
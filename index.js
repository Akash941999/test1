const express = require('express');
const app =express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Conect to DB
const MONGOURI = 'mongodb://localhost:27017/emp';

mongoose.connect(MONGOURI, {useNewUrlParser:true}, () =>
console.log('connected to DB')
);

//Middleware
app.use(express.json());



//Route Middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(3000, () => console.log('Server Up and running'));
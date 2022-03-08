const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const postroute = require('./routes/user');
const app = express();
app.use(bodyparser.json());
app.use('/user', postroute);

PORT = 3000;



mongoose.connect('mongodb://127.0.0.1:27017/tmanager', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection Successful!');
    }
});
app.listen(PORT, console.log(`Connected On Port : ${PORT}`));
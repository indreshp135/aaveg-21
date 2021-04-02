const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const config = require('./config/config.js')

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

app.get('/check', (req, res) => {
    res.status(200).send("Server Working");
})

//Production Requirements
if (process.env.NODE_ENV !== 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || config.port

app.listen(PORT, () => console.log(`Server Running in Port: ${PORT}`))
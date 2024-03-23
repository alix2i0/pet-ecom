const express = require ("express");
const mongoose  = require ("mongoose");
const {key} = require('./db')
const port = 3300;
const app = express();

mongoose.connect(key);
mongoose.connection.on('is connected', () => {
    console.log('hada kdam mongodb tahwa ')
})
app.get('/',(req,res) => {
    res.send('rah khdam')
})

app.listen(port, () =>{
    console.log(`app running on port : ${port}`);
})
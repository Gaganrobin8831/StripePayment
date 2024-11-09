require("dotenv").config();

const express = require('express')
const app = express()
const path = require('path')


const payment_route = require("./routes/paymentRoute");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',payment_route);

app.listen(3000, function(){
    console.log(`Server is running  http://localhost:3000/`);
});
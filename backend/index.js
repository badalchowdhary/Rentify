const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();

const { connectToMongoDB } = require('./connect');
const authRoute = require('./routes/auth');
const buyerRoute = require('./routes/buyer');
const sellerRoute = require('./routes/seller');

dotenv.config();

//Connecting to Database
connectToMongoDB().
then(() => console.log("Conneted to MongoDB"))
.catch((err)=>{
    console.log(err)
});

//Enable CORS for all routes
// app.use(cors());
app.use(cors({
    origin: 'https://rentify-frontend-badal-chowdharys-projects.vercel.app'
}));

//Middleware to parse data
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/buyer', buyerRoute);
app.use('/api/seller', sellerRoute);


app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})
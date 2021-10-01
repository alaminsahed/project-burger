const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const cors   = require('cors');
const connect = require('./config/db');

dotenv.config({path:'./config/config.env'});

app.use(cors());

connect();

app.use(express.json());

app.use(morgan('dev'));



app.listen(process.env.PORT,()=>{
   console.log(`server running on ${process.env.PORT}`);
})
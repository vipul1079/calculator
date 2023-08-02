const express=require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors=require('cors');
const morgan=require('morgan');

//routes
const historyRoutes=require('./routes/history');

dotenv.config();

const app = express();

//express middlewares
//cross-origin-resource-sharing
app.use(cors());
//allows us to exptract info when sent via req.body
app.use(express.json());

//logs some useful info
app.use(morgan('tiny'));

//route
app.use('/api/history',historyRoutes);


mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
});

mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb ...");
});

mongoose.connection.on("Error",(err)=>{
    console.log("Error while connecting to mongodb",err);
});

app.listen(process.env.PUBLIC_PORT,()=>{
    console.log(`App is running on port ${process.env.PUBLIC_PORT}`);
})
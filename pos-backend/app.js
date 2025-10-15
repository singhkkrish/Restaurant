require('dotenv').config();
const express=require('express');
const connectDB=require('./config/database');
const config=require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const app=express();
const PORT=config.PORT ;
connectDB();
app.use(express.json());//to parse json data
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.json({message:"Hello from POS Server"});
})
app.use("/api/user",require('./routes/userRoute'));
//global error handler
app.use(globalErrorHandler);
//server
app.listen(PORT,()=>{
    console.log(`POS Server is listening on port ${PORT}`);
})
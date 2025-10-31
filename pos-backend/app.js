require('dotenv').config();
const express=require('express');
const connectDB=require('./config/database');
const config=require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app=express();
const PORT=config.PORT ;
connectDB();
app.use(cors({
    credentials:true,
    origin: ['http://localhost:5173']
}))
app.use(express.json());//to parse json data
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.json({message:"Hello from POS Server"});
})
app.use("/api/user",require('./routes/userRoute'));
app.use("/api/order",require('./routes/orderRoute'));
app.use("/api/table",require('./routes/tableRoute'));
app.use("/api/payment",require('./routes/paymentRoute'));
//global error handler
app.use(globalErrorHandler);
//server
app.listen(PORT,()=>{
    console.log(`POS Server is listening on port ${PORT}`);
})
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const port=process.env.PORT||5000;
const userRouter=require('./router/userRouter');
const cors=require('cors');
const bodyParser=require('body-parser');



require('dotenv').config();
app.use(cors());
app.use(bodyParser.json())

mongoose.createConnection(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){throw err}
    console.log("Conneted to MongoDB...")
})

app.use('/api/user',userRouter);


app.listen(port,()=>{
    console.log(`Sever started on port ${port}`);
})

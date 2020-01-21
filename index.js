const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const port=process.env.PORT||5000;


require('dotenv').config();

mongoose.createConnection(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){throw err}
    console.log("Conneted to MongoDB...")
})

app.listen(port,()=>{
    console.log(`Sever started on port ${port}`);
})

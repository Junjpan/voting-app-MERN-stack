const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const port=process.env.PORT||5000;
const userRouter=require('./routes/userRouter');
const cors=require('cors');
const bodyParser=require('body-parser');
const conn=require('./routes/connection');



require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

/**const conn=mongoose.createConnection(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true})**/

conn.once('open',(err,db)=>{  
        if(err){throw err}
        console.log("Conneted to MongoDB...")
    
})



app.use('/api/user',userRouter);


app.listen(port,()=>{
    console.log(`Sever started on port ${port}`);
})

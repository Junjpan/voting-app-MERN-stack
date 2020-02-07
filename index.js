const express=require('express');
const app=express();
const path=require('path');
const port=process.env.PORT||5000;
const cors=require('cors');
const requestIp=require('request-ip');
const bodyParser=require('body-parser');
const conn=require('./routes/connection');
const userRouter=require('./routes/userRouter');
const pollRouter=require('./routes/pollRouter');



require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());
/**const conn=mongoose.createConnection(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true})**/

conn.once('open',(err,db)=>{  
        if(err){throw err}
        console.log("Conneted to MongoDB...")
    
})



app.use('/api/user',userRouter);
app.use('/api/poll',pollRouter);


app.listen(port,()=>{
    console.log(`Sever started on port ${port}`);
})

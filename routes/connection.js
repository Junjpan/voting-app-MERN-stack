const mongoose=require('mongoose');

require('dotenv').config();

const conn=mongoose.createConnection(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true});

//there are differencies between mongoose.createConnection and mongoose.connect. If you are using createConnection,
//you should make sure you register models on a connection not mongoose
module.exports=conn;
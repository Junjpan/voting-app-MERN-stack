const mongoose=require('mongoose');
const conn=require('../routes/connection');

const UserSchema=mongoose.Schema({
    username:String, 
     password:String,
     polls:[{type:mongoose.Schema.Types.ObjectId,ref:"poll"}] 
});

module.exports=conn.model("User",UserSchema);
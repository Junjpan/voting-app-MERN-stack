const mongoose=require('mongoose');
const conn=require('../routes/connection');

const UserSchema=mongoose.Schema({
    username:String, 
     password:String,
     imgurl:{
         type:String,
         default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
     },
     polls:[{type:mongoose.Schema.Types.ObjectId,ref:"poll"}] 
});

module.exports=conn.model("User",UserSchema);
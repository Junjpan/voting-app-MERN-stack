const mongoose=require('mongoose');
const conn=require('../routes/connection');

const PollSchema=mongoose.Schema({
    username:String,
    subject:String,
    date:{
        type:Date,
        default:new Date()
    },
    ipList:[String],
    options:[{type:mongoose.Schema.Types.ObjectId,ref:"option"}]
})

module.exports=conn.model("Poll",PollSchema);
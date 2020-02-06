const mongoose=require('mongoose');
const conn=require('../routes/connection');

const OptionSchema=mongoose.Schema({
    pollId:mongoose.Schema.Types.ObjectId,
    vistedIP:[String],
    option:String,
    vote:{
        type:Number,
        default:0
    }
})

module.exports=conn.model("Option",OptionSchema);
const router=require('express').Router();
const Poll=require('../models/poll');
const User=require('../models/user');
const Option=require('../models/option');

const mongoose=require('mongoose');
mongoose.set('useFindAndModify', false)

router.post('/:username',async (req,res)=>{
    //console.log(req.body);
    const {title,options,username}=req.body;
    const newPoll=new Poll();
    let optionArr=[];
    newPoll.username=username;
    newPoll.subject=title;
    await    newPoll.save((err)=>{
//everytime user add a new poll, add the poll_ID to the user's polls array
        User.findOne({username},(err,user)=>{
            if(err){throw err}
            if(user!==null){
                user.polls.push(newPoll._id);
                user.save();
            }
        });
    })
    options.forEach((option)=>{
        let newOption=new Option();
        newOption.pollId=newPoll._id;
        newOption.option=option;
        newOption.save();  
        optionArr.push(newOption._id)      
     })
//have to use sync here, because you want to wait for the newpoll was save to database before you do the search
    Poll.findByIdAndUpdate(newPoll._id,{options:optionArr},{new:true},(err,result)=>{
        if(err){res.send(err)}
        else{
            //console.log(result);
            res.send('Your new poll has been saved')
        }
    })
    
})


module.exports=router;
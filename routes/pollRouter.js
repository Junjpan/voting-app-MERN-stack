const router = require('express').Router();
const Poll = require('../models/poll');
const User = require('../models/user');
const Option = require('../models/option');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

//post a new poll
router.post('/:username', async (req, res) => {
    //console.log(req.body);
    const { title, options, username } = req.body;

    const newPoll = new Poll();
    let optionArr = [];
    newPoll.username = username;
    newPoll.subject = title;
    await newPoll.save((err) => {
        //everytime user add a new poll, add the poll_ID to the user's polls array
        User.findOne({ username }, (err, user) => {
            if (err) { throw err }
            if (user !== null) {
                user.polls.push(newPoll._id);
                user.save();
            }
        });
    })
    //have to use asyn and await, because sometimes it doesn't update correctly
    await options.forEach((option) => {
        let newOption = new Option();
        newOption.pollId = newPoll._id;
        newOption.option = option;
        newOption.save();
        optionArr.push(newOption._id)
    })

    //have to use sync here, because you want to wait for the newpoll was save to database before you do the search
    Poll.findByIdAndUpdate(newPoll._id, { options: optionArr }, { new: true }, (err, result) => {
        if (err) { res.send(err) }
        if (result == null) {
            res.status(404).send("Sorry, The server is busy and your new poll was not created succesfully, please delete and re-create it again,Thanks.")
        }
        else {
            // console.log(result);
            res.send('Your new poll has been saved')
        }

    })

})

//retrive user poll list
router.get('/:username', (req, res) => {
    const { username } = req.params;
    // console.log(username)
    Poll.find({ username })
        .sort({ date: -1 })
        .populate({ path: "options", model: Option })
        .then((polls) => {
            if (polls.length == 0) {
                res.status(404).send("You don't have any polls yet.")
            } else {
                res.send(polls)
            }

        })
        .catch(err => { throw err })

})

router.delete('/:pollId', (req, res) => {
    const { pollId } = req.params;
    //console.log(pollId);
    Poll.findByIdAndDelete(pollId, (err, poll) => {
        if (poll == null) { res.status(404).send('Delete Error.') }
        else {
            //console.log(poll);
            const { username } = poll;
            User.findOne({ username }, (err, user) => {
                let index = user.polls.findIndex((id) => { return id == pollId });
                user.polls.splice(index, 1);
                user.save();
            })
            Option.deleteMany({ pollId }, (err) => {
                if (err) { throw `Delete Options error for ID ${pollId}` }
            })
            res.send('Poll was deleted.')
        }
    })

})

router.post("/options/add", (req, res) => {
    //console.log(req.body);
    const newOption = new Option();
    newOption.pollId = req.body.poll_id;
    newOption.option = req.body.newoption;
    newOption.save((err) => {
        if (err) { res.status(400).send("New Option was not updated successfully.") }
        else {
            Poll.findById(req.body.poll_id, (err, poll) => {
                //console.log(poll)
                poll.options.push(newOption._id);
                poll.save();
                res.send('Your new option was added successfully!')
            })
        }
    })
})

router.get('/public/all',(req,res)=>{
    Poll.find({})
        .sort({date:-1}) 
        .populate({path:"options",model:Option})
        .then((polls) => {
            res.send(polls)
        })
        .catch(err => { throw err })
})

router.put('/vote/:optionId',(req,res)=>{
    const {optionId}=req.params;
    //console.log(optionId)
    const ip=req.clientIp;
    //console.log(ip)


    Option.findById(optionId,(err,option)=>{
        if(err){throw err}
        else{
            //To find if the ip address vote the current poll
            Poll.findById(option.pollId,(err,poll)=>{
                let index=poll.ipList.indexOf(ip);
               //console.log(index);
                //if Ip address is not existed
                if(index==-1){
                    poll.ipList.push(ip);
                    poll.save();
                    option.vote+=1;
                    option.save((err)=>{
                        if(err){throw err}
                       else{ res.send('success')}
                    })
                }else{
                    res.status(400).send('Sorry, you only can vote this poll one times.')
                }
            })
           
        }
        
    })
    
})

module.exports = router;


const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//register to be a memeber
router.post('/register', (req, res) => {
    //console.log(req.body);//make sure to use bodyParser
    const { username, password } = req.body;
    const query = { username: username.toLowerCase() }

    User.find(query, (err, user) => {
        if (user.length > 0) {
            res.status(404).json({ error: 'Sorry, this username has been token, try a different username.' })
        } else {
            
            bcrypt.genSalt(10, (err, salt) => {
                if (err) { throw err }
                else {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) { throw err }
                        let user = new User();
                        user.username = username.toLowerCase();
                        user.password = hash;
                        user.save(() => {
                            res.status(200).json({ message: "Your account is set up, we're sending you to Login Page." })    
                        })
                    })                    
                }
            })
        }
    })

})

//login and load a user page
router.get('/login',(req,res)=>{
    const { username,password }=req.query;
    //{username}={username:username}
    User.findOne({username},(err,user)=>{
        if(user===null){
            res.status(404).send("Sorry,no such a user!")
        }else{
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(isMatch){
                    res.status(200).json({url:user.imgurl})
                }else{
                    res.status(400).send("Sorry,your passowrd is incorrect.")
                }
            })
        }
    })
})


router.get('/:username',(req,res)=>{
    const {username}=req.params;
    //console.log(username)
    User.findOne({username},(err,user)=>{
        if (err){throw err}
        if(user!==null){
         res.send('success')
        }else{
            res.status(404)
        }
    })
})

router.put('/:username/url',(req,res)=>{
    const {img_url}=req.body;
    const {username}=req.params;
   // console.log(img_url,username);
   User.findOne({username},(err,user)=>{
       if(err){throw err}
       if(user!==null){
           user.imgurl=img_url;
           user.save();
           res.send('success');
       }else{
          res.status(404).send('Sorry, update is failed.')
       }
   })

})

module.exports = router;
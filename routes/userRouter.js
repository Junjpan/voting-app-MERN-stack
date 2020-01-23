const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    console.log(req.body);//make sure to use bodyParser
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


module.exports = router;
const express = require('express'); 
const router = express.Router();
const Travels = require('../dbHelpers');
const bcrypt = require('bcryptjs');



//Get all users
router.get('/users', (req, res)=>{
    Travels.getallUsers()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>res.status(500).json(error))
})

//Add user
router.post('/users/register', (req, res)=>{
    const credentials = req.body; 
    const {username, password} = credentials; 

    if(!(username && password)){
        return res.status(400).json({message:"username and password is required!"})
    }

    //password
    const hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash; 

    Travels.addUser(credentials)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>{
        if(error.errno === 19){
            return res.status(400).json({message: "user already exist"})
        } else {
            res.status(500).json(error)
        }
    })
})

//Get user by username
router.get('/users/:username', (req, res)=>{
    const userName = req.params.username; 
    Travels.findUserByUsername(userName)
    .then(user=>{
            res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error));
})

//Delete user
router.delete('/users/:id', (req, res)=>{
    const id = req.params.id;
    Travels.removeUser(id)
    .then(count=>{
        if(count > 0){
            res.status(200).json({message:"user is deleted!"})
        } else {
            res.status(200).json({message:"no user with that ID!"})
        }
    })
    .catch(error=>res.status(500).json(error));
})

//Log in with existing user
router.post('/users/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    Travels.findUserByUsername(username, password)
    .then(user=>{
        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json(user)
        } else {
            res.status(400).json({message:"user with that password doesn't exist"})
        }
})
.catch(error=>res.status(500).json(error));
})

module.exports = router; 
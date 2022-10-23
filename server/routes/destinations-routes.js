const express = require('express'); 
const router = express.Router();
const Travels = require('../dbHelpers');

//destinations
router.get('/destinations', (req, res)=>{
    Travels.getAllDestinations()
    .then(destinations=>{
        res.status(200).json(destinations)
    })
    .catch(error=>{
        res.status(500).json({message:'cannot get destinations'})
    })
})

//Create destinations
router.post('/users/:id/destinations', (req,res)=>{
    const {id} = req.params;
    const newDestination = req.body;
    if(!newDestination.user_id){
        newDestination['user_id'] = parseInt(id, 10); 
    }



    //Find user and send back for destinations
    Travels.findUserByID(id)
    .then(user=>{
        if(!user){
            res.status(404).json({message:'user does not exist'})
        }
        if(!newDestination.title || !newDestination.description){
            res.status(404).json({message: 'all fields must be completed'})
        }
        Travels.addDestination(newDestination, id)
        .then(destination=>{
            res.status(200).json(destination)
        })
        .catch(error=>{res.status(500).json({message: 'server failed'})
    })
})
})

//Delete destination
router.delete('/destinations/:id', (req, res)=>{
    const{id} = req.params; 
    Travels.removeDestination(id)
    .then(count=>{
        if(count>0){
        res.status(200).json({message: 'Destination is deleted'})
    } else {
        res.status(404).json({message: 'No destination with that id'})
    }
})
    .catch(error=>res.status(500).json(error))
})

//Update Destination
router.patch('/destinations/:id', (req, res)=>{
    const{id} = req.params;
    Travels.updateDestination(id, req.body)
    .then(destination=>{
        res.status(200).json({message: 'Destination updated'})
    })
    .catch(error=>res.status(500).json(error))
})

//Get destination by id
router.get('/destinations/:id', (req, res)=>{
    const{id} = req.params; 
    Travels.findDestinationById(id)
    .then(destination=>{
        if(destination){
            res.status(200).json(destination)
        } else {
            res.status(404).json({message: 'Destinations does not exist'})
        }
    })
    .catch(error=>res.status(500).json(error))
})

//Group by 
router.get('/destinationsNumbers', (req, res)=>{
    Travels.groupDestinations()
    .then(destination=>{
        res.status(200).json(destination)
    })
    .catch(error=>res.status(500).json(error))
})

module.exports = router; 

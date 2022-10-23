const knex = require('knex'); 
const config = require('./knexfile'); 
const db = knex(config.development); 

//All users
function getallUsers(){
    return db('users'); 
}

//Add user
async function addUser(user){
    await db('users').insert(user)
    return db('users').where({username:user.username})
}

//Find user by username
function findUserByUsername(username){
    return db('users').where({username:username}).first(); 
}

//Delete user 
function removeUser(id){
    return db('users').where({id:id}).del(); 
}

//Find user by ID
function findUserByID(id){
    return db('users').where({id:id}).first();
}

//all destinations
function getAllDestinations(){
    return db('destinations'); 
}

//Add destination
async function addDestination(newDestination, user_id){
    await db('destinations')
    .where({user_id:user_id})
    .insert(newDestination, ['id'])
}

//Delete destination
function removeDestination(id){
    return db('destinations').where({id:id}).del()
}

//Update destination
function updateDestination(id, newDestination){
    return db('destinations').where({id:id}).update(newDestination)
}

//Find destination by id
function findDestinationById(id){
    return db('destinations').where({id:id}).first();
}

//Group 
function groupDestinations(id){
    return db('destinations').count()
    .groupBy('title')
    .select(
        'destinations:id', 
        'destinations:title',
    )
}
module.exports = {
    getallUsers, 
    addUser, 
    findUserByUsername, 
    removeUser, 
    findUserByID, 
    getAllDestinations, 
    addDestination, 
    removeDestination, 
    updateDestination,
    findDestinationById, 
    groupDestinations
}; 
const express = require('express'); 
const res = require('express/lib/response'); 
const app = express();
const port = 5000; 
const Travels = require('./dbHelpers');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 

//Import routers
const usersRouter = require('./routes/users-routes')
const destinationsRouter = require('./routes/destinations-routes')

//Active(use) routes
app.use('/', usersRouter)
app.use('/', destinationsRouter)


app.get('/', (req, res)=>{
    res.status(200).json({message:"Welcome to the server"});
}); 

app.listen(port, ()=>{
    console.log(`Server running at port http://localhost:${port}`); 
}) 

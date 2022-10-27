const express = require('express'); 
const res = require('express/lib/response'); 
const app = express();
const port = 5000; 
const Travels = require('./dbHelpers');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 

const cors = require('cors')
app.use(cors({origin:"*"}))

// // Add Access Control Allow Origin headers CROSS ORIGIN RESOURCE SHARING
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

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

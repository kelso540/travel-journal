import React,{useEffect,useState} from 'react'
import './App.css';
import {
	BrowserRouter,
	Route, 
	Routes,
} from 'react-router-dom';
import axios from 'axios';
import Destinations from './components/Destinations/Destinations';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Form from './components/Form.js/Form';
// import {UserContext} from './context/UserContext';




function App() {

const baseUrl = 'http://localhost:5000';
const [user, setUser] = useState({});
const [destinations, setDestinations]=useState([]);

useEffect(()=>{
  axios.get(`${baseUrl}/destinations`)
  .then(res=>{
    setDestinations(res.data)
  })
  .catch(err=>console.log(err))
}, [])



  return (
    // <UserContext.Provider>
      <BrowserRouter>
        <Header baseUrl={baseUrl} user={setUser}/>
              <Routes>
                <Route path="/" element={<Destinations destinations={destinations} />}/>
                <Route path="/add-destination" element={<Form/>}/>
              </Routes>
        <Footer/>
      </BrowserRouter>
    // </UserContext.Provider>
  );
}

export default App;
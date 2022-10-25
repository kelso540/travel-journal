import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './header.css';
// import {UserContext} from './context/UserContext';
import {Link} from 'react-router-dom';

export default function Header({baseUrl}) {
  const [user, setUser] = useState({});
  const [signupSuccess,setSignupSuccess]=useState(false);
  const [loggedIn,setLoggedIn]=useState(false);
  const [modal,setModal]=useState(false);
  const [userExists,setUserExists]=useState(true);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [imageUrl,setImageUrl]=useState('');
  const [message,setMessage]=useState('');

  
  

  const handleSignup=(e)=>{
    e.preventDefault()
    axios.post(`${baseUrl}/users/register`, {
    username, password, imageUrl
  })
  .then(res=>{
    setSignupSuccess(true)
    console.log(res.data)
  })
  .catch(err=> console.log(err))
  }
 
  const handleLogin=(e)=>{ 
    e.preventDefault()
    axios.post(`${baseUrl}/users/login`, {
      username, password
    })
    .then(res=>{
      setUser(res.data)
      setLoggedIn(true)
      setModal(false)
    })
    .catch(err=> console.log(err))
  }

  const handleLogout=()=>{
    
  }


  return (
    <div className='header-container'>
      <h1><Link to="/">Travel Diaries</Link></h1>
        {
         loggedIn ?
         <div className='profile-container-loggedin'>
           <div className='img-container'>
            <p>Welcome {username}</p>
            <img src={imageUrl} alt="avatar"/>
           </div>  
           <button className='logout-btn' onClick={handleLogout}>Logout</button>
         </div>
         
         : <div className='profile-container-loggedout'>
             <p>Login to add destinations</p>
             <button className='login-btn' onClick={()=>setModal(!modal)}>Login</button>
           </div>
        }
     

      
      {
        modal ? <div className='header-modal'>
                   <h3 onClick={()=>{setModal(false)}}>X</h3>
           {
              userExists ? <div> 
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                  <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                  <button className='login-btn' type="submit" onChange={(e)=>setImageUrl(e.target.value)}>Submit</button>
                </form>
                <p>Don't have an account? <span onClick={()=>{setUserExists(false)}}>Sign up</span></p>
                {message !== '' ? <p>{message}</p> : null}
              </div>
              : <div> 
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                  <input type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                  <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                  <input type="text" placeholder="Enter image url" onChange={(e)=>setImageUrl(e.target.value)}/>
                  <button className='login-btn' type="submit">Submit</button>
                </form>
                {
                  signupSuccess ? <p style={{"color":"green"}}>Signed up successfully. <span onClick={()=>{setUserExists(true)}}>Login</span></p>
                  : <p>Already have an account? <span onClick={()=>{setUserExists(true)}}>Login</span></p>
                }
                
                
              </div>
           }
        </div> 
        : null
      }

    </div>
  )
}

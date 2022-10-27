import React,{useState,useEffect, useContext} from 'react'
import axios from 'axios';
import './form.css'
import {UserContext} from '../../context/UserContext';

export default function Form({baseUrl}) {

const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [imageUrl,setImageUrl]=useState('')
const {user, setUser} = useContext(UserContext)

const addNewDestination=(e)=>{ 
    e.preventDefault();
   axios.post(`${baseUrl}/users/${user.id}/destinations`, {
     title, description, imageUrl
   })
   .then(res=>{
     console.log(res)
   })
   .catch(err=> console.log(err))
}


  return (
    <div className='add-form-container'>
       <form className="add-destination-form"onSubmit={addNewDestination}>
           <h1>Add new destination</h1>
           <div className='input-container'>
                <label>Destination</label>
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter destination'/>
           </div>
           <div className='input-container'>
                <label>Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Enter description'></textarea>
           </div>
           <div className='input-container'>
                <label>Add Image</label>
                <input value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} placeholder='Enter image url'/>
           </div>
           <button type="submit">Submit</button>
       </form>
       
    </div>
  )
}

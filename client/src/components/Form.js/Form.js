import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './form.css'

export default function Form() {

const [title,setTitle]=useState('')
const [description,setDescription]=useState('')
const [imageUrl,setImageUrl]=useState('')

const addNewDestination=(e)=>{ 
    e.preventDefault();
   
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

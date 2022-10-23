import axios from 'axios'
import React,{useEffect,useState} from 'react'

export default function DestinationCard({destination}) {
  const [userId,setUserId]=useState()


const handleDelete=()=>{
 
}


  return (
    <div className='destination-card'>
        <img className='destination-img' src={destination.imageUrl} alt="destination"/>
        <div className='destination-info'>
            <h1>{destination.title}</h1>
            <p>{destination.description}</p>
        
        </div> 
        <div>
          <button>See details</button>
          {
            userId===destination.user_id ? <button onClick={handleDelete}>delete</button> :null
          }
          
        </div>
        
    </div>
  )
}
 
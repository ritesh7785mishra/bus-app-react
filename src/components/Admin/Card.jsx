import React,{useContext} from 'react'
import './Card.css'
import deleteIcon from "../../assets/delete-bin-7-line.png"
// import { Context } from '../Context'
// import headShot from '../images/girl-photo.jpg'
import { apiKey } from '../../util'
import { adminKey } from '../../util'
import { deleteConductor } from './adminSlice'
import { useDispatch } from 'react-redux'

function Card({id,name,conductorId}) {

const dispatch = useDispatch();

 const handleDelete = (id) => {
    fetch(`https://api.tomtom.com/locationHistory/1/objects/${id}?key=${apiKey}&adminKey=${adminKey}`, { method: 'DELETE' })
    .then( res => res.json())
    .then(data => {
      console.log(data)

      fetch(`http://localhost:8000/data/` + id, {method: 'DELETE'})
      .then(()=> dispatch(deleteConductor(id)))
    })
 }

  return (
    <div className='card'>
        {/* <img className='card__mainImg' src={image?image:headShot} alt="" /> */}
        <h4 className="card__name">{name}</h4>
        <p className='card__designation'>ID:{id}</p>
        <p className="card__designation">ConductorID:{conductorId}</p>
        <button 
        onClick={()=>{handleDelete(id)}}
        className='card__deleteBtn'>
            <img className='card__deleteImg' src={deleteIcon} alt="" />
        </button>
    </div>
  )
}


export default Card
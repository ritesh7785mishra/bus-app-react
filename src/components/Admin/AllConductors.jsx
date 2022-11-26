import React,{useEffect} from 'react'
import './AllConductors.css'
import {useDispatch,useSelector} from 'react-redux'
import {fetchConductors} from './adminSlice'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import {Button} from '@mui/material'


function AllConductors() {
const dispatch = useDispatch()
const admin = useSelector(state => state.admin)
const navigate = useNavigate()

useEffect(()=>{
  dispatch(fetchConductors())
},[])

const cardElements = admin.conductors.map(conductor => (
  <Card 
  key={conductor.id}
  id= {conductor.id}
  name={conductor.name}
  conductorId={conductor.properties.conductorId}

  >
  </Card>
))
  return (
    
    <div className='allConductorBox'>
      <div className="buttonHome">
        <Button variant='contained' onClick={()=>{navigate('/admin')}}>Add Conductor</Button>
        <IconButton color='warning' className='homeBtn' onClick={()=>{navigate('/')}}>
            <HomeIcon  />
        </IconButton>
        
      </div>
      <div className="cardContainer">
        {cardElements}
      </div>
    </div>
  )
}

export default AllConductors

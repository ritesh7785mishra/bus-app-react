import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './Conductor.css'
import BadgeIcon from '@mui/icons-material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import {apiKey} from '../../util'
import {useDispatch, useSelector} from 'react-redux'

function Conductor() {

    const conductor = useSelector(state => state.conductor.currentConductor)
    



    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
            console.log("Latitude in watch position :", position.coords.latitude);
            console.log("Longitude is watch position :", position.coords.longitude);
            console.log('log in watch position',position)

            fetch(`https://api.tomtom.com/locationHistory/1/history/positions?key=${apiKey}`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    "type": "Feature",
                    "geometry": {
                    "type": "Point",
                    "coordinates": [
                        position.coords.latitude,
                        position.coords.longitude,
                        0.0
                    ]
                    },
                    "object": "67c18065-dd5a-4431-aa76-b06eba6b876f",
                    })
                }).then(()=>{console.log('location send request made')})
            });
            }else{
            console.log('location is not available')
             }
        },[])



  return (
    <div className='conductorBox'>
        <div className="nameAndId">
           
            {/* <Button startIcon={<AccountCircleIcon/>} >Ritesh Mishra</Button> */}
            <div className="conductorName">
                <AccountCircleIcon fontSize='large'/>
                <h3 className='nameHead'>
                   {conductor.name ? conductor.name: "Conductor Name"}
                </h3>
                
            </div>
            <div className="conductorId">
                <p className='idHead'>
                    {conductor.properties.conductorId?conductor.properties.conductorId:123456}
                </p>
                <BadgeIcon fontSize='large'/>
            </div>
        </div>
        
        
        <Stack spacing={5}>
            <Stack spacing={2}  >
                 <Button sx={{alignSelf: 'center'}} startIcon={<ShareLocationIcon fontSize='large'/>} variant='contained' className='locationSharing' >Start Sharing Location</Button>
                <Button sx={{alignSelf: 'center'}} startIcon={<LocationOffIcon fontSize='large'/>} variant='contained' className='locationSharing' color='error'>Stop Sharing Location</Button>
            </Stack>
            
            <Stack spacing={3} direction='row'>
                <Button className='spaceIndicationButton' variant='contained' color='error'>Full</Button>
                <Button className='spaceIndicationButton' variant='contained' color='primary'>Standing Space</Button>
                <Button className='spaceIndicationButton' variant='contained' color='success'>Empty Seats</Button>
            </Stack>
        </Stack>
        
    </div>
  )
}

export default Conductor
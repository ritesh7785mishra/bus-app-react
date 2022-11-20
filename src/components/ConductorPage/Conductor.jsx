import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import './Conductor.css'

function Conductor() {
  return (
    <div className='conductorBox'>
        <h3 className="conductorName">
            Ritesh Mishra
        </h3>
        <p className="conductorId">
            3462947
        </p>

        
        <Stack spacing={5}>
            <Button variant='contained' className='locationSharing'>Start Sharing Location</Button>
            <Stack spacing={3} direction='row'>
                <Button variant='contained' color='error'>Full</Button>
                <Button variant='contained' color='primary'>Standing Space</Button>
                <Button variant='contained' color='success'>Empty Seats</Button>
            </Stack>
        </Stack>
        
    </div>
  )
}

export default Conductor
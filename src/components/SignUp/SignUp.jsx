import React from 'react'
import {Box,Stack,TextField,Checkbox,Button} from '@mui/material'
import './SignUp.css'

export default function SignUp() {
  return (
    <Box className='signUpBox'>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account</p>
        <hr></hr>
        <Stack spacing={2} >
            <Stack  direction='row' spacing={2} >
                <TextField size='small' label='First Name' variant='outlined'></TextField>
                <TextField size='small' label='Last Name' variant='outlined'></TextField>
            </Stack>
            <TextField size='small' label='Email' variant='outlined'></TextField>
            <TextField size='small' label='Password' variant='outlined'></TextField>
            <TextField size='small' label='Confirm Password' variant='outlined'></TextField>
            <Stack direction='row'>
              <Checkbox></Checkbox>
              <p>I accept the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a></p>
            </Stack>
            <Stack alignItems='center'>
              <Button variant='contained'>Sign Up</Button>
            </Stack>
            <p>Already have an account? <a href="#">Login here</a></p>
        </Stack>
    </Box>
  )
}

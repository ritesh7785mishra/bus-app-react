
import React from 'react'
import { Box, Stack,InputAdornment, Button, IconButton } from '@mui/material'
import { TextField } from '@mui/material'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

function ConductorLogin() {
  return (
    <Box className='signInBox'>
        <h1>Conductor Login</h1>
        <Stack spacing={3}>
            <TextField 
             size='small' 
             variant='standard'
             label='Email'
             placeholder='Enter your email'
             InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MarkunreadOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField 
             size='large' 
             type='password'
             variant='standard'
             label='Password'
             placeholder='Enter your password'
             InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockPersonOutlinedIcon/>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <p className='forgetPassword'>Forget Password ?</p>
            <button className='loginBtn'>LOGIN</button>

            {/* <Stack>
                <p>Or sign in Using</p>
                <Stack className='iconStack' direction='row' justifyContent='center' spacing={2}>
                    <IconButton size='large' color='primary'>
                        <FacebookOutlinedIcon />
                    </IconButton>
                    <IconButton size='large' color='primary' >
                        <TwitterIcon />
                    </IconButton>
                    <IconButton size='large' color='warning' >
                        <GoogleIcon />
                    </IconButton>
                </Stack>
            </Stack>
            
            <p className='signUpHead'>Or Sign Up Using</p> */}
            
        </Stack>
    </Box>
    
  )
}

export default ConductorLogin
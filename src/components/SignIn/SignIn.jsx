import './SignIn.css'
import React, { useState } from 'react'
import { Box, Stack,InputAdornment, Button, IconButton } from '@mui/material'
import { TextField } from '@mui/material'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const navigate = useNavigate();

  const [loginData , setLoginData] = useState({
    email:"",
    password:''
  })
  const {email,password} = loginData;
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const validation = () =>{
    if(email == "ritesh7785mishra@gmail.com" && password == '@123Ritesh'){
        navigate('/all-conductors')
    }
  }

  
  return (
    <Box className='signInBox'>
        <h1>Login</h1>
        <Stack spacing={3}>
            <TextField 
             size='small' 
             variant='standard'
             label='Email'
             name='email'
             value={email}
             onChange={handleChange}
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
             name='password'
             value={password}
             onChange={handleChange}
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
            <button className='loginBtn' onClick={() => validation()}>LOGIN</button>
            <button className='loginBtn' onClick={() => navigate('./conductor-login')}>CONDUCTOR LOGIN</button>

            <Stack>
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
            
            <p className='signUpHead'>Or Sign Up Using</p>
            <Button>SIGN UP</Button>
        </Stack>
    </Box>
    
  )
}

export default SignIn
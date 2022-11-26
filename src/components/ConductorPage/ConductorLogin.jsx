
import React,{useState} from 'react'
import { Box, Stack,InputAdornment, Button, IconButton } from '@mui/material'
import { TextField } from '@mui/material'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {setCurrentConductor} from './conductorSlice'


function ConductorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin )
  const conductor = useSelector(state => state.conductor)
  console.log(conductor.currentConductor)
  const [conductorLogin, setConductorLogin] = useState({
    email:"",
    password:""
  })
  const {email,password} = conductorLogin

  const handleChange =(e) => {
    setConductorLogin({
      ...conductorLogin,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = () => {
    const currentConductor = admin.conductors.find( conductor => conductor.properties.email === email)
    console.log(admin.conductors,'this is all conductors ')
    if(currentConductor){
      console.log(currentConductor)

      if(currentConductor.properties.password === password){
        dispatch(setCurrentConductor(currentConductor, 'this is current conductor'))
        navigate('/conductor')
      }else{
          alert('Wrong Password')
      }

    }else{
      alert('You are not registered')
    }

  }

  return (
    <Box className='signInBox'>
        <h1>Conductor Login</h1>
        <Stack spacing={3}>
            <TextField 
             size='small'
             value={email}
             name='email'
             onChange={handleChange} 
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
             value={password}
             name='password'
             onChange={handleChange}
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
            <button className='loginBtn' onClick={()=>{handleSubmit()}}>LOGIN</button>
            <button className='loginBtn' onClick={()=>{navigate('/')}}>Return to customer login</button> 
        </Stack>
    </Box>
    
  )
}

export default ConductorLogin
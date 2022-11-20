import { Box, Button, TextField } from '@mui/material'
import React,{useState} from 'react'
import './Admin.css'
import axios from 'axios'
import { Stack } from '@mui/system'

function Admin() {
    const [userName, setUserName] = useState("")
    const[userId, setUserId] = useState(null)

    const [userProperties, setUserProperties] = useState({
        mobileNumber:"",
        email:"",
        aadharNumber:"",
        conductorId:"",
        address:"",
        landmark:"",
        district:"",
        state:"",
        pinCode:"",
        country:"India",
        password:""
    })

    const {mobileNumber,email,aadharNumber,conductorId,address,landmark,district,state,pinCode,country,password} = userProperties


    function handleChange(e){
        setUserProperties({
            ...userProperties,
            [e.target.name] : e.target.value
        })
    }

    function handleNameChange(e){
        setUserName(e.target.value)
        // console.log(userName)
    }

    function handleSubmit(){
        let userObj = {name:userName,properties:{...userProperties}}
        let id;

        fetch("https://api.tomtom.com/locationHistory/1/objects/object?key=BDPPjyvXBVAzxOAGcWRV98qIHP978rko&adminKey=JDKUpg4BO1ZDPfGSrqG0QlbrmBYOhlfwDw0WlrCytJUo5IyO",{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log("This is the returned user id",data.id)
            userObj={...userObj,objectId:data.id}
            console.log(userObj)


            fetch("http://localhost:3000/data",{
             method:'POST',
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(userObj)
            })  
        } )


        
    }

  return (
    <div className="adminBox">
        <h1>Admin</h1>
        <Stack spacing={2}>
            <TextField value={userName} name='name' onChange={(e)=>handleNameChange(e)} label='Name' variant='outlined' size='small'></TextField>
            <TextField value={mobileNumber} name='mobileNumber' onChange={(e)=>handleChange(e)} label='Mobile Number' variant='outlined' size='small'></TextField>
            <TextField value={email} name='email' onChange={(e)=>handleChange(e)} label='Email' variant='outlined' size='small'></TextField>
            <TextField value={aadharNumber} name='aadharNumber' onChange={(e)=>handleChange(e)} label='Aadhar Number' variant='outlined' size='small'></TextField>
            <TextField value={conductorId} name='conductorId' onChange={(e)=>handleChange(e)} label='Conductor ID' variant='outlined' size='small'></TextField>
            <hr></hr>

            <h3 className='addressHeadline'>Address</h3>
            <TextField value={address} name='address' onChange={(e)=>handleChange(e)} label='Full Address' variant='outlined' size='small'></TextField>

            <TextField value={landmark} name='landmark' onChange={(e)=>handleChange(e)} label='Landmark' variant='outlined' size='small'></TextField>

            <TextField value={district} name='district' onChange={(e)=>handleChange(e)} label='District' variant='outlined' size='small'></TextField>
            <TextField value={state} name='state' onChange={(e)=>handleChange(e)} label='State' variant='outlined' size='small'></TextField>
            <TextField value={pinCode} name='pinCode' onChange={(e)=>handleChange(e)} label='Pincode' variant='outlined' size='small'></TextField>
            <TextField value={country} name='country' onChange={(e)=>handleChange(e)} label='Country' variant='outlined' size='small'></TextField>
            <TextField value={password} name='password' onChange={(e)=>handleChange(e)} label='Password' variant='outlined' size='small'></TextField>

            <Button onClick={handleSubmit}> Add Details to Server</Button>

        </Stack>

    </div>
  )
}

export default Admin
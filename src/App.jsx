
import './App.css'
import Admin from './components/Admin/Admin'
import AllConductors from './components/Admin/AllConductors'
// import { Test } from './components/Admin/test'
import Conductor from './components/ConductorPage/Conductor'
import ConductorLogin from './components/ConductorPage/ConductorLogin'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { useDispatch } from 'react-redux'
import { fetchConductors } from './components/Admin/adminSlice'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'


function App() {
  const dispatch = useDispatch()
  useState(()=>{
    dispatch(fetchConductors())
  },[])
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element ={<SignIn/>}/>
          <Route exact path = "/signup" element ={<SignUp/>}/>
          <Route exact path = "/home" element ={<Home/>}/>
          <Route exact path = "/admin" element ={<Admin/>}/>
          <Route exact path = "/conductor-login" element ={<ConductorLogin/>}/>
          <Route exact path = "/conductor" element ={<Conductor/>}/>
          <Route exact path = "/all-conductors" element={<AllConductors/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

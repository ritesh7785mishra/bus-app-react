
import './App.css'
import Admin from './components/Admin/Admin'
import Conductor from './components/ConductorPage/Conductor'
import ConductorLogin from './components/ConductorPage/ConductorLogin'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'

function App() {
  
  return (
    <div className="App">
     <SignUp/>
     <SignIn/>
     <Home/>
     <Admin/>
     <ConductorLogin/>
     <Conductor/>
    </div>
  )
}

export default App

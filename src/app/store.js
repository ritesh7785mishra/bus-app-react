import {configureStore} from '@reduxjs/toolkit'
import adminReducer from '../components/Admin/adminSlice'
import conductorReducer from '../components/ConductorPage/conductorSlice'


const store = configureStore({
    reducer:{
       admin: adminReducer,
       conductor: conductorReducer, 
    }
})

export default store
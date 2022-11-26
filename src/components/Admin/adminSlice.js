import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    conductors: [],
    error: ''
}


export const fetchConductors = createAsyncThunk('admin/fetchConductors',()=>{
    return fetch('http://localhost:8000/data')
            .then(res => res.json())
            .then(data => data)           
})




const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers:{
        addConductor: (state,action) => {
            state.conductors.push(action.payload)
            console.log("User Added Successfully", state.conductors)
        },
        deleteConductor: (state,action) => {
            state.conductors = state.conductors.filter((conductor)=> conductor.id !== action.payload)
            console.log(state.conductors)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConductors.pending, state =>{
            state.loading = true;
        })
        builder.addCase(fetchConductors.fulfilled,(state,action)=>{
            state.loading = false,
            state.conductors = action.payload,
            state.error = ''
        })
        builder.addCase(fetchConductors.rejected, (state,action)=>{
            state.loading = false,
            state.conductors = [],
            state.error = action.error.message
        })
    }
})

export const { addConductor,deleteConductor} = adminSlice.actions;
export default adminSlice.reducer
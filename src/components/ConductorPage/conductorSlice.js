import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentConductor: {}
}

const conductorSlice = createSlice({
    name:'conductor',
    initialState: initialState,
    reducers: {
        setCurrentConductor:(state, action) => {
            state.currentConductor = action.payload;
        },
        removeCurrentConductor: (state) => {
            state.currentConductor = {}
        }
    }
})

export const {setCurrentConductor} = conductorSlice.actions
export default conductorSlice.reducer
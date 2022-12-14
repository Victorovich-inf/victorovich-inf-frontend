import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    city: [],
    cityRequestedCount: 0,
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
            state.cityRequestedCount = ++state.cityRequestedCount
        },
    }
    })

export const {setCity} = citySlice.actions

export default citySlice.reducer


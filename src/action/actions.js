import { createSlice } from "@reduxjs/toolkit";

export const perpustakaanSLice = createSlice({
    name:"perpustakaan",
    initialState:{
        token: "",
        username: "",
        password: "",
        profileName: "",
        address: "",
    },
    reducers: {
        setToken: (state, actions) => {
            state.token = actions.payload
        },
        setUsername: (state, actions) => {
            state.username = actions.payload
        },
        setPassword: (state, actions) => {
            state.password = actions.payload
        },
        setProfileName: (state, actions) => {
            state.profileName = actions.payload
        },
        setAddress: (state, actions) => {
            state.address = actions.payload
        },
        
    }
})

export const {
    setToken,
    setUsername,
    setPassword,
    setProfileName,
    setAddress,
   

} = perpustakaanSLice.actions

export default perpustakaanSLice.reducer
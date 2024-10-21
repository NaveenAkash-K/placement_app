import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        email: null,
        jwtToken: null,
        username: null,
        role: null,
        userId: null,
    },
    reducers: {
        updateUserDetails: (state, action) => {
            console.log("action.payload.email")
            console.log(action.payload.email)
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.jwtToken = action.payload.jwtToken;
            state.username = action.payload.name;
            state.role = action.payload.role;
            state.userId = action.payload.userId;
        }
    }
});

export const {updateUserDetails} = authSlice.actions;

export default authSlice.reducer;

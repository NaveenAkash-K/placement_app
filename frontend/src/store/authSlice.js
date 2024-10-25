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
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.jwtToken = action.payload.jwtToken;
            state.username = action.payload.name;
            state.role = action.payload.role;
            state.userId = action.payload.userId;
        },
        clearAuthDetails: (state) => {
            state.isAuthenticated = null
            state.email = null
            state.jwtToken = null
            state.username = null
            state.role = null
            state.userId = null
        }
    }
});

export const {updateUserDetails, clearAuthDetails} = authSlice.actions;

export default authSlice.reducer;

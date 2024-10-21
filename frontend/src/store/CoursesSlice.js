import {createSlice} from '@reduxjs/toolkit';

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        unregisteredCourses: [],
        registeredCourses: [],
    },
    reducers: {
        updateCourses: (state, action) => {
            state.registeredCourses = action.payload.registeredCourses;
            state.unregisteredCourses = action.payload.unregisteredCourses;
        },
    }
});

export const {updateCourses} = coursesSlice.actions;

export default coursesSlice.reducer;

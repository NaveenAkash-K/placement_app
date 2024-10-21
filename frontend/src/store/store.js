import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import coursesReducer from './CoursesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
    }
});

export default store;
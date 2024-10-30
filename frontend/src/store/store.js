import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web
import authReducer from './authSlice';
import coursesReducer from './coursesSlice';
import quizReducer from './quizSlice';

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
};
// Wrap coursesReducer with persistReducer
const persistedCoursesReducer = persistReducer(persistConfig, coursesReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedQuizReducer = persistReducer(persistConfig, quizReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: {
        courses: persistedCoursesReducer,
        auth: persistedAuthReducer,
        quiz: persistedQuizReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };

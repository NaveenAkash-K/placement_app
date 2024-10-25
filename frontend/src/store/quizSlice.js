import {createSlice} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'

const quizSlice = createSlice({
    name: 'quiz',
    initialState: [],
    reducers: {
        addQuestion: (state) => {
        },
        answerQuestion: (state) => {
        }
    }
});

export const {addQuestion, answerQuestion} = quizSlice.actions;

export default quizSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist'

const quizSlice = createSlice({
        name: 'quiz',
        initialState: {
            selectedQuestion: 0,
            questions: []
        },
        reducers: {
            initializeQuestions: (state, action) => {
                state.questions = action.payload.map(question => {
                    return {
                        questionId: question.questionId,
                        questionText: null,
                        time: question.time,
                        isCompleted: false,
                        isAttended: false,
                        isFetched: false,
                        options: [],
                        selectedAnswers: []
                    }
                })
            },
            updateSelectedQuestion: (state, action) => {
                state.selectedQuestion = action.payload
            },
            updateQuestion: (state, action) => {
                state.questions = state.questions.map(question => {
                    if (question.questionId === action.payload.questionId) {
                        return {
                            ...question,
                            questionText: action.payload.question,
                            options: action.payload.options,
                            isFetched: true,
                        }
                    }
                    return question;
                })
            },
            addQuestion: (state, action) => {
            },
            answerQuestion: (state, action) => {
                state.questions = state.questions.map(question => {
                    if (question.questionId === action.payload.questionId) {
                        return {
                            ...question,
                            selectedAnswers: [action.payload.answer],
                            isAttended: true,
                        }
                    }
                    return question;
                })
            },
            completeQuestion: (state, action) => {
                state.questions = state.questions.map(question => {
                    if (question.questionId === action.payload.questionId) {
                        return {
                            ...question,
                            isCompleted: true,
                        }
                    }
                    return question;
                })
            }
        }
    })
;

export const {
    addQuestion,
    answerQuestion,
    initializeQuestions,
    updateSelectedQuestion,
    updateQuestion,
    completeQuestion
} = quizSlice.actions;

export default quizSlice.reducer;

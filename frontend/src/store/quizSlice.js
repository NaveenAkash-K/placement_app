import {createSlice} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist'

const quizSlice = createSlice({
        name: 'quiz',
        initialState: {
            selectedQuestion: 0,
            startTime: null,
            questions: []
        },
        reducers: {
            initializeQuestions: (state, action) => {
                state.startTime = action.payload.startTime;
                state.questions = action.payload.questions.map(question => {
                    if (question.isFetched) {
                        return {
                            questionId: question.question,
                            questionText: question.text,
                            time: question.time,
                            isCompleted: true,
                            isAttended: true,
                            isFetched: true,
                            options: question.options,
                            selectedAnswers: question.userAnswer,
                            isCheckBox: question.isCheckBox
                        }
                    } else {
                        return {
                            questionId: question.question,
                            questionText: null,
                            time: question.time,
                            isCompleted: false,
                            isAttended: false,
                            isFetched: false,
                            options: [],
                            selectedAnswers: []
                        }
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
                            isCheckBox: action.payload.isCheckBox
                        }
                    }
                    return question;
                })
            },
            clearQuiz: () => {
                return {
                    selectedQuestion: 0,
                    questions: []
                };
            },
            answerQuestion: (state, action) => {
                state.questions = state.questions.map(question => {
                    if (question.questionId === action.payload.questionId) {
                        if (question.isCheckBox) {
                            if(question.selectedAnswers.includes(action.payload.answer)){
                                return {
                                    ...question,
                                    selectedAnswers: question.selectedAnswers.filter(item => item !== action.payload.answer),
                                    isAttended: true,
                                }
                            } else {
                                return {
                                    ...question,
                                    selectedAnswers: [...question.selectedAnswers, action.payload.answer],
                                    isAttended: true,
                                }
                            }
                        } else {
                            return {
                                ...question,
                                selectedAnswers: [action.payload.answer],
                                isAttended: true,
                            }
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
            },
        }
    })
;

export const {
    clearQuiz,
    answerQuestion,
    initializeQuestions,
    updateSelectedQuestion,
    updateQuestion,
    completeQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;

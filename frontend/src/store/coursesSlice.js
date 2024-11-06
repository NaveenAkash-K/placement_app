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
        completeSection: (state, action) => {
            console.log("Hello");
            console.log(action.payload);

            const { courseId, sectionNumber } = action.payload;

            state.registeredCourses = state.registeredCourses.map(course => {
                if (course.course.courseId === courseId) {
                    return {
                        ...course,
                        section: course.section.map(section => {
                            // Match the section by sectionNo, not by index
                            if ((section.sectionNo - 1) === sectionNumber) {
                                return {
                                    ...section,
                                    isCompleted: true,
                                };
                            } else {
                                return section;
                            }
                        })
                    };
                } else {
                    return course;
                }
            });
        }

    }
});

export const {updateCourses, completeSection} = coursesSlice.actions;

export default coursesSlice.reducer;

import React, {useEffect, useLayoutEffect} from "react";
import {BrowserRouter, createBrowserRouter, RouterProvider, useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import styles from "./App.css"
import Nav from "./components/common/Nav";
import StudentPage from "./pages/student/StudentPage";
import AdminPage from "./pages/admin/AdminPage";
import QuizPage from "./pages/student/QuizPage";
import CourseSectionsPage from "./pages/student/CourseSectionsPage";
import CourseContentPage from "./pages/student/CourseContentPage";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import checkAuthAPI from "./apis/common/checkAuthAPI";
import TestInstructionsPage from "./pages/student/TestInstructionsPage";
import TestResultPage from "./pages/student/TestResultPage";
import CoursePage from "./pages/admin/CoursePage";
import ErrorPage from "./pages/common/ErrorPage";
import getCoursesAPI from "./apis/student/getCoursesAPI";
import {updateCourses} from "./store/coursesSlice";
import {useDispatch, useSelector} from "react-redux";
import ForgetPasswordPage from "./pages/common/ForgetPasswordPage";
import ListOfSessionsPage from "./pages/admin/ListOfSessionsPage";
import SessionAnswersPage from "./pages/admin/SessionAnswersPage";

const router = createBrowserRouter([
    {
        path: "/auth",
        children: [
            {
                path: "login",  // /auth/login
                element: <>
                    <Nav/>
                    <LoginPage/>,
                </>
            },
            {
                path: "forget-password/:token",
                element: <>
                    <Nav/>
                    <ForgetPasswordPage/>
                </>
            }
        ],
    },
    {
        path: "/student",
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "home",
                element: <>
                    <Nav/>
                    <StudentPage/>
                </>,
            },
            {
                path: "course/:courseId/:sectionNumber/quiz",
                element: <>
                    <QuizPage/>
                </>
            },
            {
                path: "course/:courseId/:sectionNumber/quiz/instructions",
                element: <>
                    <Nav/>
                    <TestInstructionsPage/>
                </>
            },
            {
                path: "course/:courseId/:sectionNumber/quiz/result",
                element: <>
                    <Nav/>
                    <TestResultPage/>
                </>
            },
            {
                path: "course/:courseId/sections",
                element: <>
                    <Nav/>
                    <CourseSectionsPage/>
                </>
            },
            {
                path: "course/:courseId/sections/:sectionNumber",
                element: <>
                    <Nav/>
                    <CourseContentPage/>
                </>
            },
        ]
    },
    {
        path: "/admin",
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "home",
                element: <>
                    <Nav/>
                    <AdminPage/>
                </>
            },
            {
                path: "course/:courseId",
                element: <>
                    <Nav/>
                    <CoursePage/>
                </>
            },
            {
                path: "course/:courseId/sections/:sectionNumber",
                element: <>
                    <Nav/>
                    <CourseContentPage/>
                </>
            },
            {
                path: "course/:courseId/:studentId/sessions",
                element: <>
                    <Nav/>
                    <ListOfSessionsPage/>
                </>
            },
            {
                path: "course/:courseId/:studentId/session/:sessionId/answers",
                element: <>
                    <Nav/>
                    <SessionAnswersPage/>
                </>
            }

        ]
    },
]);

function App() {
    const dispatch = useDispatch()
    const unregisteredCourses = useSelector(state => state.courses.unregisteredCourses)
    const registeredCourses = useSelector(state => state.courses.registeredCourses)


    useEffect(() => {
        if (!localStorage.getItem("jwtToken") && !router.state.location.pathname.startsWith("/auth/forget-password")) {
            console.log("Hello")
            console.log(router.state.location.pathname)
            router.navigate("/auth/login");
            return;
        }
        if (localStorage.getItem("jwtToken")) {
            checkAuthAPI().then().catch(error => {
                toast("Session Expired! Please login again", {type: "warning"});
                localStorage.clear();
                router.navigate("/auth/login");
            })
        }
    }, []);

    useLayoutEffect(() => {
        if (router.state.location.pathname === "/") router.navigate("/auth/login");
    }, []);

    useEffect(() => {
        if (localStorage.getItem("role") === "student") {
            const fetchCourses = async () => {
                try {
                    const response = await getCoursesAPI();
                    dispatch(updateCourses(response.data));
                } catch (error) {
                    console.error("Error fetching courses in App.js", error);
                }
            };

            fetchCourses();
        }
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <RouterProvider router={router}/>
            <ToastContainer theme="dark" draggable position={"top-center"}/>
        </div>
    );
}

export default App;

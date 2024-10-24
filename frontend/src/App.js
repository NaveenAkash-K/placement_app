import React, {useLayoutEffect} from "react";
import {BrowserRouter, createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
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
import checkAuthAPI from "./apis/checkAuthAPI";
import TestInstructionsPage from "./components/student/TestInstructionsPage";

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
        ],
    },
    {
        path: "/student",
        children: [
            {
                path: "home",
                element: <>
                    <Nav/>
                    <StudentPage/>
                </>,
            },
            {
                path: "quiz",
                element: <>
                    <Nav/>
                    <QuizPage/>
                </>
            },
            {
                path: "quiz/instructions",
                element: <>
                    <Nav/>
                    <TestInstructionsPage/>
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
            }
        ]
    },
    {
        path: "/admin",
        children: [
            {
                path: "home",
                element: <>
                    <Nav/>
                    <AdminPage/>
                </>
            },
        ]
    },
]);

function App() {
    useLayoutEffect(() => {
        checkAuthAPI().then().catch(error => {
            console.log(error)
            toast("Session Expired! Please login again", {type: "warning"});
            localStorage.clear();
            router.navigate("/auth/login");
        })
    }, []);

    return (
        <div className={styles.app}>
            <RouterProvider router={router}/>
            <ToastContainer theme="dark" draggable position={"top-center"}/>
        </div>
    );
}

export default App;

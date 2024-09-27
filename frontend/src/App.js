import React from "react";
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import styles from "./App.css"
import Nav from "./components/common/Nav";
import StudentPage from "./pages/student/StudentPage";
import AdminPage from "./pages/admin/AdminPage";
import QuizPage from "./pages/student/QuizPage";

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
                path: "home/:id",
                element: <>
                    <Nav/>
                    <StudentPage/>
                </>
            },
            {
                path: "quiz",
                element: <>
                    <Nav />
                    <QuizPage />
                </>
            },
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
    return (
        <div className={styles.app}>
            {/*<Nav/>*/}
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;

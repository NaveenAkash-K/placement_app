import React from "react";
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/common/LoginPage";
import styles from "./App.css"
import Nav from "./components/common/Nav";
import StudentPage from "./pages/student/StudentPage";

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

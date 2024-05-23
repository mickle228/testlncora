import {createBrowserRouter, Navigate} from "react-router-dom";

import {UsersPage} from "./pages/UsersPage";
import {MainLayout} from "./layouts";

const router = createBrowserRouter([
        {
            path: '', element: <MainLayout/>, children: [
                {
                    index: true, element: <Navigate to={'users'}/>
                },
                {
                    path: 'users', element: <UsersPage/>
                }
            ]
        }
    ])
;

export {
    router
}
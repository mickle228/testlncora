import {createBrowserRouter, Navigate} from "react-router-dom";

import {PostDetailsPage, PostsPage, UsersPage} from "./pages";
import {MainLayout} from "./layouts";

const router = createBrowserRouter([
        {
            path: '', element: <MainLayout/>, children: [
                {
                    index: true, element: <Navigate to={'users'}/>
                },
                {
                    path: 'users', element: <UsersPage/>
                },
                {
                    path: 'user/:id/posts', element: <PostsPage/>
                },
                {
                    path: 'posts/:id', element: <PostDetailsPage/>
                }
            ]
        }
    ])
;

export {
    router
}
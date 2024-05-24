import {configureStore} from "@reduxjs/toolkit";

import {commentReducer, postReducer, userReducer} from "./slices";

const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
        comments: commentReducer
    }
})

export {
    store
}
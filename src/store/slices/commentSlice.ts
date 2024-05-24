import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IComment} from "../../interfaces";
import {commentService} from "../../services";

interface IState {
    comments: IComment[],
}

const initialState: IState = {
    comments: [],
};

const getById = createAsyncThunk<IComment[], { id:number }>(
    'commentSlice/getAllByUserId',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await commentService.getById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.comments = action.payload
            })
})

const {reducer: commentReducer, actions} = commentSlice;

const commentActions = {
    ...actions,
    getById,
}

export {
    commentReducer,
    commentActions
}
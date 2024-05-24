import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IPost} from "../../interfaces";
import {postService} from "../../services";

interface IState {
    posts: IPost[],
    modalStatus: boolean;
    postForUpdate: IPost | null;
}

const initialState: IState = {
    posts: [],
    modalStatus: false,
    postForUpdate: null
};

const getAllByUserId = createAsyncThunk<IPost[], { id: number }>(
    'postSlice/getAllByUserId',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await postService.getAllById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<IPost, { item: IPost }>(
    'postSlice/create',
    async ({item}, {rejectWithValue}) => {
        try {
            const {data} = await postService.create(item);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const update = createAsyncThunk<IPost, { id: number, item: IPost }>(
    'postSlice/update',
    async ({id, item}, {rejectWithValue}) => {
        try {
            const {data} = await postService.update(id, item);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        setModalStatus: (state, action) => {
            state.modalStatus = action.payload;
        },
        setPostForUpdate: (state, action) => {
            state.postForUpdate = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAllByUserId.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.posts = [...state.posts, action.payload];
                console.log(state.posts);
            })
            .addCase(update.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
                state.postForUpdate = action.payload;
            })
});

const {reducer: postReducer, actions} = postSlice;

const postActions = {
    ...actions,
    getAllByUserId,
    create,
    update
};

export {
    postReducer,
    postActions,
};

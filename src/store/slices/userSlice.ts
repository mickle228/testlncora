import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IUser} from "../../interfaces";
import {userService} from "../../services";

interface IState {
    users: IUser[],
}

const initialState: IState = {
    users: [],
};

const getAll = createAsyncThunk<IUser[], void>(
    'userSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload
            })
})

const {reducer: userReducer, actions} = userSlice;

const userActions = {
    ...actions,
    getAll,
}

export {
    userReducer,
    userActions
}
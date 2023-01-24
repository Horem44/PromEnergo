import {createSlice} from "@reduxjs/toolkit";

export interface paginatorSlice {
    count: number;
}

const initialState: paginatorSlice = {
    count: 0,
}

const paginatorSlice = createSlice({
    name: 'paginator',
    initialState: initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },

    }
});

export const paginatorActions = paginatorSlice.actions;

export default paginatorSlice;
import {createSlice} from "@reduxjs/toolkit";

export type uiSlice = {
    productsFilterMenuIsVisible: boolean;
}

const initialState: uiSlice = {
    productsFilterMenuIsVisible: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        closeProductsFilterMenu: (state) => {
            state.productsFilterMenuIsVisible = false;
        },
        toggleProductsFilterMenu: (state) => {
            state.productsFilterMenuIsVisible = !state.productsFilterMenuIsVisible;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
import {createSlice} from "@reduxjs/toolkit";

export interface uiSlice {
    productsFilterMenuIsVisible: boolean;
    isLoading: boolean;
}

const initialState: uiSlice = {
    productsFilterMenuIsVisible: true,
    isLoading: false
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
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
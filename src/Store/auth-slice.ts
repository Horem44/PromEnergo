import {createSlice} from "@reduxjs/toolkit";

interface authSlice {
    isAuth: boolean;
    isAdmin: boolean;
}

const initialAuthState:authSlice =  {
    isAuth: false,
    isAdmin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            state.isAuth = false;
        },
        loginAdmin: (state) => {
            state.isAuth = true;
            state.isAdmin = true;
        },
        logoutAdmin: (state) => {
            state.isAuth = false;
            state.isAdmin = false;
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice;
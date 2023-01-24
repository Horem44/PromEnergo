import {createSlice} from "@reduxjs/toolkit";

interface authSlice {
    isAuth: boolean;
}

const initialAuthState:authSlice =  {
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },
        logout: (state) => {
            console.log(document.cookie);
            document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            console.log(document.cookie);
            state.isAuth = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;
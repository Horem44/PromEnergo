import {Action, AnyAction, createSlice, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "./index";

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

export const logoutRequest = () => {
    return async (dispatch: any) => {
        dispatch(authActions.logoutAdmin());
        try{
            await fetch('http://localhost:8080/users/logout', {credentials: 'include'})
        }catch (err){
            console.log(err);
        }
    }
}

export const authActions = authSlice.actions;

export default authSlice;
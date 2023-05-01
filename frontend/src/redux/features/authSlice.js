import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    token: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: action.payload.name,
                    token: action.payload.token,
                })
            );
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        logout: (state) => {
            localStorage.clear();
            state.name = null;
            state.token = null;
        },
    }
})

export const selectAuth = (state) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
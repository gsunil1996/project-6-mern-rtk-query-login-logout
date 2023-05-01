import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (payload) => ({
                url: "/api/login",
                method: "post",
                body: payload
            })
        }),
        registerUser: builder.mutation({
            query: (payload) => ({
                url: "/api/register",
                method: "post",
                body: payload
            })
        })
    })
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
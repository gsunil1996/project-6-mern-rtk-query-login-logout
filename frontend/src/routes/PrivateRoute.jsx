import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from '../redux/features/authSlice';

const PrivateRoute = () => {
    // const { token } = useSelector(selectAuth);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
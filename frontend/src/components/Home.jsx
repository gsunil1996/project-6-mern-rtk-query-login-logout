import React from 'react'
import { logout, selectAuth } from '../redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Home = () => {
    const { name } = useSelector(selectAuth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("User Logout Successfully");
        navigate("/login");
    };

    return (
        <div>
            <h1>Home Page</h1>
            <Card>
                <CardContent>
                    <h4>Name: {name}</h4>
                    <Button variant="contained" fullWidth onClick={() => handleLogout()} >Logout</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../api/authApi';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/authSlice';
import { CircularProgress } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [
        loginUser,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError,
            isLoading: loginLoading
        },
    ] = useLoginUserMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser({ email, password });
    }

    useEffect(() => {
        if (isLoginSuccess) {
            toast.success("User Login Successfully");
            dispatch(
                setUser({
                    name: `${loginData?.user?.firstName} ${loginData?.user?.lastName}`, token: loginData?.token
                })
            );
            navigate("/");
        }

        if (isLoginError) {
            toast.error(loginError?.data?.message);
        }

    }, [isLoginSuccess, isLoginError]);

    return (
        <div>
            <h1>Login</h1>
            <Card style={{ maxWidth: "max-content", margin: "auto", border: "0.5px solid #00203FFF" }} >
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <TextField id="outlined-basic" label="Email" variant="outlined" required type='email'
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div style={{ marginTop: "15px", marginBottom: "15px" }} >
                            <TextField id="outlined-basic" label="Password" variant="outlined" required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Button type='submit' variant="contained" fullWidth >
                                {loginLoading ? <div> <CircularProgress style={{ color: "#fff" }} /> </div> :
                                    " Login"
                                }
                            </Button>
                        </div>
                    </form>
                    <div>
                        <h4>New user ?</h4>
                        <div>
                            <Button color='secondary' variant="contained" fullWidth onClick={() => navigate("/register")} > Register </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
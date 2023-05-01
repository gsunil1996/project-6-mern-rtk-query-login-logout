import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from '../api/authApi';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/authSlice';
import { CircularProgress } from '@mui/material';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [
        registerUser,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        },
    ] = useRegisterUserMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser({ firstName, lastName, email, password });
    }

    console.log("checkingRegister", data, error)

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Registered Successfully");
            dispatch(
                setUser({
                    name: `${data?.newUser?.firstName} ${data?.newUser?.lastName}`, token: data?.token
                })
            );
            navigate("/");
        }

        if (isError) {
            toast.error(error?.data?.message);
        }

    }, [isSuccess, error]);

    return (
        <div>
            <h1>Register</h1>
            <Card style={{ maxWidth: "max-content", margin: "auto", border: "0.5px solid #00203FFF" }} >
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <TextField id="outlined-basic" label="First Name" variant="outlined" required
                                onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div style={{ marginTop: "15px", marginBottom: "15px" }} >
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" required
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div style={{ marginTop: "15px", marginBottom: "15px" }} >
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
                                {isLoading ? <div> <CircularProgress style={{ color: "#fff" }} /> </div> :
                                    "Register"
                                }
                            </Button>
                        </div>
                    </form>
                    <div>
                        <h4>Already Account ?</h4>
                        <div>
                            <Button color='secondary' variant="contained" fullWidth
                                onClick={() => navigate("/login")} > Login </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register
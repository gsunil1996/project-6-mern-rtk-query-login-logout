import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import PrivateRoute from './routes/PrivateRoute';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // console.log(user?.token, "localStorage")

  useEffect(() => {
    dispatch(setUser(user));
  }, [user, dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

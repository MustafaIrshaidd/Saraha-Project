import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Loader from "./Components/Loader/Loader";
import GetUsers from "./Components/GetUsers/GetUsers";
import UserProfile from "./Components/UserProfile/UserProfile";
import MyProfile from "./Components/MyProfile/MyProfile";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";



import { Route, Routes } from "react-router-dom";
import cookies from "react-cookies"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"

import { useEffect, useState } from "react";
import axios from "axios";




function App() {
  const [user,setUser]= useState(cookies.load("token"))
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const result = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers"
    );

    setTimeout(() => {
      setLoader(false);
      setUsers(result.data);
    }, 1000);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loader ? (
        <Loader />
      ) : (
        <Routes>
          {user ? (
            <>
              <Route
                path="/messages"
                element={<MyProfile user={user} users={users} />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/forget-password" element={<ForgetPassword />}></Route>
              <Route path="/reset-password/:email" element={<ResetPassword />}></Route>
              <Route
                path="/login"
                element={<Login logUser={setUser} />}
              ></Route>
              <Route path="" element={<Home />}></Route>
            </>
          )}
          <Route path="/allusers" element={<GetUsers users={users} />}></Route>
          <Route
            path="/profile/:id"
            element={<UserProfile users={users} />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;

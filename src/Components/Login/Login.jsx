import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies"
import LoaderBtn from "../LoaderBtn/LoaderBtn";


const Login = ({logUser}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorsList, setErrorsList] = useState([]);
  const navigate=useNavigate();
  const [loader,setLoader]=useState(false);

  const validateUser = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: false });
  };

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoader(true);
    

    const validation = validateUser();
    const error = [];

    if (validation.error) {
      validation.error.details.map((err) => error.push(err.message));
      setErrorsList(error);
      setLoader(false);
    } else {
      setErrorsList([]);
      try {
        
        const result = await axios.post(
          "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
          user
        );
        if (result.data.message === "success") {
          
          const expires = new Date();
          const futureDay = expires.getDate()+1;
          expires.setDate(futureDay)
          cookie.save("token",result.data.token,{expires})
          logUser(result.data.token)
          navigate("/messages");
          setLoader(false);

        } else if (result.data.message === "validation error") {
          result.data.err.map((err) => error.push(err[0].message));
          setErrorsList(error);
          setLoader(false);
          
        } else {
          console.log("password incorrect");
          setLoader(false);
        } 
      } catch (exception) {
        console.log("email does not exist");
        setLoader(false);
        
      }
      setLoader(false);
      
    }
  };

  return (
    <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Login</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    {errorsList.map((err) => (
        <div class="alert alert-danger" role="alert">
          {err}
        </div>
      ))}
    <form method="POST" action="/handleLogin">
      <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={onChange}  />
      <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" onChange={onChange} />
      {loader? <LoaderBtn/> : <button type="submit" className="btn btn-default-outline my-4 w-100 rounded" onClick={submitForm}>Login</button>}
      <p><Link className="text-muted forgot btn" to="/forget-password">I Forgot My Password</Link></p>
      <Link className="btn btn-default-outline" to="/register">Register</Link>
    </form>
  </div>
</div>

  );
};

export default Login;

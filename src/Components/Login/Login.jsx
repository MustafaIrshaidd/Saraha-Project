import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorsList, setErrorsList] = useState([]);

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

    const validation = validateUser();
    const error = [];

    if (validation.error) {
      validation.error.details.map((err) => error.push(err.message));
      setErrorsList(error);
    } else {
      setErrorsList([]);
      try {
        const result = await axios.post(
          "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
          user
        );
        if (result.data.message === "success") {
          console.log(result.data.token);
        } else if (result.data.message === "validation error") {
          result.data.err.map((err) => error.push(err[0].message));
          setErrorsList(error);
        } else {
          console.log("password incorrect");
        } 
      } catch (exception) {
        console.log("email does not exist");
      }
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
      <button type="submit" className="btn btn-default-outline my-4 w-100 rounded" onClick={submitForm}>Login</button>
      <p><Link className="text-muted forgot btn" to="/">I Forgot My Password</Link></p>
      <Link className="btn btn-default-outline" to="register">Register</Link>
    </form>
  </div>
</div>

  );
};

export default Login;

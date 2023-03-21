import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import LoaderBtn from "../LoaderBtn/LoaderBtn";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });
  const [errorsList, setErrorsList] = useState([]);

  const [loader, setLoader] = useState(false);

  const validateUser = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      cPassword: Joi.string().required(),
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
          "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",
          user
        );

        if (result.data.message === "success") {
          cookie.save("token", result.data.token);
          toast.success("Regestered Successfully")
          setLoader(false);
        } else if (result.data.message === "validation error") {
          result.data.err.map((err) => error.push(err[0].message));
          setErrorsList(error);
          setLoader(false);
        } else {
          toast.warning("Password is incorrect");
          setLoader(false);
        }
      } catch (exception) {
        toast.warning("Email does not exist");
        setLoader(false);
      }
      setLoader(false);
    }
  };

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        {errorsList.map((err) => (
          <div class="alert alert-danger" role="alert">
            {err}
          </div>
        ))}
        <form method="POST" action="/handleLogin">
          <input
            className="form-control my-4"
            placeholder="Enter your email"
            type="text"
            name="email"
            onChange={onChange}
          />
          <input
            className="form-control my-4"
            placeholder="Enter your name"
            type="text"
            name="name"
            onChange={onChange}
          />
          <input
            className="form-control my-4 "
            placeholder="Enter your Password"
            type="password"
            name="password"
            onChange={onChange}
          />
          <input
            className="form-control my-4 "
            placeholder="Re-enter your Password"
            type="password"
            name="cPassword"
            onChange={onChange}
          />
          {loader ? (
            <LoaderBtn />
          ) : (
            <button
              type="submit"
              className="btn btn-default-outline my-4 w-100 rounded"
              onClick={submitForm}
            >
              Register
            </button>
          )}

          <p>
            <Link className="text-muted forgot btn" to="/">
              I already have an account
            </Link>
          </p>
          <Link className="btn btn-default-outline" to="/login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;

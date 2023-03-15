import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";

const Register = () => {
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
    <form className="container" method="POST">
      {errorsList.map((err) => (
        <div class="alert alert-danger" role="alert">
          {err}
        </div>
      ))}
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="email"
          placeholder="Enter email"
          onChange={onChange}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
      </div>
      <button type="submit" onClick={submitForm} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Register;

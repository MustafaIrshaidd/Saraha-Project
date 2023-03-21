import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import {toast} from "react-toastify"

const ResetPassword = () => {
  const [inputFields, setInputFields] = useState({
    code: "",
    newPassword: "",
  });
  const { email } = useParams();
  const navigate=useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const result = await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword",{...inputFields,email});
    if(result.data.message == "success"){
        toast.success("Password Resseted Successfully")
        navigate("/login");
    }
    else if (result.data.message == "fail") {
        toast.warning("Please Enter the right code !")
    }
  };
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Reset Password</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin">
          <input
            className="form-control my-3"
            placeholder="Please Enter Your Code"
            type="text"
            name="code"
            value={inputFields.code}
            onChange={onChange}
          />
          <input
            className="form-control my-3"
            placeholder="Please Enter Your New Password"
            type="password"
            name="newPassword"
            value={inputFields.newPassword}
            onChange={onChange}
          />

          <button
            type="submit"
            className="btn btn-default-outline my-4 w-100 rounded"
            onClick={submitForm}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

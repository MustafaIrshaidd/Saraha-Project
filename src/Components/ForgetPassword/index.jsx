import React,{useState} from 'react'
import { toast } from 'react-toastify';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email,setEmail]=useState(null);
  const navigate = useNavigate();

  const onChange=(e)=>{
    const {value} = e.target;
    setEmail(value)
  }

  const submitForm= async (e)=>{
    e.preventDefault();
    if(!email || email.length<8){
      toast.warning("Please enter your email !")
      return ;
    }
    const result =await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode",{email})
    toast.success("Password Resetted Successfully ! Please Checkout your email")
    navigate(`/reset-password/${email}`)

  }
  return (
    <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Forget Password</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form method="POST" action="/handleLogin">
      <input className="form-control" placeholder="Enter your email" type="text" name="email" value={email} onChange={onChange}  />
      <button type="submit" className="btn btn-default-outline my-4 w-100 rounded" onClick={submitForm}>Send Code</button>
    </form>
  </div>
</div>
  )
}

export default ForgetPassword
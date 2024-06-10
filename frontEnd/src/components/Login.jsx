import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useLoginMutation } from '../state/auth/authapi';
import OAuth from './OAuth';
const  LinkItem = lazy(() => import("./Link")) ;
const Login = (props) => {

  const {open, setOpen} = props;
  const [errorMessage, seterrorMessage] = useState("");

  const axiosPublic = useAxiosPublic();
  const [login,{ isError, isSuccess, data, error}] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
   useEffect(() => {
    if(isSuccess) {
      const message = data?.message || "Login Successfull";
      alert(message);
      navigate("/");
     } 
    if (error) {    
        if(isError) {
          toast.error("Error In Login");
        }
    }
   },[isSuccess,error])
  //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const date = {email, password};
    login(data);
    reset()

  };

  // login with google
  // login with google
  const handleRegister = () => {
  
  };
  return (
    <>
    
    <div className=" max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    
    <div className="mb-5">
     {/* close btn */}
           
     <button onClick={()=> setOpen(false)} className="btn btn-sm btn-circle btn-ghost ml-80">
             ✕
          </button>
    <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <Suspense>
              <LinkItem text="" linkText="Forget Password" forwardTo="/forgetPassword" />
              </Suspense>
              
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>
           <Suspense>
           <LinkItem text=" Donot have an account?" linkText=" Signup Now" forwardTo="/signup" />
           </Suspense>
          
            
          </form>
      <OAuth /> 
    </div>
  </div>
  </>
  )
}

export default Login
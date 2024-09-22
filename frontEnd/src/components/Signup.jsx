import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import OAuth from "./OAuth";
import { useRegistrationMutation } from "../state/auth/authapi";

const Signup = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const [registration,{ isError, isSuccess, data, error}] = useRegistrationMutation();
 
  useEffect(() => {
    if(isSuccess) {
      const message = data?.message || "Sign Up Successfully";
      alert(message);
      navigate("/login");
     } 
    if (error) {    
        if(isError) {
         
          alert(error.data.message)
        }
    }
   },[isSuccess,error])
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const firstname =data.firstname
    const lastname =data.lastname
    const email = data.email;
    const password = data.password;

    if(!firstname | !lastname | !email | !password){
      alert("Please Fill All Values");
      
    }else {
      const user = {firstname,lastname,email, password};
      registration(user);
      reset()
      // alert(" Fill All Values");
    }
    

  
  };

  // login with google
  const handleRegister = () => {
   
  };
  return (
    <div className="max-w-md bg-white border-8 border-[#008000] w-full mx-auto my-20">
      <div className="mb-5">
      <div className="flex flex-row justify-end">
      <button onClick={()=> setOpen(false)} className="btn btn-sm btn-circle btn-ghost ml-20">
             ✕
          </button>
      </div>   
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!</h3>
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">firstName</span>
            </label>
            <input
              type="firstname"
              placeholder="Your firstname"
              className="input input-bordered"
              {...register("firstname")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="lastname"
              placeholder="Your last name"
              className="input input-bordered"
              {...register("lastname")}
            />
          </div>

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
              {...register("password")}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error message */}
          <p>{errors.message}</p>

          {/* submit btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Sign up"
            />
          </div>

          <div className="text-center my-2">
            Have an account?
            <Link to="/login">
              <button className="ml-2 underline">Login here</button>
            </Link>
          </div>
        </form>
       <OAuth />
      </div>
    </div>
  );
};

export default Signup;

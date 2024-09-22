import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../state/auth/authapi";
import OAuth from "./OAuth";
import LinkItem from "./Link";
const Login = (props) => {
  const { open, setOpen } = props;
  const [errorMessage, seterrorMessage] = useState("");

  const [login, { isError, isSuccess, data, error }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login Successfull";
      alert(message);
      navigate("/");
    }
    if (error) {
      if (isError) {
        alert(error.data.message);
      }
    }
  }, [isSuccess, error]);
  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const date = { email, password };
    login(data);
    reset();
  };
  return (
    <>
      <div className="drawer">
        <div className="fixed w-full h-screen top-0 left-0  flex items-center justify-center">
          <div className="max-w-md bg-white border-8 border-[#008000] w-full mx-auto rounded ">
            <div className="mb-5 ">
              {/* close btn */}
              <div className="flex flex-row justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="btn btn-sm btn-circle btn-ghost ml-20"
                >
                  ✕
                </button>
              </div>
              <div className=" w-full flex items-center justify-center">
                <form
                  className="card-body"
                  method="dialog"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h3 className="font-bold text-lg flex items-center justify-center">
                    Please Login!
                  </h3>

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
                    <LinkItem
                      text=""
                      linkText="Forget Password"
                      forwardTo="/forgetPassword"
                    />
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
                  <LinkItem
                    text=" Donot have an account?"
                    linkText=" Signup Now"
                    forwardTo="/signup"
                  />
                </form>
              </div>
            </div>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { getuser } from './../features/user/userSlice';
import { createCart, resetState } from "../features/cart/cartSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      dispatch(getuser(user._id));
      navigate("/");
    } else {
      // navigate("/");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
     </div>
     <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         <form action="" onSubmit={formik.handleSubmit}>
         <div>
           <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700" > Email address </label>
              <div className="mt-1">
                   <input
                    type="text"
                    label="Email Address"
                    id="email"
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                 <div className="error mt-2">
                   {formik.touched.email && formik.errors.email}
                 </div>
             </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                 <input
                  type={visible ? "text" : "password"}
                  label="Password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                  {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          </div>
          </div>
          <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/signup" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>

        </form>
     </div>
     </div>
    </div>
  );
};

export default Login;


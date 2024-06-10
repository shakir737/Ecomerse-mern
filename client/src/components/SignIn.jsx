import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../state/auth/authapi';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast'
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [login,{ isError, isSuccess, data, error}] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode)
  useEffect(() => {
    if(isSuccess) {
      const message = data?.message || "Login Successfull";
      toast.success(message);
      navigate("/DashBoard");
    } 
    if (error) {    
        if(isError) {
          toast.error("Error In Login");
        }
    }
  },[isSuccess,error])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
   
    const data = formData;
     e.preventDefault();
    try {
      if(!formData.email || !formData.password){
        toast.error("Please Fill All Values");
      } else {

        login(data);
      }
    } catch (error) {
  
    }
  };
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}  />
    <div  className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8" >
    <div className="sm:mx-auto sm:w-full sm:max-w-md border-shadow border p-10">
        <div className="mt-6 text-center text-3xl font-extrabold text-black dark:text-white">
          Login Form
        </div>
     <br /> 
     <br /> 
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <div>
      <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 text-black dark:text-white" > Email address </label>
        <input
          type='email'
          placeholder='Please Enter Email'
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id='email'
          onChange={handleChange}
        />
        </div>
         <div>
         <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 text-black dark:text-white"
              >
                Password
              </label>
        <input
          type='password'
          placeholder='Please Enter Your Password'
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id='password'
          onChange={handleChange}
        />
          </div>
        <button
          // disabled={loading}
          className='button'
        > Submit
          {/* {loading ? 'Loading...' : 'Sign In'} */}
        </button>
        {/* <OAuth/> */}
      </form>
      <br />
      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
    </div>
    </div>
    </>
  );
}

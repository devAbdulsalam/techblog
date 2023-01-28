import React, {useState } from "react";
// import Logo from "../assets/logo.png";
// import signinImage from "../assets/Simage.png";
import {Link,  useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const ForgetPassword = () => {
  const navigate = useNavigate()
  const { forgetPassword, success, error, isLoading } = useLogin()

  // //forgetPassword
  const [email, setEmail] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {email}
    forgetPassword(user)
  };


  return (
    <section className="font-serif min-h-screen bg-green-50  py-8 md:pt-10 w-full">
        <div className="md:w-10/12 mx-auto bg-white p-5">
          <h2 className="text-green-500 text-2xl text-center font-bold">Forget Password</h2>
          <form className="w-full m-0 flex flex-col py-4" onSubmit={handleSubmit}>
            <div className='mt-2'>
              <label htmlFor="phone" className='text-xl font-semibold'>Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 my-2 py-2 text-lg w-full font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                type="email"
                value={email}
                placeholder="email"
              />
            </div>
              <button className="bg-[#228e01] w-full text-white py-3 my-2 mt-4 rounded font-bold" disabled={isLoading}>
                Forget Password
                </button>
              {error && <div className="error duration-500 p-2 bg-red-300 text-red-800 text-center text-lg border-red-700 border-2 rounded-md">{error}</div>}
              {success && <div className="success duration-500 p-2 bg-green-300 text-green-800 text-center text-lg border-green-700 border-2 rounded-md">{success}</div>}

            <div className="flex justify-center text-lg  items-center py-4 text-gray-800">
              <p>Already on Shara? <Link to={'/login'} className="text-green-700 text-lg"> Login </Link></p>
            </div>
          </form>
        </div>
    </section>
  );
};

export default ForgetPassword;

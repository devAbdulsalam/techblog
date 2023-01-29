import React, {useState, useEffect } from "react";
// import Logo from "../assets/logo.png";
// import signinImage from "../assets/Simage.png";
import {Link,  useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const ResetPassword = () => {
  const navigate = useNavigate()
  const { id, token } = useParams();
    // const history = useNavigate();

  const {login, resetPassword, changePassword, success, error, isLoading, phone} = useLogin()
  // //login
//   const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const user = {id, token,}
        resetPassword(user)
    }, [id, token, resetPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {id, token, password, confirmPassword}
    changePassword(user)
  };
  

  return (
    <div className="font-serif min-h-screen bg-green-50">
      <section className="p-5 py-8 w-full">
            <div className="md:w-10/12 mb-0 mx-0 flex flex-col py-4 md:py-10 md:px-20 bg-white">
              <h2 className="text-green-500 text-2xl text-center font-bold">Change Password</h2>
              <form className="w-full m-0 flex flex-col py-4" onSubmit={handleSubmit}>
                <div className='mt-2'>
                  <label htmlFor="password" className='text-lg font-semibold'>New Password:</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}              
                    className="px-3 py-2 text-lg w-full font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className='mt-2'>
                  <label htmlFor="confirmpassword" className='text-lg font-semibold'>Confirm Password:</label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}              
                    className="px-3 py-2 text-lg w-full font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                  />
                </div>

                  <button className="bg-[#228e01] w-full text-white py-3 my-2 mt-4 rounded font-bold" disabled={isLoading}>
                    Change Password
                    </button>
                  {error && <div className="error duration-500 p-2 bg-red-300 text-red-800 text-center text-lg border-red-700 border-2 rounded-md">{error}</div>}
                  {success && 
                  <div className="success duration-500 p-2 bg-green-300 text-green-800 text-center text-lg border-green-700 border-2 rounded-md">
                    <p>{success}</p>
                    </div>}

                <div className="flex justify-center text-lg  items-center  text-gray-800">
                  <Link to={'/login'} className="text-green-700 text-lg">Login </Link> instead?  
                </div>
              </form>
            </div>
      </section>
    </div>
  );
};

export default ResetPassword;

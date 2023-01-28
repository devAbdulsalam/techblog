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


  // // toggle login and signUp
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin ] = useState(true);

  const handleSignUp = () =>{
    setShowSignUp(true)
    setShowLogin(false)
    navigate('/signup')
  }
  const handleLogin = () =>{
    setShowSignUp(false)
    setShowLogin(true)
    navigate('/login')
  }
  const loginUser = () =>{
    const user = {phone, password}
    login(user)
  }
   

  return (
    <div className="font-serif min-h-screen bg-green-50">
      <section className="p-5 py-8 w-full">
          <div className="md:hidden flex items-center justify-center space-x-5 w-full mt-20">
              <button className={`font-semibold text-3xl rounded-full p-3 shadow-xl bg-gray-100 justify-center flex flex-col  ${showSignUp ? 'border-b-4 border-green-600 text-green-600' : "text-green-700"}`} onClick={handleSignUp}><ion-icon name="person-add-outline"></ion-icon></button>
              <button className={`font-semibold text-3xl rounded-full p-3 shadow-xl bg-gray-100 justify-center flex flex-col ${showLogin ? 'border-b-4  border-green-600 text-green-600' : "text-green-700"}`} onClick={handleLogin}><ion-icon name="log-in-outline"></ion-icon></button>
          </div>
          <div className="mx-auto p-4 md:p-0 w-full md:min-w-[700px] md:max-w-[800px] mt-10 md:mt-20 shadow-xl rounded-lg md:rounded-xl md:flex bg-white md:bg-green-500">
            <div className="hidden md:flex items-center justify-center flex-col w-5/12">
              <div className="flex items-center justify-center w-full">
                  {/* <img className="w-32 mt-8" src={Logo} alt="" /> */}
              </div>
              <h1 className="text-white text-2xl font-bold my-4">WELCOME BACK</h1>
                <button className={`font-semibold text-3xl  rounded-md mt-4 p-3 shadow-xl bg-gray-50 justify-center flex  ${showSignUp ? 'border-b-4 border-green-600 text-green-600' : "text-green-700"}`} onClick={handleSignUp}>
                  <ion-icon name="person-add-outline"></ion-icon>
                  <span className="text-green-600 text-xl px-2 font-semibold">Create Account</span>
                </button>
            </div>
            <div className="md:w-7/12 mb-0 mx-0 flex flex-col py-4 md:py-10 md:px-20 bg-white">
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
                    {phone && <p className="cursor-pointer">Do you want to login? <span onClick={() => loginUser()} className="text-green-500">Yes </span> <span onClick={() => navigate('/login')} className="text-red-600">No</span></p>}
                </div>}

                <div className="flex justify-center text-lg  items-center  text-gray-800">
                  <Link to={'/login'} className="text-green-700 text-lg">Login </Link> extead?  
                </div>
              </form>
            </div>
          </div>
      </section>
    </div>
  );
};

export default ResetPassword;

import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const navigate = useNavigate();
  const {login} = useLogin()
    // // login
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleLogin = (e) => {
     e.preventDefault();
    if(phone === "" || password === ""){
        setAlert("Fill in all input fields")
        setTimeout(() => {
            setAlert(null)
        }, 2000);
    }else{
      const user = {phone, password}
      login(user)
    }
  };

  return (
    <section className='md:h-screen  w-full bg-gray-200 py-10'>
        <div className='w-full flex place-items-center p-5 md:p-10'>
            <form onSubmit={handleLogin} className="w-full md:max-w-[450px] mx-auto mt-16 shadow-lg bg-gray-100 rounded-md flex flex-col p-4">
                <h1 className="text-center text-2xl md:text-4xl font-bold py-3 w-full">Login</h1>
                <div className="my-2">
                    <label htmlFor="phone" className='text-xl font-bold'>Phone Number:</label>
                    <input onChange={(e) => setphone(e.target.value)}
                        className="px-3 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="phone"
                        value={phone}
                        placeholder="Phone"
                        id='phone'
                        autoComplete="Phone"
                        />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className='text-xl font-bold'>Password:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}              
                        className="px-3 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        />
                </div>
                <div className="relative mb-2">
                  <p className={`${alert ? `top-0` : '-top-5'} w-full p-2 mb-2 absolute font-bold text-center text-lg text-red-500 duration-500`}>{alert}</p>
                </div>
                <button className="bg-[#228e01] w-full text-white py-3 my-6 rounded font-bold">
                    Login
                </button>

                <div className="flex justify-between items-center text-lg md:text-xl text-gray-600">
                    <p>
                        <input className="mr-2 debug" type="checkbox" />
                        Remember me
                    </p>
                    <p>Forget Password</p>
                </div>
                <div>
                    <p className="py-4 text-gray-600 text-lg md:text-xl">
                        Don't have an Account?
                        <span onClick={() => navigate('/signin')} className="text-green-700 cursor-pointer"> Signup</span>
                    </p>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Login
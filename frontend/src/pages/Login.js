import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin';
import { LoadingContext } from '../context/LoadingContext';
import Loading from "../components/Loading"


const Login = () => {
    const navigate = useNavigate();
    const { setIsLoading } = useContext(LoadingContext);
    const { login, error, isLoading } = useLogin()

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading])
    // // login
    const [phone, setphone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { phone, password }
        login(user)
    };

    return (
        <section className='md:h-screen bg-gray-200 w-full py-10 relative'>
            <Loading />
            <div className='w-full flex place-items-center '>
                <form onSubmit={handleLogin} className="w-full md:max-w-[450px] mx-auto md:mt-10 shadow-lg bg-gray-50 rounded-md flex flex-col p-4">
                    <h1 className="text-center text-xl md:text-2xl font-bold py-3">Login</h1>
                    <div className="my-2">
                        <label htmlFor="phone" className='text-lg font-semibold'>Phone Number:</label>
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
                        <label htmlFor="password" className='text-lg font-semibold'>Password:</label>
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
                    <button className="bg-[#228e01] w-full text-white py-3 my-2 mt-4 rounded font-bold" disabled={isLoading}>
                        Log in
                    </button>
                    {error && <div className="error duration-500 p-2 bg-red-300 text-red-800 text-center text-lg border-red-700 border-2 rounded-md">{error}</div>}

                    <div className="flex justify-between items-center text-lg md:text-xl text-gray-600">
                        <p>
                            <input className="mr-2 debug" type="checkbox" />
                            Remember me
                        </p>
                        <p onClick={() => navigate('/forget-password')}>Forget Password</p>
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
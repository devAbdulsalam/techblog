import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'
import { LoadingContext } from '../context/LoadingContext'
import Loading from '../components/Loading'

const Signup = () => {
    const navigate = useNavigate();
    const { signup, error, isLoading } = useSignup();

    const { setIsLoading } = useContext(LoadingContext);
    useEffect(() => {
        setIsLoading(false)

    }, [setIsLoading])
    // // signUp
    const [name, setName] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();

        const user = { name, phone, email, password, cpassword }
        await signup(user)
    };
    return (
        <section className='w-full bg-gray-200 py-8 '>
            <div className='w-full flex place-items-center relative'>
            <Loading />
                <form onSubmit={handleSignUp} className="w-full md:max-w-[450px] mx-auto md:my-6 shadow-lg bg-gray-50 rounded-md flex flex-col p-4">
                    <h1 className="text-center text-xl md:text-2xl font-bold py-3">Create Account</h1>
                    <div className="my-1">
                        <label htmlFor="name" className='text-lg font-semibold'>Name:</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="px-3 my-1 py-1.5 text-base w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            value={name}
                            placeholder="Adekunle Bala Chukwueze"
                            id="name"
                            name="name"
                            autoComplete="text"
                        />
                    </div>
                    <div className="my-1">
                        <label htmlFor="phone" className='text-lg font-semibold'>Phone Number:</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="px-3 my-1 py-1.5 text-base w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="phone"
                            id="phone"
                            name="phone"
                            placeholder="123 456 7890"
                            autoComplete="phone"
                        />
                    </div>
                    <div className="my-1">
                        <label htmlFor="email" className='text-lg font-semibold'>Email:</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 my-1 py-1.5 text-base w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            autoComplete="email"
                        />
                    </div>
                    <div className="my-1">
                        <label htmlFor="password" className='text-lg font-semibold'>Password:</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-3 my-1 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="password"
                            placeholder="Uni9ue&$tr0ng"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="my-1">
                        <label htmlFor="cpswd" className='text-xl font-semibold'>Confirm Password:</label>
                        <input
                            value={cpassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            className="px-3 my-1 py-1.5 text-base w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="password"
                            name="cpswd"
                            id="cpswd"
                            placeholder="Uni9ue&$tr0ng"
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <button className="bg-[#228e01] w-full text-white py-3 my-2 mt-4 rounded font-bold" disabled={isLoading}>
                            Log in
                        </button>
                        {error && <div className="error duration-500 p-2 bg-red-300 text-red-800 text-center text-lg border-red-700 border-2 rounded-md">{error}</div>}

                        <p className="py-4 text-gray-600">
                            Already have an Account?
                            <span onClick={() => navigate('/login')} className="text-green-700 cursor-pointer"> Login</span>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Signup
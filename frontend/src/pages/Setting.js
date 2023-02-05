import React, { useState, useEffect, useContext } from "react";
import { useLogout } from '../hooks/useLogout'
import { AuthContext } from "../context/AuthContext";


const Setting = ({ handleImage }) => {
    const [isPin, setIsPin] = useState(true)
    const { user } = useContext(AuthContext);
    // const { sendotp } = useProfile()
    const { logout } = useLogout()

    const handleChangePassword = () => {
        // handlePassword()
        console.log("handlePassword")
    }
    // // // //Check if the user has a transaction pin
    useEffect(() => {
        if (user.wallet.pin) {
            setIsPin(true)
        }
    }, [user])

    // // // //Send otp
    // const handleOtp = () => {
    //     const data = { id: user.user._id, token: user.token }
    //     handleCheckOtp()
    //     sendotp(data)
    // }
    // // // //Delete Account
    const deleteAccount = () => {
        console.log("deleteAccount")
    }
    return (
        <div className="w-full">
            <hr className="w-full text-gray-50 opacity-20" />
            <button className="w-full px-3 py-2.5 flex justify-between" onClick={() => handleImage()}>
                <p className="mx-1 text-xl cursor-pointer">Change Profile image</p>
            </button>
            <hr className="w-full text-gray-50 opacity-20" />
            <button className="w-full px-3 py-2.5 flex justify-between" onClick={handleChangePassword}>
                <p className="mx-1 text-xl" >Change password</p>
            </button>
            <hr className="w-full text-gray-50 opacity-20" />
            <button className="w-full px-3 py-2.5 flex justify-between" onClick={deleteAccount}>
                <p className="mx-1 text-xl text-red-600">Delete Account</p>
            </button>
            <hr className="w-full text-gray-50 opacity-20" />
            <div className="w-full px-3 py-2 flex justify-center">
                <button onClick={() => logout()} className="mx-1 text-xl p-2 justify-center px-6 text-center bg-green-500 text-white rounded-md">Log Out</button>
            </div>
        </div>
    )
}

export default Setting
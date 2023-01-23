import React, {useContext} from 'react'
import {LoadingContext} from '../context/LoadingContext'

const Modal = () => {
    
  const { isLoading} = useContext(LoadingContext);
  return (
    <div className="relative mb-2">
        <p className={`${alert ? `top-0` : '-top-5'} w-full p-2 mb-2 absolute font-bold text-center text-lg text-red-500 duration-500`}>{alert}</p>
    </div>
  )
}

export default Modal
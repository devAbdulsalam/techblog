import React, {useState, useContext} from 'react'
import { useNavigate} from 'react-router-dom'
import { LoadingContext } from '../context/LoadingContext';

const ForgetPswrd = () => {
  const navigate = useNavigate();
  const { setIsLoading, handleClose } = useContext(LoadingContext);

  return (
    <div>ForgetPswrd</div>
  )
}

export default ForgetPswrd
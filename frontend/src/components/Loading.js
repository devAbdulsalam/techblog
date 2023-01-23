import React, {useContext} from 'react'
import {LoadingContext} from '../context/LoadingContext'
import MoonLoader from 'react-spinners/MoonLoader'

const Loading = () => {
    
  const { isLoading} = useContext(LoadingContext);
  return (
    <div className={`${isLoading ? 'flex' : 'hidden'} h-full w-full absolute bg-black/5 z-[998] transition-all duration-300  place-items-center`}>
        <div className='w-full flex justify-center  items-center'>
            <MoonLoader
                color="green"
                size={60}
                speedMultiplier={1}
              />
        </div>
    </div>
  )
}

export default Loading
import React, { useContext} from 'react'
import { BlogContext } from '../context/BlogContext'
import LeftBar from './../components/LeftBar';
import RightBar from './../components/RightBar';
import { useBlogs } from '../hooks/useBlogs';
// components
import Blog from '../components/Blog'
import Loading from '../components/Loading'


const Home = () => {
  const { blogs } = useContext(BlogContext);
  const { isLoading, error} = useBlogs()
   

    // useEffect(() => { 
    //     getallblogs()
    // }, [getallblogs])

  return (
    <section id="home" className='flex gap-2 gap-x-3 justify-center px-3 lg:px-5  lg:w-11/12 mx-auto w-full h-full relative'>
          <div className='hidden md:w-[25%] bg-transparent md:inline-flex flex-col mt-10 sticky z-10 top-12 lg:left-10 h-screen'>
              <div className='relative w-full h-screen mt-6'>
                  <LeftBar />
              </div>
          </div>
          <div className="min-h-screen w-full flex pb-2 md:pb-1 flex-col items-center">
            {isLoading ?
              <div className='w-full'>
                <Loading />
                {/* <Skeleton baseColor="#2d3748" highlightColor="#718096" width={`w-full`} height={`full`} count={5} /> */}
              </div> : ""}
              <div className="w-full mt-10">
                {blogs && blogs.length >= 0 ? blogs.map((blog) => (<Blog key={blog._id} blog={blog} />))
                  :
                  <div className='pt-10'>
                    <p className='text-center font-semibold text-2xl text-red-500'>{error}</p>
                  </div>
                }
              </div>
          </div>          
          <div className='hidden lg:flex lg:w-[25%] bg-transparent flex-col mt-10 sticky z-10 top-12 left-10 h-screen'>
              <div className='relative w-full h-screen mt-6'>
                  <RightBar />
              </div>
          </div>
    </section>
  )
}

export default Home
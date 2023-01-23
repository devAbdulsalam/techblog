import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import { LoadingContext } from '../context/LoadingContext'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// components
import Blog from '../components/Blog'


const Home = () => {
  const { isLoading } = useContext(LoadingContext);
  const { blogs, isError } = useContext(BlogContext);

  // dispatch({type: 'CREATE_BLOGS', payload: json.blog})

  // const [searchInput, setSearchInput] = useState('')
  return (
    <section id="home" className="min-h-screen flex pb-2 md:pb-1 flex-col items-center">
      <div className='w-full md:h-screen overflow-y-auto'>
        {isLoading ?
          <div className='w-full'>
            {/* <Skeleton baseColor="#2d3748" highlightColor="#718096" width={`w-full`} height={`full`} count={5} /> */}
          </div> :
          <div className="w-full">
            {blogs && blogs.length >= 0 ? blogs.map((blog) => (<Blog key={blog._id} blog={blog} />))
              :
              <div className='pt-10'>
                <p className='text-center font-semibold text-2xl text-red-500'>{isError}</p>
              </div>
            }
          </div>
        }
      </div>
    </section>
  )
}

export default Home
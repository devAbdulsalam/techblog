import React, { useContext } from 'react'
import { BlogContext } from '../context/BlogContext'
import { LoadingContext } from '../context/LoadingContext'
// components
import Blog from '../components/Blog'


const Home = () => {
  const { isLoading } = useContext(LoadingContext);
  const { blogs, alert } = useContext(BlogContext);

  // dispatch({type: 'CREATE_BLOGS', payload: json.blog})

  // const [searchInput, setSearchInput] = useState('')
  return (
    <section id="home" className="min-h-screen flex pb-1 flex-col items-center">
      <div className='w-full h-screen overflow-y-auto'>
        {isLoading ?
          <div>
            <p className='text-center text-blue-500 text-3xl'>Loading</p>
          </div> :
          <div className="w-full">
            {blogs && blogs.length >= 0 ? blogs.map((blog) => (<Blog key={blog._id} blog={blog} />))
              :
              <div className='pt-10'>
                <p className='text-center font-semibold text-2xl text-red-500'>{alert}</p>
              </div>
            }
          </div>
        }
      </div>
    </section>
  )
}

export default Home
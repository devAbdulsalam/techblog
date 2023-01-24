import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import axios from 'axios'
import Blog from '../components/Blog'
import Loading from '../components/Loading'

const Myblogs = () => {
  const { user } = useAuthContext()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState("blogs not found")
  useEffect(() => {
    if (!user) {
      setAlert("user not available")
      return
    }
    axios.get("https://api-techstuff.onrender.com/blogs",
      { headers: { 'Authorization': `Bearer ${user.token}` } }
    )
      .then((res) => {
        setBlogs(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
        setAlert(err.message)
        setLoading(false)
      })
  }, [user])



  return (
    <section className="min-h-screen md:h-screen flex flex-col items-center">
      <Loading />
      <div className='w-full mt-3 py-3 pl-8 relative flex justify-center'>
        <h1 className="text-3xl font-bold  text-white text-center fixed bg-gray-800 mx-auto z-10">
          My Posts
        </h1>
      </div>
      <div className='w-full h-screen overflow-y-auto relative'>
        {loading ?
          <div>
            <p className='text-center text-blue-500 text-2xl'>Loading</p>
          </div> :
          <div className="w-full">
            {!blogs.length <= 0 ? blogs.map((blog) => (<Blog key={blog._id} blog={blog} />))
              :
              <p className='text-center text-red-500 text-2xl'>{alert}</p>
            }
          </div>
        }
      </div>
    </section>
  )
}

export default Myblogs
import { BlogContext } from '../context/BlogContext'
import { useContext } from 'react'

export const useBlogsContext = () => {
    const context = useContext(BlogContext)

console.log("blogsContext")
  if (!context) {
    throw Error('useBlogsContext must be used inside an BlogsContextProvider')
  }

  return context
}

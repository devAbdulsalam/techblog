import React, { useState, useContext } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext'
import { EditContext } from '../context/EditContext'
import { useBlogsContext } from '../context/useBlogContext'
// import axios from 'axios'

const EditBlog = ({ blog }) => {
    const { title: blogTittle, content: blogContent, subtitle: subTitle, _id: id } = blog
    const { user } = useAuthContext()
    const { setIsLoading } = useContext(LoadingContext);
    const { dispatch } = useBlogsContext()
    const { isEdit, setIsEdit } = useContext(EditContext);
    const [title, setTitle] = useState(blogTittle)
    const [subtitle, setSubtitle] = useState(subTitle)
    const [content, setContent] = useState(blogContent)
    const [warning, setWarning] = useState(null)

    // //update blog
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (title === "" || subtitle === "" || content === "") {
            console.log("fill all input field")
        } else {
            const blog = { id, title, subtitle, content }
            setIsLoading(true)
            const response = await fetch(`https://api-techstuff.onrender.com/blogs/${id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(blog)
            })

            const json = await response.json()
            if (!response.ok) {
                console.log(json)
                setIsLoading(false)
            }
            if (response.ok) {
                setTitle('')
                setSubtitle('')
                setContent('')
                setWarning('blog updated successfully:', json)
                dispatch({ type: 'EDIT_BLOG', payload: json.blog })
                setIsEdit(false)
                setIsLoading(false)
            }
        }
    }
    return (
        <section className={`${isEdit ? 'flex' : 'hidden'} h-screen w-full absolute bg-black/5 z-[997] transition-all duration-300  place-items-center`}>
            <div className='w-full flex place-content-center p-2 md:p-10'>
                <div className='bg-gray p-2 mt-10 rounded-md shadow-xl bg-white'>
                    <i onClick={() => setIsEdit(false)} className="close fa fa-times text-gray-700 text-2xl float-right cursor-pointer mr-5"></i>
                    <form onSubmit={handleSubmit} className="pb-10 p-2 mx-1">
                        <h1 className="text-center text-4xl font-bold py-5">Edit Blog post</h1>
                        <div className="row">
                            <label htmlFor="tittle" className='text-xl font-bold p-2'>Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="subtitle" className='text-xl font-bold p-2'>Subtitle</label>
                            <input
                                type="text"
                                id="subtitle"
                                name="subtitle"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="subtitle"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="content" className='text-xl font-bold p-2'>Body</label>
                            <textarea
                                type="text"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Body"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                required
                                cols="50"
                                rows="10"
                            >
                            </textarea>
                        </div>
                        <div className="relative mb-2">
                            <p className={`${warning ? `top-0` : '-top-5'} w-full p-2 mb-2  font-bold text-center text-lg text-red-500 duration-500`}>{warning}</p>
                        </div>
                        <div>
                            <button type="submit" className="bg-[#228e01] w-full max-w-[300px] mx-auto inline-block text-white py-3 text-xl my-6 rounded font-bold">Update blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditBlog
import React, { useState, useContext, useEffect } from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { LoadingContext } from '../context/LoadingContext'
import { useBlogsContext } from '../context/useBlogContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const CreateBlog = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { dispatch } = useBlogsContext()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [keywords, setKeywords] = useState("")
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [alert, setAlert] = useState(null);
    const { setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        if (user) {
            setAuthor(user.user.name)
        }
    }, [user])

    // //create blog
    const handleSubmit = async (e) => {
        if (!user) {
            return
        }
        if (!author) {
            setAuthor(user.user.name)
        }
        e.preventDefault()
        if (title === "" || subtitle === "" || content === "") {
            console.log("fill all input field")
            setAlert("fill all input field")
        } else {
            const blog = { user_id: user.user._id, title, subtitle, content, author, keywords }
            setIsLoading(true)
            const response = await fetch(`https://api-techstuff.onrender.com/blogs`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(blog)
            })
            const json = await response.json()
            if (!response.ok) {
                console.log(json.error)
                setIsLoading(false)
            }
            if (response.ok) {
                navigate('/')
                setTitle('')
                setSubtitle('')
                setContent('')
                dispatch({ type: 'CREATE_BLOGS', payload: json.blog })
                console.log('new blog added:', json.message)
                setIsLoading(false)
            }
        }
    }

    const addCoAuthor = () => {
        console.log("add co author")
    }
    const SaveDraft = () => {
        console.log("save to draft")
    }
    return (
        <section className='md:after:min-h-screen w-full bg-white'>
            <Loading />
            <h1 className="text-xl font-bold pt-1 px-2">Create post</h1>
            <div className='w-full flex flex-col place-content-center'>
                <div className='hidden'>
                    <div className="row">
                        <label htmlFor="author" className='text-xl font-bold p-2'>Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="author"
                            className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="rounded-md pt-5">
                    <div className="row p-2">
                        <label htmlFor="tittle" className='text-xl font-bold p-2'>Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="New post Title goes here..."
                            className="px-3 my-2 py-1.5 text-lg shadow-md w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex gap-2 w-full p-2">
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
                            <label htmlFor="keywords" className='text-xl font-bold p-2'>Keywords</label>
                            <input
                                type="text"
                                id="keyword"
                                name="keyword"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="keyword"
                                className="px-3 my-2 py-1.5 text-lg w-full font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className='w-full bg-gray-100 p-1 flex'>
                        <p><ion-icon name="key-outline" size="large"
                            className="m-2"></ion-icon></p>
                        <p><ion-icon name="image-outline" size="large"
                            className="m-2"></ion-icon></p>
                    </div>
                    <div className="row">
                        <textarea
                            type="text"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="write your post content here..."
                            className="px-3 my-2 py-1.5 text-lg w-full shadow-md font-normal text-gray-500 bg-clip-padding border-0 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            required
                            cols="50"
                            rows="10"
                        >
                        </textarea>
                    </div>
                    <div className="relative mb-2">
                        <p className={`${alert ? `top-0` : '-top-5'} w-full p-2 mb-2 absolute font-bold text-center text-lg text-red-500 duration-500`}>{alert}</p>
                    </div>
                    <div className='gap-1 px-1 space-x-2'>
                        <button type="submit" className="bg-[#228e01] w-full max-w-[200px] mx-auto inline-block text-white py-3 text-xl my-6 rounded font-bold">Publish</button>
                        <button onClick={() => SaveDraft()} className='mx-2'>Save draft</button>
                        <button onClick={() => addCoAuthor()} className='mx-2'>Add co Author</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CreateBlog
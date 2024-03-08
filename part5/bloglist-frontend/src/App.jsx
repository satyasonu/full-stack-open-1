import { useEffect, useRef, useState } from 'react'
import blogService from './Services/BlogService'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './Services/LoginService'
import Notification from './components/Notification'
import './App.css'
import Toggleable from './components/Toggleable'

function App() {
  const [initialBlogs, setInitialblogs] = useState([])
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await blogService.getAll()
      const sorted = data.sort((a,b) => b.likes - a.likes)
      setInitialblogs(sorted)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleBlogSubmit = async (e, newBlog) => {
    e.preventDefault()
    try{
      const response = await blogService.create(newBlog)
      setInitialblogs((prev) => [...prev, response])
      setNotification(`a new blog ${newBlog.title} by ${user.name} added`)
      setColor('green')
      setTimeout(() => {
        setNotification(null)
        setColor(null)
      }, 5000)
      blogFormRef.current.handleCancelButton()

    } catch (exception) {
      console.log(exception)
      setNotification(exception.response.data.error)
      setColor('red')
      setTimeout(() => {
        setNotification(null)
        setColor(null)
      }, 5000)
    }
  }
  const handleLogin = async (e, name) => {
    e.preventDefault()
    try{
      const userFetched = await loginService.login({ usernameInput, passwordInput })
      blogService.setToken(userFetched.token)
      window.localStorage.setItem('loggedUserData', JSON.stringify(userFetched))
      setUsernameInput('')
      setPasswordInput('')
      setUser(userFetched)
    } catch (exception){
      setNotification(exception.response.data.error)
      setColor('red')
      setTimeout(() => {
        setNotification(null)
        setColor(null)
      }, 5000)
    }
  }

  const handleLikeButton = async (e, blog) => {
    e.preventDefault()
    const newBlog = { likes: blog.likes + 1 }
    const response = await blogService.update(blog.id, newBlog)
    const updatedBlogs = initialBlogs.map(bg => (bg.id === blog.id ? response : bg))
    setInitialblogs(updatedBlogs)
  }

  const handleRemoveButton = async (e, blog) => {
    try{
      if(window.confirm(`Remove ${blog.title} by ${blog.users.length === 0 ? '' : blog.users[0].name}`)){
        await blogService.deleteBlog(blog.id)
        const remainedBlogs = initialBlogs.filter(bg => bg.id !== blog.id)
        setInitialblogs(remainedBlogs)
      }
    }
    catch (exception){
      setNotification(exception.response.data.error)
      setColor('red')
      setTimeout(() => {
        setNotification(null)
        setColor(null)
      }, 5000)
    }

  }

  return (
    <>
      <Notification data ={{ color:color, content:notification }}/>
      {
        user === null ?
          <LoginForm data = {{ handleLogin, usernameInput, setUsernameInput,passwordInput, setPasswordInput }} />
          : <div>
            <h1>Blogs</h1>
            <div>{user.name} logged in <button onClick={() => {window.localStorage.removeItem('loggedUserData');window.location.reload()}}>logout</button></div>
            <Toggleable ref = {blogFormRef} buttonLabel ="new blog">
              <BlogForm handleBlogSubmit = {handleBlogSubmit}/>
            </Toggleable>
            <Blogs handleLikeButton={handleLikeButton} handleRemoveButton={handleRemoveButton} blogs={initialBlogs}/>
          </div>
      }
    </>
  )
}

export default App
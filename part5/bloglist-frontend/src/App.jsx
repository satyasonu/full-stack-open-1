import { useEffect, useState } from "react"
import blogService from './Services/BlogService'
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import loginService from './Services/LoginService'
import Notification from "./components/Notification"
import './App.css'

function App() {
  const [initialBlogs, setInitialblogs] = useState([])
  const [blogTitle, setBlogTitle] = useState("")
  const [authorInput, setAuthorInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [likesInput, setLikesInput] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState(null)
  
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await blogService.getAll()
      setInitialblogs(data)
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

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    try{
      const newBlog = {
        "title": blogTitle,
        "author": authorInput,
        "url": urlInput,
        "likes": likesInput
      }
        const response = await blogService.create(newBlog)
        setInitialblogs((prev) => [...prev, response])
        setNotification(`a new blog ${newBlog.title} by ${user.name} added`)
        setColor("green")
        setBlogTitle("")
        setAuthorInput("")
        setUrlInput("")
        setLikesInput("")
        setTimeout(() => {
          setNotification(null)
          setColor(null)
        }, 5000)
        
    } catch (exception) {
      setNotification(exception.response.data.error)
      setColor("red")
      setTimeout(() => {
        setNotification(null)
        setColor(null)
      }, 5000)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const userFetched = await loginService.login({usernameInput, passwordInput})
      blogService.setToken(userFetched.token)
      window.localStorage.setItem('loggedUserData', JSON.stringify(userFetched))
      setUsernameInput("")
      setPasswordInput("")
      setUser(userFetched)
    } catch (exception){
      setNotification(exception.response.data.error)
      setColor("red")
      setTimeout(() => {
        setNotification(null)
        setColor(null)
      }, 5000)
    }
  }

  return (
    <>
      <Notification data ={{color:color, content:notification}}/>
      {
        user === null ?
        <LoginForm data = {{handleLogin, usernameInput, setUsernameInput,passwordInput, setPasswordInput}} />
        : <div>
            <h1>Blogs</h1>
            <div>{user.name} logged in <button onClick={() => {window.localStorage.removeItem('loggedUserData');window.location.reload()}}>logout</button></div>
            <BlogForm data = {{handleBlogSubmit, blogTitle, setBlogTitle, authorInput, setAuthorInput, urlInput, setUrlInput, likesInput, setLikesInput}}/>
            <Blog blogs={initialBlogs}/>
            
          </div>
      }
    </>
  )
}

export default App
import { useState } from 'react'

const BlogForm = ({ handleBlogSubmit }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [likesInput, setLikesInput] = useState('')

  const newBlog = {
    'title': blogTitle,
    'author': authorInput,
    'url': urlInput,
    'likes': likesInput
  }
  return (
    <form onSubmit={(e) => handleBlogSubmit(e, newBlog)}>
      Add Blog<br />
      Title: <input type='text' placeholder="Enter title" value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} required/><br />
      Author: <input type='text' placeholder="Enter author name" value={authorInput} onChange={({ target }) => setAuthorInput(target.value)} required/><br />
      Url: <input type='text' placeholder="Enter url" value={urlInput} onChange={({ target }) => setUrlInput(target.value)} required/><br />
      Likes: <input placeholder="Enter likes" value={likesInput} onChange={({ target }) => setLikesInput(target.value)} /><br />
      <button type="submit">create</button>
    </form>
  )
}
export default BlogForm
import React from 'react'
import Blog from './Blog'
const Blogs = ({ blogs, handleLikeButton, handleRemoveButton }) => {
  return (
    <div>
      {blogs.map(blog => {
        return (
          <Blog handleLikeButton={handleLikeButton} handleRemoveButton={handleRemoveButton} key={blog.id} blog={blog}/>
        )
      })}
    </div>
  )
}

export default Blogs
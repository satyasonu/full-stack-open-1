import React from 'react'
import Blog from './Blog'
const Blogs = ({blogs, handleLikeButton}) => {
  return (
    <div>
        {blogs.map(blog => {
          return (
            <Blog handleLikeButton={handleLikeButton} key={blog.id} blog={blog}/>
          )
        })}
    </div>
  )
}

export default Blogs
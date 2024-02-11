import React from 'react'
const Blog = ({blogs}) => {
  return (
    <div>
        {blogs.map(blog => {
          return (
            <React.Fragment key={blog.id}>{blog.title}<br/></React.Fragment>
          )
        })}
    </div>
  )
}

export default Blog
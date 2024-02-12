import React, { useState } from 'react'

const Blog = ({ blog, handleLikeButton, handleRemoveButton }) => {
  const [showHide, setShowHide] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleShowHide = () => {
    setShowHide(!showHide)
  }
  return (
    <div style={blogStyle}>
      {blog.title}<button onClick={handleShowHide}>{showHide ? 'hide' : 'view'}</button><br/>
      <div style={{ display: showHide ? '' : 'none' }}>
        {blog.url}<br/>
        {blog.author}<br/>
        {blog.likes}<button onClick={(e) => handleLikeButton(e, blog)}>like</button><br/>
        {blog.users.length > 0 ? blog.users[0].name : ''}<br/>
        <button style={{ backgroundColor: '#1E90FF' }} onClick={(e) => handleRemoveButton(e, blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
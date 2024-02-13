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
      <span className='title'>{blog.title}</span><button className='showHideBtn' onClick={handleShowHide}>{showHide ? 'hide' : 'view'}</button><br/>
        <span className='author'>{blog.author}</span><br/>
      <div style={{ display: showHide ? '' : 'none' }}>
        <span className='url'>{blog.url}</span><br/>
        <span className='likes'>{blog.likes}</span><button onClick={(e) => handleLikeButton(e, blog)} className='linkbtn'>like</button><br/>
        <span className='user'>{blog.users.length > 0 ? blog.users[0].name : ''}</span><br/>
        <button style={{ backgroundColor: '#1E90FF' }} onClick={(e) => handleRemoveButton(e, blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
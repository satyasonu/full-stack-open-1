const BlogForm = (props) => {
  const {handleBlogSubmit, blogTitle, setBlogTitle, authorInput, setAuthorInput, urlInput, setUrlInput, likesInput, setLikesInput} = props.data
  return (
    <form onSubmit={handleBlogSubmit}>
      Add Blog<br />
      Title: <input placeholder="Enter title" value={blogTitle} onChange={({target}) => setBlogTitle(target.value)} required/><br />
      Author: <input placeholder="Enter author name" value={authorInput} onChange={({target}) => setAuthorInput(target.value)} required/><br />
      Url: <input placeholder="Enter url" value={urlInput} onChange={({target}) => setUrlInput(target.value)} required/><br />
      Likes: <input placeholder="Enter likes" value={likesInput} onChange={({target}) => setLikesInput(target.value)} /><br />
      <button>create</button>
    </form>
  )
}

export default BlogForm
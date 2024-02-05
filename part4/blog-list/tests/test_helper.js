const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:'React Blogs',
    author:'Satyabrata Sahoo',
    url:'http://blog.react.com',
    likes:10
  },
  {
    title:'Tailwind blog',
    author:'Balabanta Sahoo',
    url:'http://tailwind.com',
    likes: 25
  }
]

const blogsIndb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsIndb }
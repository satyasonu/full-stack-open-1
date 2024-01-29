const listHelper = require('../utils/list_helper')

const blogs = [
  {
    'title': 'React Blogs',
    'author': 'Satyabrata Sahoo',
    'url': 'http://blog.react.com',
    'likes': 10
  },
  {
    'title': 'Javascript Blogs',
    'author': 'Balabanta Sahoo',
    'url': 'http://blog.javascript.com',
    'likes': 500
  },
  {
    'title': 'Typescript Blogs',
    'author': 'Jasobanta Sahoo',
    'url': 'http://blog.typescript.com',
    'likes': 5
  },
  {
    'title': 'Tailwind Blogs',
    'author': 'Chandan Kumar Sahoo',
    'url': 'http://blog.tailwind.com',
    'likes': 5
  },
  {
    'title': 'Bootstrap Blogs',
    'author': 'Chitra Sahoo',
    'url': 'http://blog.bootstrap.com',
    'likes': 5
  },
  {
    'title': 'Redux Blogs',
    'author': 'Smruti Sahoo',
    'url': 'http://blog.redux.com',
    'likes': 35,
  },
  {
    'title': 'React-Redux Blogs',
    'author': 'Satyabrata Sahoo',
    'url': 'http://blog.react-redux.com',
    'likes': 0
  }
]

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {

  test('which has max likes among blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      'title': 'Javascript Blogs',
      'author': 'Balabanta Sahoo',
      'url': 'http://blog.javascript.com',
      'likes': 500
    })
  })
})


describe('most blogs', () => {
  test('get author who posted more blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Satyabrata Sahoo', blogs: 2 })
  })
})

describe('most likes', () => {
  test('which has author has most likes on blog', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      'author': 'Balabanta Sahoo',
      'likes': 500
    })
  })
})
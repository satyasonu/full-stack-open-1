const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const sumoflikes = blogs.reduce((acc, b) => {
    return acc + b.likes
  }, 0)

  return sumoflikes
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxlike = Math.max(...likes)
  const favblogs = blogs.filter((blog) => blog.likes === maxlike)
  return favblogs[0]
}

const mostBlogs = (blogs) => {
  const arr = blogs.map((blog) => blog.author)

  const numbers = arr.reduce((acc, obj) => {
    acc[obj] ??= 0
    acc[obj]++
    return acc
  }, {})

  const numberarr = Object.values(numbers)
  const max = Math.max(...numberarr)
  var getvalue = []
  for (const property in numbers) {
    if (numbers[property] === max) {
      getvalue.push({ author: property, blogs: numbers[property] })
    }
  }
  const maxIndex = numberarr.indexOf(max)
  const mostblogs = {
    author: Object.keys(numbers)[maxIndex],
    blogs: Object.values(numbers)[maxIndex],
  }
  return mostblogs
}

const mostLikes = (blogs) => {
  const arr = blogs.map((blog) => blog.likes)

  const max = Math.max(...arr)

  const findmaxblogs = blogs.filter((blog) => blog.likes === max)

  const maxlikeblogs = []

  findmaxblogs.map((blog) => {
    const bg = {
      author: blog.author,
      likes: blog.likes,
    }
    maxlikeblogs.push(bg)
  })
  return maxlikeblogs[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

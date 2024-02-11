const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
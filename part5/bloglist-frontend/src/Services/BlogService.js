import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token

const setToken = async (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {

  const config  = {
    headers : { Authorization : token}
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, create, setToken }
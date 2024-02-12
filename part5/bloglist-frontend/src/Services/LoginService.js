import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = async ({ usernameInput, passwordInput }) => {
  const res = await axios.post(baseUrl, { username:usernameInput, password:passwordInput })
  return res.data
}

export default { login }
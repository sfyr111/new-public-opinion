const axios = require('axios')

axios.defaults.baseURL = 'https://www.ai-union.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

module.exports = axios

/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = process.env.API_BASE || ''

axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.response.use((response) => {
  return response
})

function parseResponse(response) {
  return Promise.all([response.status, response.statusText, response.data])
}

function checkStatus([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data
  } else {
    const error = new Error(statusText)
    error.status = status
    error.error_message = data
    return Promise.reject(error)
  }
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  patch(url, data) {
    return axios({
      method: 'patch',
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  put(url, data) {
    return axios({
      method: 'put',
      url,
      data: qs.stringify(data),
      timeout: 20000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params, // get参数
      timeout: 20000,
      headers: {
      },
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
  delete(url, params) {
    return axios({
      method: 'delete',
      url,
      params, // get参数
      timeout: 20000,
      headers: {
      },
    }).then(response => {
      return response
    }).then(parseResponse).then(checkStatus)
  },
}

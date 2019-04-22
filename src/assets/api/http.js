'use strict'

import axios from 'axios'
import router from '../../router'
import { Message, Loading } from 'element-ui'

axios.defaults.withCredentials = false

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

export default {
  post (baseURL, url, data, callback) {
    return axios({
      baseURL: baseURL,
      method: 'post',
      url,
      data: data,
      timeout: 10000
    }).then(
      (res) => {
        if (typeof (callback) !== 'undefined') {
          callback(ret.res)
        }
        return res
      }
    )
  },
  get (baseURL, url, params, callback) {
    return axios({
      baseURL: baseURL,
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 30000
    }).then(
      (res) => {
        if (typeof (callback) !== 'undefined') {
          callback(ret.res)
        }
        return res
      }
    )
  },
  delete (baseURL, url, data) {
    return axios({
      baseURL: baseURL,
      method: 'delete',
      url,
      data: data,
      timeout: 10000
    }).then(
      (res) => {
        if (typeof (callback) !== 'undefined') {
          callback(ret.res)
        }
        if (res.data.code==0){
          Message.success('删除成功！')
        }else{
          Message.error('删除失败！')
        }
        // return res
      }
    )
  },
}

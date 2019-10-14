import Taro from '@tarojs/taro'
import {objToUrl} from '@/utils'
import {refreshToken} from './index'
import whiteList from '../constants/whiteList'
let requestQueue = []
function handleResponse(response) {
  if (response.statusCode === 200) {
    if (response.data.code === 0) {
      return Promise.reject(response.data)
    } else if (response.data.code === -1) {
      console.log('token过期了啦!')
      console.log('这里用户要重新登录才可以')
      requestQueue = []
      return Promise.reject({msg: '用户需要重新登录'})
    }
    return Promise.resolve(response.data)
  } else {
    return Promise.reject({msg: '接口异常！请检查接口是否有变更', code: response.statusCode, data: response.data})
  }
}
// 检查用户token是否过期(这里可以和token保存在一起，就不用再从localstorage里再取一次了)
// token两小时过期refresh_token一天过期
// 7000秒刷新一次，避免设置7200秒刷新出现一些未知问题
function tokenExpire () {
  const expire = Taro.getStorageSync('tokenExpire')
  return (Date.now() - expire) > 7000 * 1000
}
export const get = async (url, params) => {
  const formatUrl = url + objToUrl(params)
  return request({
    url: formatUrl,
    method: 'GET'
  })
}
export const post = async (url, data) => {
  return request({
    url,
    method: 'POST',
    data
  })
}
async function request(options) {
  if (whiteList.indexOf(options.url) > -1) {
    const response = await  Taro.request(options)
    return handleResponse(response)
  } else {
    let token = Taro.getStorageSync('token')
    if (!token || tokenExpire()) {
      requestQueue.push(options)
      try {
        const {data} = await refreshToken()
        Taro.setStorageSync('token', data.token)
        Taro.setStorageSync('refreshToken', data.refreshToken)
        Taro.setStorageSync('tokenExpire', Date.now())
        while (requestQueue.length) {
          const queueOpt = requestQueue.pop()
          queueOpt.header ={
            'x-token': data.token
          }
          const response = await Taro.request(queueOpt)
          return handleResponse(response)
        }
      } catch (error) {
        console.log('重新登录')
      }
    } else {
      options.header = {'x-token': token}
      const response = await Taro.request(options)
      return handleResponse(response)
    }
  }
}
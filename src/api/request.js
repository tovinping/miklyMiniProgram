import Taro from '@tarojs/taro'
import {objToUrl} from '@/utils'

function handleResponse(response) {
  if (response.statusCode === 200) {
    if (response.data.code === 0) {
      return Promise.reject(response.data)
    } else if (response.data.code === -1) {
      console.log('token过期了啦！')
    }
    return Promise.resolve(response.data)
  } else {
    return Promise.reject({msg: '接口异常！请检查接口是否有变更', code: response.statusCode, data: response.data})
  }
}

export const get = async (url, params) => {
  const formatUrl = url + objToUrl(params)
  const response = await Taro.request({
    url: formatUrl,
    method: 'GET'
  })
  return handleResponse(response)
}
export const post = async (url, data) => {
  const token = Taro.getStorageSync('token')
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NzA0MzM4OTYsImV4cCI6MTU3MDQzNDM5Nn0.L0UTU-Fd-IpRjFLfcNnxDf_Z1ACa6MrSzpiPT4cYE_o'
  const header = {'x-token': token}
  const response = await Taro.request({
    url,
    header,
    method: 'POST',
    data
  })
  return handleResponse(response)
}
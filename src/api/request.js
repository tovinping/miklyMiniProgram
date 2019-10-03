import Taro from '@tarojs/taro'
import {objToUrl} from '@/utils'

function handleResponse(response) {
  if (response.statusCode === 200) {
    if (response.data.code === 0) {
      return Promise.reject({message: response.data.msg})
    }
    return Promise.resolve(response.data)
  } else {
    return Promise.reject({message: '系统错误!', code: response.statusCode, data: response.data})
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
  const response = await Taro.request({
    url,
    method: 'POST',
    data
  })
  return handleResponse(response)
}
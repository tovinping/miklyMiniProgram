import Taro from '@tarojs/taro'
import * as url from '../constants/url'
import {get, post} from './request'
/**
 * 登录流程：
 * 0.判断用户是否已经授权获取userInfo
 * 1.若用户已授权则保存userInfo并用userInfo获取unionId再查询此unionId是否绑定自建平台帐号
 * 2.若用户未授权则获取openid和unionId;若获取到unionId则查询是否绑定自建平台帐号,否则保存openid以便后面授权后获取unionId
 * -----------这里应该定义好要么传多个参数,对对象形式传多个参数---------------------
 * **/ 
export const getOpenId = async (code) => {
  return post(url.GET_OPENID, {code})
}

export const getUnionid = async(encryptedData, iv) => {
  const openid = Taro.getStorageSync('openid')
  return post(url.GET_UNIONID, {openid, encryptedData, iv})
}

export const matchUnionId = async (unionId) => {
  return post(url.MATCH_UNIONID, {unionId})
}

export const getVerCode = async (verCodeId, width=150, height=70, fontSize=70) => {
  return post(url.GET_VERCODE, {verCodeId, width, height, fontSize})
}

export const bindUnionId = async (mail, password, verCode, verCodeId) => {
  const unionId = Taro.getStorageSync('unionid')
  return post(url.BIND_UNIONID, {mail, password, verCode, verCodeId, unionId})
}

export const getTicket = async () => {
  return post(url.GET_TICKET)
}

export const delTicket = async (userId, ticketId) => {
  return post(url.DEL_TICKET, {userId, ticketId})
}

export const getLike = async(userId) => {
  return post(url.GET_LIKE, {userId})
}

export const delLike = async (userId, ticketId) => {
  return post(url.DEL_LIKE, {userId, ticketId})
}

export const getAddress = async (userId) => {
  return post(url.GET_ADDRESS, {userId})
}

export const addAddress = async (data) => {
  return post(url.ADD_ADDRESS, data)
}

export const delAddress = async (id) => {
  return post(url.DEL_ADDRESS, {id})
}

export const getMoreTicket = async () => {
  return post(url.GET_MORETICKET)
}

export const delMoreTicket = async (data) => {
  return post(url.DEL_MORETICKET, data)
}
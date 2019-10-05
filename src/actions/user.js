import {
  TICKET,
  LIKE,
  ADDRESS
} from '../constants/store'

export const setTicket = (payload) => {
  return {
    type: TICKET,
    payload
  }
}

export const delTicket = (payload) => {
  return (dispatch, getState) => {
    const ticket = getState().user.ticket
    const data = ticket.data.filter(item => item.id !== payload)
    dispatch(setTicket({count: data.length, data}))
  }
}

export const addTicket = (payload) => {
  return (dispatch, getState) => {
    const ticket = getState().user.ticket
    ticket.data.push(payload)
    ticket.count = ticket.data.length
    dispatch(setTicket({...ticket}))
  }
}

export const setLike = (payload) => {
  return {
    type: LIKE,
    payload
  }
}

export const delLike = (payload) => {
  return (dispatch, getState) => {
    const like = getState().user.like
    const data = like.data.filter(item => item.id !== payload)
    dispatch(setLike({count: data.length, data}))
  }
}

export const setAddress = (payload) => {
  return {
    type: ADDRESS,
    payload
  }
}

export const addAddress = (payload) => {
  return (dispatch, getState) => {
    const address = getState().user.address
    address.data.push(payload)
    dispatch(setAddress({...address}))
  }
}

export const delAddress = (payload) => {
  return (dispatch, getState) => {
    const address = getState().user.address
    const data = address.data.filter(item => item.id !== payload)
    dispatch(setAddress({count: data.length, data}))
  }
}
import {
  TICKET,
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


import { LOGIN, LOGOUT } from '../constants/user'

const INITIAL_STATE = {
  userInfo: {},
}

export default function (state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        userInfo: payload
      }
     case LOGOUT:
       return {
         ...state,
         userInfo: {}
       }
     default:
       return state
  }
}

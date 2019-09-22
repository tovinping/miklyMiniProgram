import {
  LOGIN,
  LOGOUT
} from '../constants/user'

export const login = (payload) => {
  return {
    type: LOGIN,
    payload
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const checkLogin = () => {
  return dispatch => {
    wx.getUserInfo({
      success (res) {
        if (res.userInfo) {
          dispatch(login(res.userInfo))
        }
      },
      fail (err) {
        console.log(err)
      }
    })
  }
}

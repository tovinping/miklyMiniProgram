import { LOGIN, USERID, TICKET, LIKE, ADDRESS } from "../constants/store";

const INITIAL_STATE = {
  userInfo: {},
  userId: "", // 绑定平台帐号的ID
  ticket: {
    count: 0,
    data: []
  }, // 红包
  like: {
    count: 0,
    data: []
  }, // 收藏
  address: {
    count: 0,
    data: []
  } // 收货地址
};

export default function(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        userInfo: payload
      };
    case USERID:
      return {
        ...state,
        userId: payload
      };
    case TICKET:
      return {
        ...state,
        ticket: payload
      };
    case LIKE:
      return {
        ...state,
        like: payload
      };
    case ADDRESS:
      return {
        ...state,
        address: payload
      };
    default:
      return state;
  }
}

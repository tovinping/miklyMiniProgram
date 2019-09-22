import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  data: [],
  loading: true,
  pageNo: 1,
  pageSize: 10,
  hasNextPage: false
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
     default:
       return state
  }
}

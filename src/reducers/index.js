import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import user from './user'

export default combineReducers({
  counter,
  home,
  user
})

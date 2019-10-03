import Taro from '@tarojs/taro'
import {useDispatch} from '@tarojs/redux'
import { AtSwipeAction, AtMessage } from "taro-ui"
import * as api from '@/api'

import {delTicket} from '@/actions/user'
import './index.scss'
const options = [
  {
    text: '删除',
    style: {
      backgroundColor: '#FF4949'
    }
  }
]
const dispatch = useDispatch()
export default ({data = {}, userId=''}) => {
  const prefix = data.type === '1' ? '' : '￥'
  const sufix = data.type === '1' ? '折' : ''
  function useTicket () {
    console.log('使用红包')
  }
  async function handleDel () {
    try {
      dispatch(delTicket(data.id))
      const res = await api.delTicket(userId, data.id)
      console.log(res)
    } catch (error) {
      Taro.atMessage({
        message: error.message,
        type: 'error'
      })
    }
  }
  return (
    <AtSwipeAction options={options} onClick={handleDel}>
      <View className="ticket-item">
        <Text className="value">{prefix + data.value + sufix}</Text>
        <View className="info">
          <Text className="name">{data.name}</Text>
          <Text className="desc">{data.description}</Text>
        </View>
        <Text className="opt" onClick={useTicket}>去使用</Text>
      </View>
      <AtMessage />
    </AtSwipeAction>
  )
}
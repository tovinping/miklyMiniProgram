import Taro from '@tarojs/taro'
import {useDispatch} from '@tarojs/redux'
import { AtSwipeAction } from "taro-ui"
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
export default ({data = {}, userId='', disabled=false, disableOpt=false, optText='购物', handleOpt}) => {
  const dispatch = useDispatch()
  const prefix = data.type === '1' ? '' : '￥'
  const sufix = data.type === '1' ? '折' : ''
  function optClick () {
    handleOpt(data)
  }
  async function handleDel () {
    try {
      const res = await api.delTicket(userId, data.id)
      dispatch(delTicket(data.id))
      console.log(res)
    } catch (error) {
      Taro.atMessage({
        message: error.msg,
        type: 'error'
      })
    }
  }
  return (
    <AtSwipeAction options={options} disabled={disabled} onClick={handleDel}>
      <View className="ticket-item">
        <Text className="value">{prefix + data.value + sufix}</Text>
        <View className="info">
          <Text className="name">{data.name}</Text>
          <Text className="desc">{data.description}</Text>
        </View>
        <Text className={`opt ${disableOpt && 'diabled'}`}  onClick={optClick}>{optText}</Text>
      </View>
    </AtSwipeAction>
  )
}
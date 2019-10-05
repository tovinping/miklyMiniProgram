import Taro from '@tarojs/taro'
import {useDispatch} from '@tarojs/redux'
import { AtSwipeAction } from "taro-ui"
import * as api from '@/api'

import {delLike} from '@/actions/user'
import './index.scss'
const options = [
  {
    text: `取消\n收藏`,
    style: {
      backgroundColor: '#FF4949'
    }
  }
]
export default ({data = {}, userId=''}) => {
  const dispatch = useDispatch()
  const photo = data.photos && JSON.parse(data.photos)[0]
  function goDetail () {
    console.log('详情页面')
  }
  async function handleDel () {
    try {
      const res = await api.delLike(userId, data.id)
      console.log(res)
      dispatch(delLike(data.id))
    } catch (error) {
      Taro.atMessage({
        message: error.msg,
        type: 'error'
      })
    }
  }
  return (
    <AtSwipeAction options={options} onClick={handleDel}>
      <View className="like-item" onClick={goDetail}>
        <Image src={photo} />
        <View className="more">
          <Text className="name">{data.name}</Text>
          <Text className="count">已售{data.salescount}份</Text>
          <View className="sales">￥{data.sales}/2份</View>
        </View>
      </View>
    </AtSwipeAction>
  )
}
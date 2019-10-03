import { useState, useEffect, useShareAppMessage, useReachBottom, usePullDownRefresh, useDidShow, useDidHide } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'

import MySwiper from '../../components/MySwiper/index'

import './index.scss'

const iniData = [
  'https://tovinping.oss-cn-shenzhen.aliyuncs.com/images/milkyClient-15aawudsqz8itimg.png',
  'https://tovinping.oss-cn-shenzhen.aliyuncs.com/images/milkyClient-u4lz31lotyd27.jpg'
]

const Index = (props) => {
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  const [banner, setBanner] = useState([])
  useEffect(() =>{
    setBanner(iniData)
  },[])
  useDidShow(() => {
    console.log('didShow')
  })

  useDidHide(() => {
    console.log('didHide')
  })

  usePullDownRefresh(() => {
    console.log('下拉刷新')
  })

  useReachBottom(() => {
    console.log('上拉加载')
  })

  useShareAppMessage(() =>{
    return {
      title: '觅味茶吧',
      path: '/pages/home/index',
      // imageUrl: '../../images/share/home.jpeg' // 本地图片还不知道怎么取
    };
  })

  return (
    <View className='index'>
      <MySwiper banner={banner} />
      <View style={{textAlign: 'center'}}>
        <Text>计数器:{counter.num}</Text>
      </View>
      <Button onClick={() => dispatch({type: 'ADD'})}>添加</Button>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '觅味茶吧'
}

export default Index

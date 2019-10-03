import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/home/index'

import store from './store'

import {getOpenId, matchUnionId, getTicket} from './api'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/me/index',
      'pages/home/index',
      'pages/order/index',
      'pages/bind/index',
      'pages/me/ticket'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '觅味荼吧',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './images/tab/home.png',
          selectedIconPath: './images/tab/home_fill.png',
        },
        {
          pagePath: 'pages/order/index',
          text: '订单',
          iconPath: './images/tab/order.png',
          selectedIconPath: './images/tab/order_fill.png',
        },
        {
          pagePath: 'pages/me/index',
          text: '我的',
          iconPath: './images/tab/my.png',
          selectedIconPath: './images/tab/my_fill.png',
        },
      ],
      color: '#707070',
      selectedColor: '#2c2c2c',
      backgroundColor: '#fff',
      borderStyle: 'black',
    },
    // permission: {
    //   'scope.userLocation': {
    //     desc: '小程序将会根据你的位置推送最佳服务'
    //   },
    //   'scope.record': {
    //     desc: '小程序将要获取的录音功能'
    //   },
    //   'scope.userInfo': {
    //     desc: '小程序将会根据你的信息提供最佳服务'
    //   }
    // }
  }
  
  async componentDidMount () {
    // 检测是否之前已经授权登录
    try {
      const {userInfo} = await Taro.getUserInfo() //.then(({userInfo}) => {
      store.dispatch({type: 'LOGIN', payload: userInfo})
      // 查询是否绑定平台自建帐号
      const unionId = Taro.getStorageSync('unionid')
      if (unionId) {
        try {
          const {data} = await matchUnionId(unionId)
          store.dispatch({type: 'USERID', payload: data.id})
          // 查询红包、收藏、收藏地址等信息
          this.queryAllInfo(data.id)
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      // 用户未登录情况下先执行一次wx.login拿到openid和session_key(服务端)以便后面登录后拿到unionid
      const openid = Taro.getStorageSync('openid')
      if (openid) return
      const {code} = await Taro.login()
      try {
        const {openid, unionId} = await getOpenId(code) //openid, unionId
        openid && Taro.setStorage({key: 'openid', data: openid})
        unionId && Taro.setStorage({key: 'unionid', data: unionId})
      } catch (error) {
        console.log(error)
      }
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}
  
  async queryAllInfo(userId) {
    // 查询红包
    try {
      const {data} = await getTicket(userId)
      store.dispatch({type: 'TICKET', payload: {count: data.count, data: data.rows}})
    } catch (error) {
      console.log(error)
    }
    // 查询收藏 
    try {
      
    } catch (error) {
      
    }
    // 查询地址
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

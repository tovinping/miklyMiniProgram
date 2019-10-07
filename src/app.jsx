import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/home/index'

import store from './store'

import {getOpenId, getUnionid, matchUnionId} from './api'

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
      'pages/me/ticket',
      'pages/me/like',
      'pages/me/address',
      'pages/me/moreTicket'
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
    // 检测是否可以直接获取用户信息
    const me = this
    try {
      const {encryptedData, iv} = await Taro.getUserInfo({withCredentials: true}) //.then(({userInfo}) => {
      // 检查sessionKey是否有效
      Taro.checkSession({
        fail() {
          me.getOpenId(encryptedData, iv)
        },
        success() {
          me.getUnionid(encryptedData, iv)
        }
      })
    } catch (error) {
      this.getOpenId()
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  async getOpenId (encryptedData, iv) {
    try {
      const {code} = await Taro.login()
      const {openid, unionId} = await getOpenId(code) //openid, unionId

      openid && Taro.setStorage({key: 'openid', data: openid})
      if (unionId) {
        Taro.setStorage({key: 'unionid', data: unionId})
      } else if (encryptedData, iv) {
        this.getUnionid(encryptedData, iv)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getUnionid (encryptedData, iv) {
    const {unionId, avatarUrl, nickName, city} = await getUnionid(encryptedData, iv)
    unionId && Taro.setStorage({key: 'unionid', data: unionId})
    store.dispatch({type: 'LOGIN', payload: {nickName, city, avatarUrl}})
    unionId && this.checkBind(unionId)
  }
  // 查询是否绑定自建平台帐号
  async checkBind (unionId) {
    try {
      const {data} = await matchUnionId(unionId)
      Taro.setStorageSync('token', data.token)
      Taro.setStorageSync('refreshToken', data.refreshToken)
      store.dispatch({type: 'USERID', payload: 'isBind'})
    } catch (error) {
      console.log(error)
    }    
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

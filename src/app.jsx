import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/home/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/me/index',
      'pages/home/index',
      'pages/cart/index',
      'pages/order/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '奶茶吧',
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
    }
  }
  
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

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

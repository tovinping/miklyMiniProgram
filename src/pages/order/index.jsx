import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'


class Order extends Component {

    config = {
    navigationBarTitleText: '订单'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidShow () { 
    console.log('show')
  }

  componentDidHide () {
    console.log('hide')
   }

  render () {
    return (
      <View className='order'>
        <Text>订单页面</Text>
      </View>
    )
  }
}

export default Order

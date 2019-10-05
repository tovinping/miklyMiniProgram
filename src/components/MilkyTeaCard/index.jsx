import Taro from '@tarojs/taro'
import { AtCard } from "taro-ui"
import './index.scss'

export default (props={}) => {
  const photo = JSON.parse(props.photos)[0]

  return (<AtCard className="milky-card">
    <Image src={photo} alt="" />
    <View className="info">
      <Text className="title">{props.name}</Text>
      <Text className="sales-count">已售{props.salescount}份</Text>
      <View className="more-info">
        <View>
          <Text className="sales">{props.sales}</Text>
          <Text className="price">{props.price}</Text>
        </View>
        {props.showCart ? <Image src={require('@/images/cart.png')} alt="购买" /> : null}
      </View>
    </View>
  </AtCard>)
}

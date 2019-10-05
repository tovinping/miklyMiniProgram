import { AtButton } from 'taro-ui'
import './index.scss'

export default ({tips='暂无数据', btnText='点我有惊喜', btnClick}) => {
  return(<View className="empty-wrap">
    <Image style={{width: '100px', height: '100px'}} src={require('@/images/empty.png')} alt="" />
    <Text>{tips}</Text>
    <Text style={{paddingTop: 0}}>😪这UI~将就着看吧！emm~是否要在代码里写个招UI妹子做女朋友广告？仔细一想！靠！只有程序员才会看代码啊，哪里来的UI妹子！！！</Text>
    <AtButton type='primary' onClick={btnClick}>{btnText}</AtButton>
  </View>)
}
import Taro from '@tarojs/taro'
import {useSelector} from '@tarojs/redux'
import { AtMessage, AtButton } from "taro-ui"

import TicketItem from '@/components/Ticket'

const Ticket = () => {
  const {ticket, userId} = useSelector(state => state.user)
  function handleOpt (data) {
    console.log(data)
  }
  return (
    <View>
      {ticket.data.map(item => <TicketItem key={item.id} data={item} userId={userId} handleOpt={handleOpt}></TicketItem>)}
      <View style={{marginTop: '20px'}}>
        <Text style={{display: 'block', color: '#666', textAlign: 'center'}}>tips:每天早上10限量发放优惠券，赶快去看看~</Text>
        <View style={{width: '40%', margin: '0 auto', marginTop: '20px'}}>
          <AtButton type="primary" size="small" onClick={()=>Taro.navigateTo({url: '/pages/me/moreTicket'})}>领取优惠券</AtButton>
        </View>
      </View>
      <AtMessage />
    </View>
  )
}
Ticket.config = {
  navigationBarTitleText: "我的红包"
};
export default Ticket
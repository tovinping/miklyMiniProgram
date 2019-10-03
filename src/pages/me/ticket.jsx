import Taro from '@tarojs/taro'
import {useSelector, useDispatch} from '@tarojs/redux'
import TicketItem from '@/components/Ticket'

const Ticket = () => {
  const {ticket, userId} = useSelector(state => state.user)
  return (
    <View>
      {ticket.data.map(item => <TicketItem key={item.id} data={item} userId={userId}></TicketItem>)}
    </View>
  )
}
Ticket.config = {
  navigationBarTitleText: "我的红包"
};
export default Ticket
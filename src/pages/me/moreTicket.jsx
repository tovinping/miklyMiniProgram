import Taro, { useState, useEffect } from "@tarojs/taro";
import {useSelector, useDispatch} from '@tarojs/redux'
import {addTicket} from '@/actions/user'
import { getMoreTicket, delMoreTicket } from "@/api";
import { AtMessage } from "taro-ui";

import TicketItem from "@/components/Ticket";
export default () => {
  const [data, setData] = useState([]);
  const {userId} = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function getData() {
    try {
      const { data } = await getMoreTicket();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  async function itemClick(ticket) {
    if (ticket.inventory <= 0) return;
    try {
      await delMoreTicket({...ticket, userId});
      const newData = data.map(item => {
        if (ticket.id === item.id) {
          item.inventory--
        }
        return item;
      });
      dispatch(addTicket(ticket))
      setData(newData);
      Taro.atMessage({
        message: "领取成功",
        type: "success"
      });
    } catch (error) {
      Taro.atMessage({
        message: error.msg,
        type: "error"
      });
    }
  }
  return (
    <View>
      {data.map(item => (
        <TicketItem
          key={item.id}
          data={item}
          optText={'领取'}
          disableOpt={item.inventory === 0}
          handleOpt={itemClick}
        />
      ))}
      <AtMessage />
    </View>
  );
};

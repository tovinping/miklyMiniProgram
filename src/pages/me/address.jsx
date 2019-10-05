import Taro, { useEffect } from "@tarojs/taro";
import { useSelector, useDispatch } from "@tarojs/redux";
import { AtButton } from 'taro-ui'
import Empty from "@/components/Empty";
import AddressItem from '@/components/Address'
import {checkPermission} from '@/utils'
import {addAddress, delAddress} from '@/actions/user'
import * as api from '@/api'

const Address = () => {
  const { address, userId } = useSelector(state => state.user);
  const dispatch = useDispatch()
  async function getData () {
    try {
      const {data} = await api.getAddress(userId)
      dispatch({type: 'ADDRESS', payload: {count: data.count, data: data.rows}})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, []);
  async function submitAddress (data) {
    try {
      const res = await api.addAddress({...data, userId})
      dispatch(addAddress(data))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  function openAddress () {
    checkPermission('scope.address', () => {
      Taro.chooseAddress().then(res => {
        submitAddress(res)
      }).catch(err => {
        console.log(err)
      })
    })
  }
  async function handleDel (data) {
    console.log(data)
    try {
      const res = await api.delAddress(data.id)
      dispatch(delAddress(data.id))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View>
      {!address.data.length ? (
        <Empty tips={"你还没有收货地址"} btnText={"从微信添加"} btnClick={openAddress}/>
      ) : (
        <View>
          {address.data.map(item => <AddressItem key={item.id} data={item} handleDel={handleDel} />)}
          <View style={{marginTop: '20px'}}>
            <Text style={{display: 'block', color: '#666', textAlign: 'center', marginBottom: '20px'}}>tips:下单时可以直接选择微信收货地址</Text>
            <AtButton type='primary' onClick={openAddress}>从微信添加</AtButton>
          </View>
        </View>
      )}
    </View>
  );
};
Address.config = {
  navigationBarTitleText: "我的地址"
};

import {useEffect} from '@tarojs/taro'
import {useSelector, useDispatch} from '@tarojs/redux'
import { AtMessage } from "taro-ui"

import {getLike} from '@/api'
import LikeItem from '@/components/Like'

const Mylike = () => {
  const dispatch = useDispatch()
  const {like, userId} = useSelector(state => state.user)
  async function getData () {
    try {
      const {data} = await getLike(userId)
      dispatch({type: 'LIKE', payload: {count: data.count, data: data.rows}})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (<View>
    {like.data.map(item => <LikeItem key={item.id} data={item} />)}
    <AtMessage />
  </View>)
}
Mylike.config = {
  navigationBarTitleText: "我的收藏"
};
export default Mylike
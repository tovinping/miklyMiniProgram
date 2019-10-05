import Taro from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import {useSelector, useDispatch} from '@tarojs/redux'
import { AtMessage, AtList, AtListItem, AtButton } from "taro-ui"
import {getUnionid, matchUnionId} from '../../api'
import {checkBind} from '@/utils'

import "./index.scss";

const Me = () => {
  const {userInfo, userId, ticket} = useSelector(state => state.user)
  const dispatch = useDispatch()
  function myTicket () {
    const bind = checkBind({showMsg: true})
    if (bind) {
      Taro.navigateTo({url: '/pages/me/ticket'})
    }
  }
  function myLike () {
    const bind = checkBind({showMsg: true})
    if (bind) {
      Taro.navigateTo({url: '/pages/me/like'})
    }
  }
  function myAddress () {
    const bind = checkBind({showMsg: true})
    if (bind) {
      Taro.navigateTo({url: '/pages/me/address'})
    }
  }
  async function getUserInfo(e) {
    if (e.detail.userInfo) {
      const data = e.detail
      // 获取 unionid并判断是否有绑定自建平台帐号
      try {
        const {unionId, avatarUrl, nickName, city} = await getUnionid(data.encryptedData, data.iv)
        unionId && Taro.setStorage({key: 'unionid', data: unionId})
        dispatch({type: 'LOGIN', payload: {nickName, city, avatarUrl}})
        const res = await matchUnionId(unionId)
        dispatch({type: 'USERID', payload: res.data.id})
      } catch (error) {
        Taro.atMessage({
          message: error.msg,
          type: 'error'
        })
      }
    }else{
      console.log('用户没同意授权登陆, funk!你拿它一点办法都没有....')
    }
  }
  function giftClick() {
    console.log('绑定得大礼包哦~')
    Taro.navigateTo({url: '/pages/bind/index'})
  }
  return (
    <View className="user-page">
      {userInfo.nickName ? (
        <View className="user-info">
          <Image className="avatar" src={userInfo.avatarUrl} />
          <View className="detail">
            <Text className="name">{userInfo.nickName}</Text>
            <Text className="city">{userInfo.city}</Text>
          </View>
          <View className="bind">
            {userId ? (
              <Text>你已经绑定平台帐号</Text>
              ) : (
                <Image src={require('@/images/giftBag.png')} alt="绑定得礼包" onClick={giftClick} />
            )}
          </View>
        </View>
      ) : (
        <Button open-type="getUserInfo" ongetuserinfo={getUserInfo}>
          点击使用微信登录
        </Button>
      )}
      <View className="ad-item">
        <Image src="https://tovinping.oss-cn-shenzhen.aliyuncs.com/images/milkyClient-whj8y6t4qf191.jpg" ></Image>
      </View>
      <View className="more-info">
        <AtList>
          <AtListItem
            title='我的红包'
            extraText={`${ticket.count}个`}
            arrow='right'
            thumb={require('@/images/money_bag.png')}
            onClick={myTicket}
          />
          <AtListItem
            title='我的收藏'
            arrow='right'
            thumb={require('@/images/like.png')}
            onClick={myLike}
          />
          <AtListItem
            title='我的地址'
            arrow='right'
            thumb={require('@/images/location.png')}
            onClick={myAddress}
          />
          <AtListItem 
            title='我的客服' 
            arrow='right' 
            thumb={require('@/images/service_icon.png')}
          />
        </AtList>
        <AtButton openType="contact" className="service-btn"></AtButton>
      </View>
      <AtMessage />
    </View>
  );
};
Me.config = {
  navigationBarTitleText: "我的"
};

export default Me

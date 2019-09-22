import {
  useDidShow,
  useDidHide,
  useEffect
} from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { checkLogin } from "../../actions/user";

import "./index.scss";

const Me = ({ userInfo, dispatch }) => {
  useEffect(() => {
    // 检查用户是否登录
    dispatch(checkLogin());
  }, []);

  useDidShow(() => {
    console.log("didShow");
  });

  useDidHide(() => {
    console.log("didHide");
  });
  function myTicket () {
    wx.showToast({
      title: '功能正在开发中',
      icon: 'none',
      duration: 1000
    })
  }
  function myLike () {
    wx.showToast({
      title: '功能正在开发中',
      icon: 'none',
      duration: 1000
    })
  }
  function myAddress () {
    wx.showToast({
      title: '功能正在开发中',
      icon: 'none',
      duration: 1000
    })
  }
  return (
    <View className="user-page">
      {userInfo.nickName ? (
        <View className="user-info">
          <Image className="avatar" src={userInfo.avatarUrl} />
          <View>
            <Text className="name">{userInfo.nickName}</Text>
            <Text className="city">{userInfo.city}</Text>
          </View>
        </View>
      ) : (
        <Button open-type="getUserInfo">
          点击使用微信登录
        </Button>
      )}
      <View className="more-info">
        <View className="item" onClick={myTicket}>
          <View>
            <Image src={require('../../images/ticket.png')} />
            <Text>我的卡券</Text>
          </View>
          <Image src={require('../../images/right.png')} />
        </View>
        <View className="item" onClick={myLike}>
          <View>
            <Image src={require('../../images/like.png')} />
            <Text>我的收藏</Text>
          </View>
          <Image src={require('../../images/right.png')} />
        </View>
        <View className="item" onClick={myAddress}>
          <View>
            <Image src={require('../../images/location.png')} />
            <Text className="fa fa-map">我的地址</Text>
          </View>
          <Image src={require('../../images/right.png')} />
        </View>
      </View>
    </View>
  );
};
Me.config = {
  navigationBarTitleText: "我的"
};
const mapStateToProps = ({ user }) => {
  return {
    userInfo: user.userInfo
  };
};

export default connect(mapStateToProps)(Me);

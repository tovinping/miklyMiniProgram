import Taro from '@tarojs/taro'
import {globalState} from '../store'

export function openSetting() {
  Taro.showModal({
    title: '此功能需要您的授权',
    content: "点击'确定'打开授权面板"
  }).then(({cancel}) => {
    if (cancel) {
      console.log('我叫你授权，你这是在干嘛呢!?')
      return
    }
    Taro.openSetting()
  })
}
export function checkPermission(scope, fn) {
  Taro.authorize({
    scope
  }).then(() => {
    fn()
  }).catch(() => {
    openSetting()
  })
}
export function checkBind({showMsg = false}) {
  const isBind = globalState().user.userId
  if (showMsg && !isBind) {
    Taro.atMessage({
      message: '请先绑定平台帐号',
      type: 'warning'
    })
  }
  return isBind
}
export function objToUrl (obj) {
  let objStr = JSON.stringify(obj)
  objStr = objStr.replace(/:/g, '=').replace(/,/g, '&').replace(/"|{|}/g, '')
  return '?' + objStr
}
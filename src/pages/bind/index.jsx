import Taro, {useState, useEffect} from '@tarojs/taro'
import { AtInput, AtButton, AtMessage } from 'taro-ui'
import {useDispatch} from '@tarojs/redux'
import {getVerCode, bindUnionId} from '@/api'
import './index.scss'

const dispatch = useDispatch()
const md5 = require('crypto-js/md5')
const verCodeId = Math.random().toString(36).substr(2)
let allPass = false
let mailPass = true
const Bind = () => {
  const [email, setEmail] = useState('')
  const [isMail, setIsMail] = useState(true)
  const [password, setPassword] = useState('')
  const [inputCode, setInutCode] = useState('')
  const [verCode, setVercode] = useState('')
  async function getAndSetVercode() {
    try {
      const {data} = await getVerCode(verCodeId)
      setVercode(`data:image/svg+xml, ${data}`)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()  => {
    getAndSetVercode()
  }, [])
  function checkInput () {
    const reg = /^([a-zA-Z0-9]|\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (!reg.test(email)) {
      setIsMail(false)
      mailPass = false
    } else {
      setIsMail(true)
      mailPass = true
    }
    if (password.length > 6 || inputCode.length === 4) {
      allPass = true
    } else {
      allPass = false
    }
  }
  async function submit () {
    checkInput()
    if (allPass && mailPass) {
      const md5pwd = md5(password).toString()
      try {
        const {data} = await bindUnionId(email, md5pwd, inputCode, verCodeId)
        dispatch({type: 'USERID', payload: data.id})
        Taro.atMessage({
          message: '绑定成功',
          type: 'success'
        })
        setTimeout(() => {
          Taro.navigateBack({ delta: 1 })
        }, 1500);
      } catch (error) {
        Taro.atMessage({
          message: error.msg,
          type: 'error'
        })
      }
      
    }
  }
  return (<View class="bind">
    <View class="email bind-item">
      <AtInput
        clear
        error={!isMail}
        name='email'
        title='帐号'
        type='text'
        placeholder='请输入帐号'
        value={email}
        onChange={setEmail}
      />
    </View>
    <View class="password bind-item">
      <AtInput
        name='password'
        title='密码'
        type='password'
        placeholder='请输入密码'
        value={password}
        onChange={setPassword}
      />
    </View>
    <View class="vercode bind-item">
      <AtInput
        title='验证码'
        type='text'
        maxLength='4'
        placeholder='请输入验证码'
        value={inputCode}
        onChange={setInutCode}
      >
        <Image src={verCode} alt="验证码" onClick={getAndSetVercode} />
      </AtInput>
    </View>
    <View class="submit">
      <AtButton type='primary' size='normal' onClick={submit}>绑定</AtButton>
    </View>
    <AtMessage />
  </View>)
}
Bind.config = {
  navigationBarTitleText: '绑定帐号'
}
export default Taro.memo(Bind)

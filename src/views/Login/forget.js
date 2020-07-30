import React from 'react'
import { Link } from 'react-router-dom'

import { message } from 'antd'
import './style2.scss'

const { $http } = React
const PhoneRegexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

class Forget extends React.Component {
  constructor(){
    super()
    this.state = {
      validateForm: {
        phone: '',
        imgCode: '',
        code: ''
      },
      form: {
        password: '',
        repeatPassword: ''
      },
      formType: 'validate',
      codeText: '获取验证码',
      disabled: false
    }
  }

  handleNext = (event) => {
    event.preventDefault()
    const { validateForm } = this.state
    if (!validateForm.phone) {
      return message.error('请输入手机号码')
    }
    if (!validateForm.imgCode) {
      return message.error('请输入图形验证码')
    }
    if (!validateForm.code) {
      return message.error('请输入验证码')
    }
    this.setState({
      formType: 'password',
      validateForm: {
        ...validateForm,
        code: ''
      }
    })
  }
  handlePrev = (event) => {
    event.preventDefault()
    this.setState({
      formType: 'validate',
      form: {
        password: '',
        repeatPassword: ''
      }
    })
  }
  handleValidate = (e) => {
    const value = e.target.value
    if (value && !PhoneRegexp.test(value)) {
      message.error('手机号码格式不正确')
    }
  }
  handleInputChange = (event, formType, name) => {
    const { validateForm, form } = this.state
    const value = event.target.value
    if (formType === 'validate') {
      validateForm[name] = value
      this.setState({ validateForm })
    } else {
      form[name] = value
      this.setState({ form })
    }
  }
  // 验证码已发送到手机，请注意查收
  handleGetCode = () => {
    if (!this.state.validateForm.phone || !PhoneRegexp.test(this.state.validateForm.phone)) {
      return message.error('请输入正确手机号码')
    }
    let s = 59
    let timer = null
    message.success('验证码已发送到手机，请注意查收')
    this.setState({
      disabled: true,
      codeText: `${s}秒后重新获取`
    }, () => {
      timer = setInterval(() => {
        s -= 1
        this.setState({
          codeText: `${s}秒后重新获取`
        })
        if (s === 0) {
          clearInterval(timer)
          this.setState({
            codeText: '获取验证码',
            disabled: false
          })
        }
      }, 1000)
    })
    // 获取验证码
    $http.get('send/code', { params: {phone: this.state.validateForm.phone}}).then(res => {
      clearInterval(timer)
      this.setState({
        validateForm: {...this.state.validateForm, code: res.code},
        codeText: '获取验证码',
        disabled: false
      })
    })
  }
  handleResetPassword = (event) => {
    event.preventDefault()
    const { form } = this.state
    if (!form.password) {
      return message.error('请输入密码')
    }
    if (!form.repeatPassword) {
      return message.error('请输入确认密码')
    }
    $http.post('reset/password', {form}).then(() => {
      message.success('密码重置成功，请到重新登录账号')
      setTimeout(() => {
        this.props.history.replace('/login')
      }, 1500)
    })
  }

  render() {
    const { formType, validateForm, codeText, disabled, form } = this.state
    return (
      <div className="login-wrapper forget">
        <div className={`container ${formType === 'password' ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container validate-container">
            <form id="validate" onSubmit={this.handleNext}>
              <h1>忘记密码</h1>
              <input type="text" value={validateForm.phone} onBlur={this.handleValidate} onChange={(event) => this.handleInputChange(event, 'validate', 'phone')} name="phone" placeholder="请输入手机号码" />
              <div className="d-flex w-100">
                <input type="text" value={validateForm.imgCode} onChange={(event) => this.handleInputChange(event, 'validate', 'imgCode')} name="imgCode" placeholder="图形验证码" />
                <img src="https://www.oschina.net/action/user/captcha" alt="code" className="img-code" />
              </div>
              <div className="d-flex w-100">
              <input type="text" value={validateForm.code} onChange={(event) => this.handleInputChange(event, 'validate', 'code')} name="code" placeholder="短信验证码" />
              <button type="button" className={`code ${disabled ? 'code-disabled' : ''}`} disabled={disabled} onClick={this.handleGetCode}>{codeText}</button>
              </div>
              <button type="submit" data-type="primary" className="mt-20">找回密码</button>
              <Link to="/login">已有账号，去登录</Link>
            </form>
          </div>
          <div className="form-container password-container">
            <form id="password" onSubmit={this.handleResetPassword}>
              <h1>设置密码</h1>
              <input type="password" value={form.password} onChange={(event) => this.handleInputChange(event, 'form', 'password')} name="phone" placeholder="请输入密码" />
              <input type="password" value={form.repeatPassword} onChange={(event) => this.handleInputChange(event, 'from', 'repeatPassword')} name="code" placeholder="请确认密码" />
              <button type="submit" data-type="primary" className="mt-20">重置新密码</button>
              <button type="submit" className="mt-20" onClick={this.handlePrev}>上一步</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Forget
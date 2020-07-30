import React from 'react'
import { Link } from 'react-router-dom'

import { message, notification } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons';
import './style2.scss'

const { $http } = React

class Login2 extends React.Component {
  constructor() {
    super()
    this.state = {
      loginType: true,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: ''
      }
    }
  }

  toggleClass = () => {
    this.setState((state) => {
      if (state.loginType) {
        return {
          loginType: state.loginType,
          registerForm: {
            username: '',
            email: '',
            password: ''
          }
        }
      }
      return { loginType: state.loginType }
    })
    this.setState({ loginType: !this.state.loginType })
  }
  handleInputChange = (event, formType, labelName) => {
    const { loginForm, registerForm } = this.state
    if (formType === 'register') {
      registerForm[labelName] = event.target.value
      this.setState({ registerForm })
    } else {
      loginForm[labelName] = event.target.value
      this.setState({
        loginForm,
        registerForm: {
          username: '',
          email: '',
          password: ''
        }
      })
    }
  }
  handleLogin = (event) => {
    event.preventDefault()
    const { loginForm } = this.state
    if (!loginForm.username) {
      return message.error('用户名不能为空')
    }
    if (!loginForm.password) {
      return message.error('密码不能为空')
    }
    this.setState({loading: true})
    $http.post('login', { ...loginForm }).then((res) => {
      const { token, ...user } = res
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('userInfo', JSON.stringify(user))
      message.success('登录成功')
      this.setState({loading: false})
      this.props.history.push('/home')
    })
  }
  handleRegister = (event) => {
    event.preventDefault()
    const { registerForm } = this.state
    if (!registerForm.username) {
      return message.error('用户名不能为空')
    }
    if (!registerForm.email) {
      return message.error('邮箱不能为空')
    }
    if (!registerForm.password) {
      return message.error('密码不能为空')
    }
    $http.post('register', { ...registerForm }).then(() => {
      notification.success({
        key: 'register',
        message: '注册成功！',
        description: '账号注册成功，正在为你登录...',
      })
      setTimeout(() => {
        // 注册成功后，直接登录
        $http.post('login', {
          username: registerForm.username,
          password: registerForm.password
        }).then((res) => {
          notification.close('register')
          const { token, ...user } = res
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem('userInfo', JSON.stringify(user))
          message.success('登录成功')
          this.props.history.push('/home')
        })
      }, 2000)
    })
  }

  render() {
    const { loginType, registerForm, loginForm, loading } = this.state
    const activeClass = !loginType ? 'right-panel-active' : ''
    return (
      <div className="login-wrapper">
        <div className={`${activeClass} container`} id="container">
          <div className="form-container sign-up-container">
            <form id="register" onSubmit={this.handleRegister}>
              <h1>注册</h1>
              <input type="text" name="username" value={registerForm.username}  onChange={(event) => this.handleInputChange(event, 'register', 'username')} placeholder="用户名" />
              <input type="email" name="email"value={registerForm.email} onChange={(event) => this.handleInputChange(event, 'register', 'email')} placeholder="邮箱" />
              <input type="password" name="password" value={registerForm.password} onChange={(event) => this.handleInputChange(event, 'register', 'password')} placeholder="密码" />
              <button type="submit" data-type="primary">注册</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form id="login" onSubmit={this.handleLogin}>
              <h1>登录</h1>
              <input type="text" value={loginForm.username} onChange={(event) => this.handleInputChange(event, 'login', 'username')} name="username" placeholder="用户名" />
              <input type="password" value={loginForm.password} onChange={(event) => this.handleInputChange(event, 'login', 'password')} name="password" placeholder="密码" />
              <Link to="/forget">忘记密码</Link>
              <button type="submit" data-type="primary" disabled={loading ? true : false}>
                {loading ? <LoadingOutlined className="mr-5" /> : null}登录
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="text-white">欢迎回来！</h1>
                <p>请您先登录的个人信息，进行操作。</p>
                <button className="ghost" data-type="primary" id="signIn" onClick={this.toggleClass}>登录</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="text-white">注册新账号！</h1>
                <p>输入您的个人信息注册账号。</p>
                <button className="ghost" data-type="primary" id="signUp" onClick={this.toggleClass}>注册</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login2
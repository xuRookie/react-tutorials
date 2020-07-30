import React from 'react'
import { Card, Form, Input, Button, Space, message } from 'antd'

import style from './style.module.scss'

const { $http } = React
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

const footerLayout = {
  wrapperCol: {
    offset: 4,
    span: 16
  }
}

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {
        username: '',
        password: '',
        validateCode: ''
      }
    }
  }

  handleSubmit = (values) => {
    $http.post('login', values).then(res => {
      const { token, ...user } = res
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('userInfo', JSON.stringify(user))
      message.success('登录成功')
      this.props.history.push('/home')
    })
  }

  render() {
    return (
      <div className={style['page-login']}>
        <Card title="欢迎登录" className={style['login-wrapper']}>
          <Form {...layout} initialValues={this.state.form} ref={this.formRef} name="control-ref" onFinish={this.handleSubmit}>
            <Form.Item label="用户名" name="username"
              rules={[
                () => ({
                  validator(rule, value) {
                    if (!value) {
                      return Promise.reject('请输入用户名')
                    }
                    return Promise.resolve()
                  }
                })
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="password"
              rules={[
                () => ({
                  validator(rule, value) {
                    if (!value) {
                      return Promise.reject('请输入密码')
                    }
                    return Promise.resolve()
                  }
                })
              ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="验证码" name="validateCode"
              rules={[
                () => ({
                  validator(rule, value) {
                    if (!value) {
                      return Promise.reject('请输入验证码')
                    }
                    return Promise.resolve()
                  }
                })
              ]}>
              <Input addonAfter={
                <img src="https://www.oschina.net/action/user/captcha" alt="code" width="100" height="30" />
              } />
            </Form.Item>
            <Form.Item {...footerLayout}>
              <Space size={20}>
                <Button type="primary" htmlType="submit">登录</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Login
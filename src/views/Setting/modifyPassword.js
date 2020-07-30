import React from 'react'

import { Card, Form, Input, Button, Space, Spin, message  } from 'antd'

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

// 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在6-16之间
const Regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/

class ModifyPassword extends React.Component {
  constructor() {
    super()
    this.state = {
      spinning: false,
      form: {
        password: '',
        rePassword: '',
      }
    }
  }

  formRef = React.createRef()

  handleSubmit = values => {
    this.setState({spinning: true})
    $http.put('password/modify', values).then(() => {
      message.success('密码修改成功')
      this.formRef.current.resetFields()
      this.setState({spinning: false})
    }).catch(() => {
      this.setState({spinning: false})
    })
  }

  render() {
    const { spinning } = this.state
    return (
      <div className="page-modify-password">
        <Card title="修改密码">
          <Spin spinning={spinning}>
            <Form {...layout} initialValues={this.state.form} ref={this.formRef} name="control-ref" onFinish={this.handleSubmit}>
              <Form.Item label="当前密码" name="password" hasFeedback
                rules={[
                  { required: true, message: '请输入你的密码！' }
                ]}>
                <Input.Password />
              </Form.Item>
              <Form.Item label="新密码" required={true}>
                <Form.Item name="newPassword" hasFeedback
                  style={{marginBottom: 0}}
                  rules={[
                    { required: true, message: '请输入你的新密码！' },
                    { pattern: Regexp, message: '密码格式不正确' }
                  ]}>
                  <Input.Password />
                </Form.Item>
                <span className="ant-form-text">
                  <span className="text-grey-9">必须包含大小写字母和数字的组合，不能使用特殊字符，长度在6-16之间</span>
                </span>
              </Form.Item>
              <Form.Item label="确认新密码" name="rePassword"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: '请再次输入密码'},
                  ({ getFieldValue }) => ({
                    validator(rule, value) {

                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve()
                      }

                      return Promise.reject('两次输入密码不一致')
                    }
                  })
                ]}>
                <Input.Password />
              </Form.Item>
              <Form.Item {...footerLayout}>
                <Space size={20}>
                  <Button type="primary" htmlType="submit">保存</Button>
                </Space>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    )
  }
}

export default ModifyPassword
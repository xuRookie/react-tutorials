import React from 'react'

import { Card, Form, Input, Button, Space  } from 'antd'

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

const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const DomainRegexp = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
const NumberRegexp = /^(0|[1-9][0-9]*)$/

class EmailService extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {
        smtpServer: 'baidu.com',
        smtpPort: '465',
        sendUserEmail: '234871928@qq.com',
        sendUserName: '李贤安',
        emailPassword: '123456'
      }
    }
  }

  formRef = React.createRef()

  handleSubmit = values => {
    console.log(values)
  }

  render() {
    return (
      <div className="page-email">
        <Card title="邮件服务">
          <Form {...layout} initialValues={this.state.form} ref={this.formRef} name="control-ref" onFinish={this.handleSubmit}>
            <Form.Item label="SMTP服务器">
              <Form.Item name="smtpServer"
                noStyle
                rules={[
                  { pattern: DomainRegexp, message: 'SMTP服务器格式不正确'}
                ]}
                style={{marginBottom: 0}}>
                <Input />
              </Form.Item>
              <span className="ant-form-text">
                <span className="text-grey-9">如：smtp.163.com</span>
              </span>
            </Form.Item>
            <Form.Item label="SMTP端口号">
              <Form.Item name="smtpPort"
                noStyle
                rules={[
                  { pattern: NumberRegexp, message: 'SMTP端口号只能是正整数'}
                ]}
                style={{marginBottom: 0}}>
                <Input />
              </Form.Item>
              <span className="ant-form-text">
                <span className="text-grey-9">一般为 25 或 465</span>
              </span>
            </Form.Item>
            <Form.Item label="发件人邮箱" name="sendUserEmail"
              rules={[
                { pattern: EmailRegexp, message: '邮箱格式不正确'}
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="发件人昵称" name="sendUserName">
                <Input />
            </Form.Item>
            <Form.Item label="邮箱登入密码" name="emailPassword">
              <Input type="password" />
            </Form.Item>
            <Form.Item {...footerLayout}>
              <Space size={20}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default EmailService
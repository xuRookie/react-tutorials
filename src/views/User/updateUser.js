import React from 'react'
import { Form, Modal, Button, Input, Radio, Space } from 'antd'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
}
const EmailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const PhoneRegexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

class UpdateUser extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        username: '',
        sex: 0,
        phone: '',
        email: ''
      }
    }
  }

  formRef = React.createRef()

  render() {
    const { visible, onSave, onCancel, modalType } = this.props
    
    return (
      <Modal title={modalType === 'add' ? '创建用户' : '编辑用户'} footer={null} visible={visible} onOk={onSave} onCancel={onCancel}>
        <Form {...layout} name="control-ref" ref={this.formRef} onFinish={onSave} initialValues={this.state.form}>
          <Form.Item label="用户名" name="username"
            rules={[
              { required: true, message: '请输入用户名'}
            ]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="手机号码" name="phone"
            rules={[
              { pattern: PhoneRegexp, message: '手机号码格式不正确'}
            ]}>
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item label="邮箱" name="email"
            rules={[
              { pattern: EmailRegexp, message: '邮箱格式不正确'}
            ]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type='primary' htmlType="submit">确定</Button>
              <Button type="button" onClick={onCancel}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default UpdateUser
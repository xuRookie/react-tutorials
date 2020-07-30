import React from 'react'

import { Card, Form, Input, InputNumber, Button, Select, Space  } from 'antd'

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

const Regexp = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*(\/)?$/

class WebsiteSetting extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {
        name: 'layuiAdmin',
        domain: 'https://www.baidu.com',
        cacheDate: 0,
        maxFileSizes: 2048,
        fileType: ['jpg', 'png', 'jpeg'],
        title: 'layuiAdmin 通用后台管理模板系统',
        keywords: 'React,React-router-dom,Redux',
        description: '作为 layui 官方推出的后台模板，从初版的饱受争议，到后续的埋头丰富，逐步占据了国内后台系统应用的主要市场。',
        copyright: '©️ 2020 layui.com MIT license'
      }
    }
  }

  websiteFormRef = React.createRef()

  handleSubmit = values => {
    console.log(values)
  }
  // handleReset = () => {
  //   this.websiteFormRef.current.resetFields()
  // }

  render() {
    return (
      <div className="page-website">
        <Card title="网站设置">
          <Form {...layout} initialValues={this.state.form} ref={this.websiteFormRef} name="control-ref" onFinish={this.handleSubmit}>
            <Form.Item label="网站名称" name="name"
              rules={[
                { required: true, message: '网站名称不能为空' },
                { type: 'string', min: 4, max: 20, message: '网站名称字数必须为4至20个字符内'}
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="网站域名" name="domain"
              rules={[
                { required: true, message: '网站域名不能为空' },
                { pattern: Regexp, message: '网站域名格式不正确'}
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="缓存时间" required={true}>
              <Form.Item name="cacheDate"
                noStyle
                style={{marginBottom: 0}}
                rules={[
                  { required: true, message: '缓存时间不能为空' },
                ]}>
                <InputNumber min={0} max={10} />
              </Form.Item>
              <span className="ant-form-text">
                <span className="mx-10 text-grey-6">分钟</span>
                <span className="text-grey-9">本地开发一般推荐设置为 0，线上环境建议设置为 10。</span>
              </span>
            </Form.Item>
            <Form.Item label="最大文件上传" required={true}>
              <Form.Item name="maxFileSizes"
                noStyle
                style={{marginBottom: 0}}
                rules={[
                  { required: true, message: '最大文件上传不能为空' },
                ]}>
                <InputNumber min={0} max={5120} />
              </Form.Item>
              <span className="ant-form-text">
                <span className="mx-10 text-grey-6">KB</span>
                <span className="text-grey-9">提示: 1M = 1024KB</span>
              </span>
            </Form.Item>
            <Form.Item label="上传文件类型" name="fileType"
              rules={[
                { required: true, message: '上传文件不能为空' },
              ]}>
              <Select mode="multiple" showArrow={true}>
                <Select.Option key="jpg" value="jpg">JPG</Select.Option>
                <Select.Option key="jpeg" value="jpeg">JPEG</Select.Option>
                <Select.Option key="png" value="png">PNG</Select.Option>
                <Select.Option key="gif" value="gif">GIF</Select.Option>
                <Select.Option key="zip" value="zip">ZIP</Select.Option>
                <Select.Option key="rar" value="rar">rar</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="首页标题" name="title"
              rules={[
                { required: true, message: '首页标题不能为空' },
                { type: 'string', min: 4, max: 50, message: '首页标题字数必须为4至50个字符内'}
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="META关键词" name="keywords">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="META描述" name="description">
              <Input.TextArea rows={4}  />
            </Form.Item>
            <Form.Item label="版权信息" name="copyright">
              <Input.TextArea rows={4} />
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

export default WebsiteSetting
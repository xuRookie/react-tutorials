import React from 'react'

import { Form, Row, Col, Input, Select, Button, Space, Card, Table, Modal, message } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

const { $http } = React
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};
const searchItem = [
  { key: 'commentator', name: 'commentator', label: '评论人', defaultValue: null, type: 'input', placeholder: '请输入' },
  { key: 'content', name: 'content', label: '评论内容', defaultValue: null, type: 'input', placeholder: '请输入' }
]

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      commentTableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      modalVisible: false,
      modalForm: {
        id: '',
        content: ''
      },
      modalLoading: false
    }
  }

  searchRef = React.createRef()
  formRef = React.createRef()

  columns = [
    { title: '评论人', dataIndex: 'commentator' },
    { title: '评论内容', dataIndex: 'content' },
    { title: '评论时间', dataIndex: 'createDate' },
    { title: '操作', key: 'action', render: (text, record) => {
      return (
        <React.Fragment>
          <Button type="link" onClick={() => this.onEdit(record)}><EditOutlined />编辑</Button>
          <Button type="link" onClick={() => this.onDelete(record)}><DeleteOutlined />删除</Button>
        </React.Fragment>
      )
    }}
  ]

  componentDidMount() {
    this.setState({loading: true})
    this.onLoadCommentList()
  }

  onLoadCommentList = (params) => {
    const {pagination} = this.state
    const query = {
      ...params,
      page: pagination.current,
      pageSize: pagination.pageSize
    }
    $http.get('comment/list', {params: query}).then(res => {
      const {list, ...pagination} = res
      const {page, ...args} = pagination
      this.setState({
        commentTableData: list,
        pagination: {
          current: page,
          ...args
        },
        loading: false
      })
    })
  }
  onSearch = (values) => {
    this.setState({loading: true})
    this.onLoadCommentList(values)
  }
  onOpenModal = () => {
    this.setState({
      modalVisible: true
    })
  }
  paginationChange = (pagination) => {
    this.setState({
      loading: true,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize
      }
    }, () => {
      this.onLoadCommentList()
    })
  }
  onEdit = (record) => {
    this.setState({
      modalVisible: true,
      modalForm: {
        id: record.id,
        content: record.content
      }
    }, () => {
      this.formRef.current && this.formRef.current.setFieldsValue({
        id: record.id,
        content: record.content
      })
    })
  }
  onDelete = (record) => {
    Modal.confirm({
      title: '删除评论',
      icon: <ExclamationCircleOutlined />,
      content: (<span>确认删除此条评论吗？</span>),
      onOk: () => {
        this.setState({loading: true})
        $http.delete('comment/delete', {data: {id: record.id}}).then(() => {
          message.success('删除成功')
          this.onLoadCommentList()
        })
      }
    })
  }
  onSave = values => {
    const { modalForm } = this.state
    this.setState({ modalLoading: true })
    values.id = modalForm.id
    $http.put('comment/edit', values).then(() => {
      message.success('编辑成功')
      this.onCancel()
      this.onLoadCommentList()
    })
  }
  onCancel = () => {
    this.setState({
      modalVisible: false,
      modalLoading: false,
      modalForm: {
        id: '',
        content: ''
      }
    }, () => {
      this.formRef.current.setFieldsValue({
        id: '',
        content: ''
      })
    })
  }

  render() {
    const { loading, commentTableData, pagination, modalVisible, modalForm, modalLoading } = this.state;
    const getFields = () => {
      const children = searchItem.map(item => (
        <Col span={6} key={item.key}>
          <Form.Item
            name={item.name}
            label={item.label}
            initialValue={item.defaultValue}>
              {item.type === 'input' ?
                <Input placeholder={item.placeholder} /> :
                <Select>
                  {item.options.map(option => (
                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                  ))}
                </Select>}
          </Form.Item>
        </Col>
      ))
      return children
    }
    const searchControl = (
      <Col span={6}>
        <Space>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button onClick={() => this.searchRef.current.resetFields()}>重置</Button>
        </Space>
      </Col>
    )
    return (
      <Card title="文章评论">
        <Form ref={this.searchRef}
          name="search"
          onFinish={this.onSearch}>
            <Row gutter={24}>
              {getFields()}
              {searchControl}
            </Row>
        </Form>
        <Table loading={loading} bordered columns={this.columns} pagination={pagination} onChange={this.paginationChange} dataSource={commentTableData} />
        <Modal
          title="编辑评论"
          visible={modalVisible}
          onOk={this.onSave}
          onCancel={this.onCancel}
          footer={null}>
          <Form {...layout} ref={this.formRef} initialValues={modalForm} name="comment-form" onFinish={this.onSave}>
            <Form.Item label="评论内容" name="content">
              <Input.TextArea rows={4} placeholder="请输入内容" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button loading={modalLoading} type="primary" htmlType="submit">保存</Button>
                <Button onClick={this.onCancel}>取消</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}

export default Comment
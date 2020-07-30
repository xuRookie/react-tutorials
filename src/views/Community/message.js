import React from 'react'
import { connect } from 'react-redux'
import { Space, Card, Table, Button, Row, Col, Select, Form, message } from 'antd'

import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import {
  fetchList,
  fetchMessageDelete,
  fetchMessageStatus
} from './action'

const columns = [
  { title: '消息内容', dataIndex: 'content' },
  { title: '状态', dataIndex: 'status', render: (text) => {
    const styleClass = text === 0 ? 'text-green' : 'text-light-red'
    return (
      <span className={styleClass}>{text === 0 ? '已读' : '未读'}</span>
    )
  }},
  { title: '时间', dataIndex: 'createDate'},
]

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      loading: true,
      selectedRowKeys: [],
      control: {
        delete: {
          message: '删除成功',
          fn: props.onMessageDelete
        },
        read: {
          message: '标记成功',
          fn: props.onMessageStatus
        }
      }
    }
  }

  formRef = React.createRef()

  componentDidMount() {
    const { onLoadMessageList, pagination = {} } = this.props
    onLoadMessageList({
      status: this.state.status,
      page: pagination.current,
      pageSize: pagination.pageSize
    }, () => {
      this.setState({loading: false})
    })
  }
  onSelectedChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }
  onSearch = values => {
    const { onLoadMessageList, pagination = {} } = this.props
    this.setState({loading: true})
    onLoadMessageList({
      status: values.status,
      page: pagination.current,
      pageSize: pagination.pageSize
    }, () => {
      this.setState({loading: false})
    })
  }
  paginationChange = (pagination) => {
    const { onLoadMessageList } = this.props
    this.setState({loading: true})
    onLoadMessageList({
      status: this.state.status,
      page: pagination.current,
      pageSize: pagination.pageSize
    }, () => {
      this.setState({loading: false})
    })
  }
  onControl = (type) => {
    const { selectedRowKeys, control, status } = this.state
    const { onLoadMessageList, pagination } = this.props
    if (!selectedRowKeys.length) {
      return message.error('请先选择消息！')
    }
    control[type].fn(selectedRowKeys, () => {
      message.success(control[type].message)
      this.setState({ selectedRowKeys: [] }, () => {
        this.setState({loading: true})
        onLoadMessageList({
          status: status,
          page: pagination.current,
          pageSize: pagination.pageSize
        }, () => {
          this.setState({loading: false})
        })}
      )
    })
  }
  
  render() {
    const { list, pagination } = this.props
    const { selectedRowKeys, loading, status } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedChange
    }
    return (
      <Card title="消息列表">
        <Form ref={this.formRef}
          name="search"
          onFinish={this.onSearch}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  label="状态"
                  name="status"
                  initialValue={status}>
                    <Select>
                        <Select.Option value={-1}>全部消息</Select.Option>
                        <Select.Option value={0}>已读</Select.Option>
                        <Select.Option value={1}>未读</Select.Option>
                    </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button onClick={() => this.formRef.current.resetFields()}>重置</Button>
                </Space>
              </Col>
            </Row>
        </Form>
        <Space className="mb-10">
          <Button type="primary" onClick={() => this.onControl('delete')}><DeleteOutlined />删除</Button>
          <Button type="primary" onClick={() => this.onControl('read')}><EditOutlined />标记已读</Button>
        </Space>
        <Table loading={loading} bordered rowSelection={rowSelection} columns={columns} pagination={pagination} onChange={this.paginationChange} dataSource={list} />
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.messageReducer.list,
    pagination: state.messageReducer.pagination
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadMessageList: (query, resolve) => dispatch(fetchList(query, resolve)),
    onMessageDelete: (ids, resolve) => dispatch(fetchMessageDelete(ids, resolve)),
    onMessageStatus: (ids, resolve) => dispatch(fetchMessageStatus(ids, resolve)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
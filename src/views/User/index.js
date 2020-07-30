import React from 'react'
import { Form, Row, Col, Input, Button, Select, Space, Card, Table, Modal, message } from 'antd'

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import UpdateUser from './updateUser'

const {$http} = React
const searchItem = [
  { key: 'username', name: 'username', label: '用户名', defaultValue: null, type: 'input', placeholder: '请输入' },
  { key: 'email', name: 'email', label: '邮箱', defaultValue: null, type: 'input', placeholder: '请输入' },
  { key: 'sex', name: 'sex', label: '性别', defaultValue: -1, type: 'select', options: [
    { value: -1, label: '不限' },
    { value: 0, label: '男' },
    { value: 1, label: '女'}
  ], placeholder: '请选择' }
]

class User extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [],
      loading: false,
      query: {
        username: '',
        email: '',
        sex: -1
      },
      userTableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        { title: '用户名', dataIndex: 'username' },
        { title: '性别', dataIndex: 'sex', render: (text, record) => {
          return (
            <span>{text === 0 ? '男' : '女'}</span>
          )
        }},
        { title: '联系方式', dataIndex: 'phone' },
        { title: '邮箱地址', dataIndex: 'email' },
        { title: '创建时间', dataIndex: 'createDate' },
        { title: '操作', key: 'action', render: (text, record) => {
          return (
            <React.Fragment>
              <Button type="link" onClick={() => this.onEdit(record)}><EditOutlined />编辑</Button>
              <Button type="link" onClick={() => this.onDelete(record)}><DeleteOutlined />删除</Button>
            </React.Fragment>
          )
        }},
      ],
      modalVisible: false,
      modalForm: {},
      modalType: 'add'
    }
  }

  formRef = React.createRef()
  modalRef = null

  componentDidMount() {
    this.getUserList()
  }

  getUserList = () => {
    const { query, pagination } = this.state
    const params = {}
    for (let key in query) {
      if (query[key]) params[key] = query[key]
    }
    params['page'] = pagination.current
    params['pageSize'] = pagination.pageSize

    this.setState({loading: true})
    $http.get('user/list', { params }).then(res => {
      const { list, ...pagination } = res
      this.setState({ userTableData: list, pagination: {
        current: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total
      }, loading: false })
    })
  }

  onSearch = values => {
    this.setState({ query: values }, () => {
      this.getUserList()
    })
  }
  onSelectedChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }
  paginationChange = (pagination) => {
    this.setState({pagination: {
      current: pagination.current,
      pageSize: pagination.pageSize,
    }}, () => {
      this.getUserList()
    })
  }
  onEdit = (record) => {
    this.setState({
      modalVisible: true,
      modalForm: record,
      modalType: 'edit'
    }, () => {
      // ref 引用问题
      setTimeout(() => {
        this.modalRef.formRef.current.setFieldsValue({
          id: record.id,
          username: record.username,
          sex: record.sex,
          phone: record.phone,
          email: record.email
        })
      }, 100)
    })
  }
  onDelete = (record) => {
    Modal.confirm({
      title: '删除用户',
      icon: <ExclamationCircleOutlined />,
      content: (<span>确认删除用户<span className="text-light-red">{record.username}</span>吗？</span>),
      onOk: () => {
        $http.delete('user/delete', { data: {id: record.id} }).then(res => {
          message.success('删除成功')
          this.getUserList()
        })
      }
    })
  }
  onMultipleDelete = () => {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      return message.error('请先选择删除的用户！')
    }
    $http.delete('user/delete', { data: {ids: selectedRowKeys} }).then(res => {
      message.success('删除成功')
      this.setState({ selectedRowKeys: [] }, () => this.getUserList())
    })
  }
  onOpenModal = () => {
    this.setState({modalVisible: true, modalType: 'add', modalForm: null})
  }
  onModalSave = (values) => {
    const { modalForm, modalType } = this.state
    if (modalType === 'add') {
      $http.post('user/create', values).then(res => {
        message.success('添加成功')
        this.onModalCancel()
      })
    } else {
      values.id = modalForm.id
      $http.put('user/edit', values).then(res => {
        message.success('修改成功')
        this.onModalCancel()
      })
    }
  }
  onModalCancel = () => {
    this.modalRef.formRef.current.resetFields()
    this.setState({modalVisible: false, modalType: 'add', modalForm: null})
  }

  render() {
    const { loading, selectedRowKeys, columns, userTableData, pagination, modalVisible, modalType } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedChange
    }
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
          <Button onClick={() => this.formRef.current.resetFields()}>重置</Button>
        </Space>
      </Col>
    )
    return (
      <Card title="用户列表">
        <Form ref={this.formRef}
          name="search"
          onFinish={this.onSearch}>
            <Row gutter={24}>
              {getFields()}
              {searchControl}
            </Row>
        </Form>
        <Space className="mb-10">
          <Button type="primary" onClick={this.onOpenModal}><PlusOutlined />添加</Button>
          <Button type="primary" onClick={this.onMultipleDelete}><DeleteOutlined />批量删除</Button>
        </Space>
        <Table loading={loading} bordered rowSelection={rowSelection} columns={columns} pagination={pagination} onChange={this.paginationChange} dataSource={userTableData} />
        <UpdateUser ref={f => this.modalRef = f} modalType={modalType} visible={modalVisible} onSave={this.onModalSave} onCancel={this.onModalCancel} />
      </Card>
    )
  }
}

export default User
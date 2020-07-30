import React from 'react'
import { Form, Row, Col, Input, Button, Select, Space, Card, Table, Modal, message } from 'antd'

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import UpdateRole from './updateRole'

const {$http} = React
const searchItem = [
  { key: 'role', name: 'role', label: '角色筛选', defaultValue: -1, type: 'select', options: [
    { value: -1, label: '全部角色' },
    { value: 0, label: '超级管理员' },
    { value: 1, label: '管理员'},
    { value: 2, label: '纠错员'},
    { value: 3, label: '采购员'},
    { value: 4, label: '推销员'},
    { value: 5, label: '运营人员'},
    { value: 6, label: '编辑'},
  ], placeholder: '请选择' }
]

class Role extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [],
      loading: false,
      role: -1,
      roleTableData: [],
      columns: [
        { title: '角色名', dataIndex: 'roleName' },
        { title: '拥有权限', dataIndex: 'auth' },
        { title: '具体描述', dataIndex: 'description' },
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
      modalForm: null,
      modalType: 'add'
    }
  }

  formRef = React.createRef()
  modalRef = null

  componentDidMount() {
    this.getRoleList()
  }

  getRoleList = () => {
    const { query } = this.state
    const params = {}
    for (let key in query) {
      if (query[key]) params[key] = query[key]
    }

    this.setState({loading: true})
    $http.get('role/list', { params }).then(res => {
      const { list } = res
      this.setState({ roleTableData: list, loading: false })
    }).catch((err) => {
      this.setState({loading: false})
      const {data} = err
      message.error(data.desc || '列表获取失败')
    })
  }

  onSearch = values => {
    this.setState({ query: values }, () => {
      this.getRoleList()
    })
  }
  onSelectedChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }
  onEdit = (record) => {
    $http.get('role/details', {id: record.id}).then(res => {
      this.setState({
        modalVisible: true,
        modalForm: res,
        modalType: 'edit'
      })
    })
  }
  onDelete = (record) => {
    Modal.confirm({
      title: '删除角色',
      icon: <ExclamationCircleOutlined />,
      content: (<span>确认删除角色<span className="text-light-red">{record.roleName}</span>吗？</span>),
      onOk: () => {
        $http.delete('role/delete', { data: {id: record.id} }).then(res => {
          message.success('删除成功')
          this.getRoleList()
        })
      }
    })
  }
  onMultipleDelete = () => {
    const { selectedRowKeys } = this.state
    if (!selectedRowKeys.length) {
      return message.error('请先选择删除的角色！')
    }
    $http.delete('role/delete', { data: {ids: selectedRowKeys} }).then(res => {
      message.success('删除成功')
      this.setState({ selectedRowKeys: [] }, () => this.getRoleList())
    })
  }
  onOpenModal = () => {
    this.setState({modalVisible: true, modalType: 'add', modalForm: null})
  }
  onModalSave = (values) => {
    const { modalForm, modalType } = this.state
    if (modalType === 'add') {
      $http.post('role/create', values).then(res => {
        message.success('添加成功')
        this.onModalCancel()
      })
    } else {
      values.id = modalForm.id
      $http.put('role/edit', values).then(res => {
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
    const { loading, selectedRowKeys, columns, roleTableData, modalVisible, modalForm } = this.state;
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
      <Card title="角色列表">
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
        <Table loading={loading} bordered rowSelection={rowSelection} columns={columns} pagination={false} dataSource={roleTableData} />
        <UpdateRole ref={f => this.modalRef = f} visible={modalVisible} modalForm={modalForm} onSave={this.onModalSave} onCancel={this.onModalCancel} />
      </Card>
    )
  }
}

export default Role
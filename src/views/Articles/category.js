import React from 'react'

import { Form, Input, Button, Space, Card, Table, Modal, message } from 'antd'
import {
  EditOutlined,
  PlusOutlined,
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

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      categoryTableData: [],
      modalVisible: false,
      modalType: 'add',
      modalForm: {
        categoryName: '',
        categoryId: ''
      },
      modalLoading: false,
    }
  }

  formRef = React.createRef()

  columns = [
    { title: '分类名', dataIndex: 'categoryName' },
    { title: '创建时间', dataIndex: 'createDate' },
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
    this.onLoadCategoryList()
  }

  onLoadCategoryList = () => {
    $http.get('category/list').then(res => {
      this.setState({ categoryTableData: res, loading: false })
    })
  }

  onOpenModal = () => {
    this.setState({
      modalType: 'add',
      modalVisible: true
    })
  }
  onEdit = (record) => {
    this.setState({
      modalType: 'edit',
      modalVisible: true,
      modalForm: {
        categoryId: record.categoryId,
        categoryName: record.categoryName
      }
    }, () => {
      this.formRef.current.setFieldsValue({
        categoryName: record.categoryName
      })
    })
  }
  onDelete = (record) => {
    Modal.confirm({
      title: '删除分类',
      icon: <ExclamationCircleOutlined />,
      content: (<span>确认删除分类<span className="text-light-red">{record.title}</span>吗？</span>),
      onOk: () => {
        this.setState({loading: true})
        $http.delete('category/delete', {data: {id: record.id}}).then(() => {
          message.success('删除成功')
          this.onLoadCategoryList()
        })
      }
    })
  }
  onSave = values => {
    const { modalType, modalForm } = this.state
    this.setState({ modalLoading: true })
    if (modalType === 'add') {
      $http.post('category/create', values).then(() => {
        message.success('添加成功')
        this.onCancel()
        this.onLoadCategoryList()
      })
    } else {
      values.categoryId = modalForm.categoryId
      $http.put('category/edit', values).then(() => {
        message.success('编辑成功')
        this.onCancel()
        this.onLoadCategoryList()
      })
    }
  }
  onCancel = () => {
    this.setState({
      modalType: 'add',
      modalVisible: false,
      modalLoading: false,
      modalForm: {
        categoryId: '',
        categoryName: ''
      }
    }, () => {
      this.formRef.current.setFieldsValue({
        categoryName: ''
      })
    })
  }

  render() {
    const { loading, categoryTableData, modalType, modalVisible, modalLoading } = this.state;

    return (
      <Card title="文章分类">
        <Space className="mb-10">
          <Button type="primary" onClick={this.onOpenModal}><PlusOutlined />添加</Button>
        </Space>
        <Table loading={loading} bordered columns={this.columns} pagination={false} dataSource={categoryTableData} />
        <Modal
          title={modalType === 'add' ? '创建分类' : '编辑分类'}
          forceRender
          visible={modalVisible}
          onOk={this.onSave}
          onCancel={this.onCancel}
          footer={null}>
          <Form {...layout} ref={this.formRef} name="category-form" onFinish={this.onSave}>
            <Form.Item label="分类名" name="categoryName"
              rules={[
                { required: true, message: '请输入分类名'}
              ]}>
              <Input placeholder="请输入分类名" />
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

export default Category
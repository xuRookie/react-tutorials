import React from 'react'
import { connect } from 'react-redux'

import { Form, Row, Col, Input, Button, Select, Space, Card, Table, Tag, Modal, message } from 'antd'
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ClearOutlined
} from '@ant-design/icons'

import {
  fetchArticleList,
  fetchDeleteArticle
} from './action'

const searchItem = [
  { key: 'author', name: 'author', label: '作者', defaultValue: null, type: 'input', placeholder: '请输入' },
  { key: 'title', name: 'title', label: '标题', defaultValue: null, type: 'input', placeholder: '请输入' },
  { key: 'tag', name: 'tag', label: '标签', defaultValue: -1, type: 'select', options: [
    { value: -1, label: '全部' },
    { value: 0, label: '美食' },
    { value: 1, label: '新闻'},
    { value: 2, label: '体育'},
    { value: 3, label: '音乐'},
    { value: 4, label: '八卦'}
  ], placeholder: '请选择' }
]

const tags = {
  0: '美食',
  1: '新闻',
  2: '体育',
  3: '音乐',
  4: '八卦',
}

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      articleTableData: [],
      control: {
        'edit': {
          name: '编辑',
          message: '编辑成功',
          fn: (params, callback) => callback
        },
        'delete': {
          name: '删除',
          message: '删除成功',
          fn: props.onDeleteArticle
        },
        'takeDown': {
          name: '下架',
          message: '下架成功',
          fn: this.onTakeDown
        }
      }
    }
  }

  formRef = React.createRef()

  columns = [
    { title: '文章标题', dataIndex: 'title' },
    { title: '文章标签', dataIndex: 'tag', render: (text) => {
      return <span>{tags[text] || '未知'}</span>
    }},
    { title: '文章作者', dataIndex: 'author' },
    { title: '创建时间', dataIndex: 'createDate' },
    { title: '发布状态', dataIndex: 'status', render: (text) => {
      const color = text === 0 ? 'green' : ''
      const txt = text === 0 ? '已发布' : '未发布'
      return (
        <Tag color={color}>{txt}</Tag>
      )
    }},
    { title: '操作', key: 'action', render: (text, record) => {
      return (
        <React.Fragment>
          <Button type="link" onClick={() => this.onControl('edit', record)}><EditOutlined />编辑</Button>
          {record.status === 1 ?
          <Button type="link" onClick={() => this.onControl('delete', record)}><DeleteOutlined />删除</Button>
            : <Button type="link" onClick={() => this.onControl('takeDown', record)}><ClearOutlined />下架</Button>
          }
        </React.Fragment>
      )
    }}
  ]

  componentDidMount() {
    const { onLoadArticleList, pagination = {} } = this.props
    this.setState({loading: true})
    onLoadArticleList({
      page: pagination.current,
      pageSize: pagination.pageSize
    }, () => {
      this.setState({loading: false})
    })
  }

  onSearch = values => {
    const { onLoadArticleList, pagination } = this.props
    this.setState({loading: true})
    onLoadArticleList({
      ...values,
      page: pagination.current,
      pageSize: pagination.pageSize
    }, () => {
      this.setState({loading: false})
    })
  }
  onOpenModal = () => {
    message.error('此操作你暂无权限！')
  }
  onTakeDown = (record, callback) => {
    // 下架请求
    callback && callback()
  }
  onControl = (type, record) => {
    const { onLoadArticleList, pagination } = this.props
    const { control } = this.state
    if (type === 'edit') {
      return message.error('此操作你暂无权限！')
    }
    Modal.confirm({
      title: control[type]['name'] + '文章',
      icon: <ExclamationCircleOutlined />,
      content: (<span>确认{control[type]['name']}文章<span className="text-light-red">{record.title}</span>吗？</span>),
      onOk: () => {
        this.setState({loading: true})
        control[type].fn({id: record.id}, () => {
          message.success(control[type].message)
          const query = this.formRef.current.getFieldsValue()
          onLoadArticleList({
            ...query,
            page: pagination.current,
            pageSize: pagination.pageSize
          }, () => {
            this.setState({loading: false})
          })}
        )
      }
    })

  }
  paginationChange = (pagination) => {
    const { onLoadArticleList } = this.props
    this.setState({loading: true})
    const query = this.formRef.current.getFieldsValue()
    onLoadArticleList({
      ...query,
      page: pagination.current,
      pageSize: pagination.pageSize
    }, () => {
      this.setState({loading: false})
    })
  }

  render() {
    const { articleTableData, pagination } = this.props
    const { loading } = this.state;
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
        </Space>
        <Table loading={loading} bordered columns={this.columns} pagination={pagination} onChange={this.paginationChange} dataSource={articleTableData} />
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articleTableData: state.articleReducer.articleList,
    pagination: state.articleReducer.pagination
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadArticleList: (params, resolve) => dispatch(fetchArticleList(params, resolve)),
    onDeleteArticle: (params, resolve) => dispatch(fetchDeleteArticle(params, resolve)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
import React from 'react'
import { Card, Col, Row, Tag, Space, Progress, Radio, Table } from 'antd'
import {
  FlagOutlined,
  SmileOutlined,
  PoundOutlined,
  UserOutlined,
  EllipsisOutlined,
  LikeOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

import Echarts from 'echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

import { formatCurrency } from '@/utils'
import style from './style.module.scss'

import { HEAD_BANNER, CHART_OPTION } from './constants'

const { $http } = React
const UserColumns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: (text, record, index) => {
      switch(index) {
        case 0:
          return <span className="text-light-red">{text}</span>
        case 1:
          return <span className="text-yellow">{text}</span>
        case 2:
          return <span className="text-green">{text}</span>
        default:
          return <span>{text}</span>
      }
    }
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
    render: (text) => {
      return (
        <React.Fragment>
          <ClockCircleOutlined />
          <span className="ml-5">{text}</span>
        </React.Fragment>
      )
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return (
        <React.Fragment>
          <span>{record.status === 0 ? '离线' : '在线'}</span>
        </React.Fragment>
      )
    }
  },
  {
    title: '获得赞',
    dataIndex: 'like',
    key: 'like',
    render: (text, record) => {
      return (
        <React.Fragment>
          <span className="mr-5">{record.like}</span>
          <LikeOutlined />
        </React.Fragment>
      )
    }
  }
]

const TaskColumns = [
  {
    title: '任务',
    dataIndex: 'taskName',
    key: 'taskName',
    render: (text, record, index) => {
      switch(index) {
        case 0:
          return <span className="text-light-red">{text}</span>
        case 1:
          return <span className="text-yellow">{text}</span>
        case 2:
          return <span className="text-green">{text}</span>
        default:
          return <span>{text}</span>
      }
    }
  },
  {
    title: '所需时间',
    dataIndex: 'taskTime',
    key: 'taskTime',
  },
  {
    title: '完成状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    render: (text, record, index) => {
      const status = record.taskStatus === 0 ? '已完成' : record.taskStatus === 1 ? '进行中' : '未开始'
      switch(text) {
        case 0:
          return <span className="text-green">{status}</span>
        case 1:
          return <span className="text-yellow">{status}</span>
        case 2:
          return <span className="text-light-red">{status}</span>
        default:
          return <span>{status}</span>
      }
    }
  },
]

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      chart: null,
      date: '1',
      headerBanner: {
        visit: [0, '0万'],
        download: [0, '0%'],
        income: [0, '***'],
        activeUser: [0, '0%']
      },
      chartData: {},
      userTableData: [],
      taskTableData: []
    }
  }

  componentDidMount() {
    // 顶部统计
    $http.get('count').then(res => {
      this.setState({
        headerBanner: res
      })
    })
    // 图表
    this.chart = Echarts.init(document.getElementById('chart'))
    this.handleGetChart()
    // 表格
    $http.get('user/list').then(res => {
      const list = res.list.slice(0, 7)
      this.setState({userTableData: list})
    })
    $http.get('task/list').then(res => {
      const list = res.list.slice(0, 7)
      this.setState({taskTableData: list})
    })
  }

  showIcon = (type) => {
    switch(type) {
      case 'Flag':
        return <FlagOutlined />
      case 'Smile':
          return <SmileOutlined />
      case 'Pound':
          return <PoundOutlined />
      case 'User':
          return <UserOutlined />
      default:
          return <EllipsisOutlined />
    }
  }

  handleGetChart = () => {
    this.chart.showLoading({ color: '#5FB878'})
    $http.get('visit/chart').then(res => {
      this.chart.hideLoading()
      this.setState({ chartData: res })
      CHART_OPTION.series[0].data = res.visit
      CHART_OPTION.series[1].data = res.download
      CHART_OPTION.series[2].data = res.averageVisits
      
      this.chart.setOption(CHART_OPTION)
    }).catch(() => {
      this.chart.hideLoading()
    })
  }
  handleYearChange = (e) => {
    this.setState({date: e.target.value})
    this.handleGetChart()
  }

  render() {
    const { headerBanner, chartData, userTableData, taskTableData } = this.state
    return (
      <div className={style['page-home']}>
        <div className="header-wrapper">
          <Row gutter={16}>
            {HEAD_BANNER.map(item => (
              <Col span={6} key={item.key}>
                <Card title={item.title} extra={<Tag color={item.tagColor}>{item.tagValue}</Tag>}>
                  <p className={style['count']}>{formatCurrency(headerBanner[item.aliasCurrency][0])}</p>
                  <Row justify="space-between">
                    <Col span={12}>
                      <span>{item.desc}</span>
                    </Col>
                    <Col span={12} className="text-right">
                      <Space>
                        <span>{headerBanner[item.aliasCurrency][1]}</span>
                        <span>{this.showIcon(item.icon)}</span>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="home-chart mt-20">
          <Card title="访问量" extra={
            <Radio.Group size="small" className="fs-12" value={this.state.date} onChange={this.handleYearChange}>
              <Radio.Button value="1">今年</Radio.Button>
              <Radio.Button value="0">去年</Radio.Button>
            </Radio.Group>
          }>
            <Row gutter={16}>
              <Col span={16}>
                <div id="chart" style={{height: '330px'}}></div>
              </Col>
              <Col span={8}>
                <div className="p15">
                  <p className={`pb-10 fs-20 text-grey-6 ${style['chart-title']}`}>月访问数</p>
                  <p>同上期增长</p>
                  <Progress percent={chartData.monthVisit} strokeWidth={12}  />
                </div>
                <div className="p15">
                  <p className={`pb-10 fs-20 text-grey-6 ${style['chart-title']}`}>月下载数</p>
                  <p>同上期增长</p>
                  <Progress percent={chartData.monthDownload} strokeWidth={12}  />
                </div>
                <div className="p15">
                  <p className={`pb-10 fs-20 text-grey-6 ${style['chart-title']}`}>月收入</p>
                  <p>同上期增长</p>
                  <Progress percent={chartData.monthIncome} strokeWidth={12} />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
        <div className="home-table mt-20">
          <Row gutter={16}>
            <Col span="12">
              <Card title="本周活跃用户列表">
                <Table columns={UserColumns} className={style['table-border']} dataSource={userTableData} pagination={false} />
              </Card>
            </Col>
            <Col span="12">
              <Card title="项目进展">
                <Table columns={TaskColumns} className={style['table-border']} dataSource={taskTableData} pagination={false} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Home
export const HEAD_BANNER = [
  {
    key: 'week',
    title: '访问量',
    tagColor: '#1E9FFF',
    tagValue: '周',
    currency: 0,
    aliasCurrency: 'visit',
    desc: '总计访问量',
    count: '3.2万',
    icon: 'Flag'
  },
  {
    key: 'month',
    title: '下载',
    tagColor: '#2F4056',
    tagValue: '月',
    currency: 0,
    aliasCurrency: 'download',
    desc: '新下载',
    count: '10%',
    icon: 'Smile'
  },
  {
    key: 'year',
    title: '收入',
    tagColor: '#009688',
    tagValue: '年',
    currency: 0,
    aliasCurrency: 'income',
    desc: '总收入',
    count: '***',
    icon: 'Pound'
  },
  {
    key: 'user',
    title: '活跃用户',
    tagColor: '#FFB800',
    tagValue: '月',
    currency: 0,
    aliasCurrency: 'activeUser',
    desc: '最近一个月',
    count: '15%',
    icon: 'User'
  }
]

export const CHART_OPTION = {
  color: ['#009688', '#1f9fff', '#5eb878'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ["访问量","下载量","平均访问量"]
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#009688',
          width: 2
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          opacity: 0.3
        }
      },
      axisLabel: {
        color: '#333'
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '访问量',
      min: 0,
      max: 1500,
      position: 'left',
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#009688',
          width: 2
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          opacity: 0.3
        }
      },
      axisLabel: {
        color: '#333',
        formatter: '{value} 万'
      }
    },
    {
      type: 'value',
      name: '下载量',
      min: 0,
      max: 1250,
      position: 'right',
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#009688',
          width: 2
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          opacity: 0.3
        }
      },
      axisLabel: {
        color: '#333',
        formatter: '{value} 万'
      }
    },
  ],
  series: [
    {
      name: '访问量',
      type: 'line',
      position: 'left',
      smooth: true,
      axisLabel: {
        formatter: '{value} ml'
      },
      data: [900, 850, 950, 1000, 1100, 1050, 1000, 1150, 1250, 1300, 1330, 1250]
    },
    {
      name: '下载量',
      type: 'line',
      position: 'right',
      smooth: true,
      data: [1000, 1050, 950, 1150, 1200, 1250, 1200, 1105, 1350, 1450, 1380, 1300]
    },
    {
      name: '平均访问量',
      type: 'line',
      smooth: true,
      data: [870, 850, 850, 950, 1050, 1050, 1000, 980, 1150, 1000, 1000, 1150]
    },
  ]
}
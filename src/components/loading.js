import React from 'react'
import { Spin } from 'antd'

const loadingWrapper = {
  position: 'relative',
  height: '100vh'
}
const loadingSpin = {
  position: 'absolute',
  left: '50%',
  top: '45%',
  transform: 'translate(-50%, -45%)'
}

function Loading() {
  return (
    <div style={loadingWrapper}>
      <Spin style={loadingSpin} tip="正在加载中..."></Spin>
    </div>
  )
}

export default Loading
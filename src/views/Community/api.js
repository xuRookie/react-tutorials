import React from 'react'

// 获取消息列表
export const requestMessageList = (params) => {
  const { $http } = React
  return $http.get('message', {params}).then(res => {
    return res
  })
}
// 删除消息
export const requestMessageDelete = (params) => {
  const { $http } = React
  return $http.delete('message/delete', {data: params}).then(res => {
    return res
  })
}
// 修改消息状态
export const requestMessageStatus = (params) => {
  const { $http } = React
  return $http.put('message/read', params).then(res => {
    return res
  })
}
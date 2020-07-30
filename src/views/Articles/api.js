import React from 'react'

export const requestArticleList = (params) => {
  const { $http } = React
  return $http.get('article/list', {params}).then(res => {
    return res
  })
}
export const requestArticleDelete = (params) => {
  const { $http } = React
  return $http.delete('article/delete', {data: params}).then(res => {
    return res
  })
}
export const requestArticleCreate= (params) => {
  const { $http } = React
  return $http.post('article/create', params).then(res => {
    return res
  })
}
export const requestArticleEdit = (params) => {
  const { $http } = React
  return $http.put('article/edit', params).then(res => {
    return res
  })
}
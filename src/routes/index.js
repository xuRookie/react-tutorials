import React from 'react'
import { Redirect } from 'react-router-dom'

import RouteComponents from './components'
// import AsyncComponent from '@/components/AsyncComponent'

function getToken() {
  return sessionStorage.getItem('token')
}

const routes = [
  {
    path: '/login2',
    requiredAuth: false,
    // component: AsyncComponent(() => import('@/views/Login'))
    component: RouteComponents.Login2
  },
  {
    path: '/login',
    requiredAuth: false,
    // component: AsyncComponent(() => import('@/views/Login/login2'))
    component: RouteComponents.Login
  },
  {
    path: '/forget',
    requiredAuth: false,
    // component: AsyncComponent(() => import('@/views/Login/forget'))
    component: RouteComponents.Forget
  },
  {
    path: '/404',
    requiredAuth: false,
    // component: AsyncComponent(() => import('@/views/NotFound/404'))
    component: RouteComponents.NotFound
  },
  {
    // component: AsyncComponent(() => import('@/views/Layout')),
    // component: Loadable({ loader: () => import('@/views/Layout'), loading() { return <Spin /> }}),
    render: (props) => {
      const token = getToken()
      if (!token) {
        return <Redirect to="/login" />
      }

      return <RouteComponents.Layout {...props} />
    },
    requiredAuth: true,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to="/home" />
      },
      {
        path: '/home',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/Home'))
        // component: Loadable({ loader: () => import('@/views/Home'), loading() { return <Spin /> }})
        component: RouteComponents.Home
      },
      {
        path: '/user',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/User'))
        component: RouteComponents.User
      },
      {
        path: '/roles',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/User/role'))
        component: RouteComponents.Role
      },
      {
        path: '/website-setting',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/Setting/websiteSetting'))
        component: RouteComponents.WebsiteSetting
      },
      {
        path: '/email-service',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/Setting/emailService'))
        component: RouteComponents.EmailService
      },
      {
        path: '/basic-info',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/Setting/basicInfo'))
        component: RouteComponents.BasicInfo
      },
      {
        path: '/modify-password',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/Setting/modifyPassword'))
        component: RouteComponents.ModifyPassword
      },
      {
        path: '/message',
        requiredAuth: true,
        // component: AsyncComponent(() => import('@/views/Community/message'))
        // component: Loadable({ loader: () => import('@/views/Community/message'), loading() { return <Spin /> }})
        component: RouteComponents.Message
      },
      {
        path: '/articles',
        component: RouteComponents.Article
      },
      {
        path: '/category',
        component: RouteComponents.Category
      },
      {
        path: '/comments',
        component: RouteComponents.Comment
      },
      {
        path: '*',
        render: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    component: RouteComponents.NotFound
  }
]

export default routes
import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'
import Loading from '@/components/loading'

const Layout = Loadable({
  loader: () => import('@/views/Layout'),
  loading: Loading
})

const Login2 = Loadable({
  loader: () => import('@/views/Login'),
  loading() { return <Spin /> }
})

const Login = Loadable({
  loader: () => import('@/views/Login/login2'),
  loading: Loading
})

const Forget = Loadable({
  loader: () => import('@/views/Login/forget'),
  loading: Loading
})

const NotFound = Loadable({
  loader: () => import('@/views/NotFound/404'),
  loading: Loading
})

const Home = Loadable({
  loader: () => import('@/views/Home'),
  loading: Loading
})

const User = Loadable({
  loader: () => import('@/views/User'),
  loading: Loading
})

const Role = Loadable({
  loader: () => import('@/views/User/role'),
  loading: Loading
})

const WebsiteSetting = Loadable({
  loader: () => import('@/views/Setting/websiteSetting'),
  loading: Loading
})

const EmailService = Loadable({
  loader: () => import('@/views/Setting/emailService'),
  loading: Loading
})

const BasicInfo = Loadable({
  loader: () => import('@/views/Setting/basicInfo'),
  loading: Loading
})

const ModifyPassword = Loadable({
  loader: () => import('@/views/Setting/modifyPassword'),
  loading: Loading
})

const Message = Loadable({
  loader: () => import('@/views/Community/message'),
  loading: Loading
})

const Article = Loadable({
  loader: () => import('@/views/Articles/article'),
  loading: Loading
})

const Category = Loadable({
  loader: () => import('@/views/Articles/category'),
  loading: Loading
})

const Comment = Loadable({
  loader: () => import('@/views/Articles/comment'),
  loading: Loading
})

export default {
  Layout,
  Login2,
  Login,
  Forget,
  NotFound,
  Home,
  User,
  Role,
  WebsiteSetting,
  EmailService,
  BasicInfo,
  ModifyPassword,
  Message,
  Article,
  Category,
  Comment
}

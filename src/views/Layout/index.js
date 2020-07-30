import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  CodepenCircleOutlined,
  DownOutlined,
  ReadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout
const { $http } = React
const style = require('./index.module.scss')

const mapMenu = [
  { key: 'home', name: '首页' },
  { key: 'user', name: '用户列表', parentName: '用户管理', parentKey: 'user-menu' },
  { key: 'roles', name: '角色管理', parentName: '用户管理', parentKey: 'user-menu' },
  { key: 'articles', name: '文章列表', parentName: '文章管理', parentKey: 'article-menu' },
  { key: 'category', name: '文章分类', parentName: '文章管理', parentKey: 'article-menu' },
  { key: 'comments', name: '文章评论', parentName: '文章管理', parentKey: 'article-menu' },
  { key: 'message', name: '消息中心', parentName: '社区管理', parentKey: 'community' },
  { key: 'website-setting', name: '网站设置', parentName: '设置管理', parentKey: 'setting-menu' },
  { key: 'email-service', name: '邮件服务', parentName: '设置管理', parentKey: 'setting-menu' },
  { key: 'basic-info', name: '基本资料', parentName: '设置管理', parentKey: 'setting-menu' },
  { key: 'modify-password', name: '修改密码', parentName: '设置管理', parentKey: 'setting-menu' },
]

class LayoutContainer extends React.Component {
  constructor(props) {
    super(props)
    const currentPath = this.splitPath()
    const openKeys = this.handleFindOpenMenu(currentPath)
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
    this.state = {
      collapsed: false,
      title: '后台管理系统',
      selectedKeys: [currentPath],
      defaultOpenKeys: [openKeys.menuKey],
      breadcrumb: openKeys.breadcrumb,
      userInfo
    }
  }

  splitPath = () => {
    const { location } = this.props
    return location.pathname.substr(1)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      title: this.state.collapsed ? '后台管理系统' : ''
    })
  }
  handleFindOpenMenu = (selectedKeys) => {
    const findMenu = mapMenu.find(subMenu => subMenu.key === selectedKeys)
    let breadcrumb = []
    breadcrumb.push(findMenu.parentName, findMenu.name)
    breadcrumb = breadcrumb.filter(v => v)
    return {
      menuKey: findMenu && findMenu.parentKey,
      subMenu: findMenu && findMenu.key,
      breadcrumb
    }
  }
  handleMenuClick = (item) => {
    const { history } = this.props
    const { key } = item
    if (key === 'logout') {
      $http.get('logout').then(() => {
        sessionStorage.clear()
        history.push('/login')
      })
    } else {
      this.setState({
        selectedKeys: [item.key]
      }, () => {
        history.push(item.key)
      })
    }
  }
  handleRouter = (item) => {
    const { history } = this.props
    const findMenu = mapMenu.find(subMenu => subMenu.key === item.key)
    let breadcrumb = []
    breadcrumb.push(findMenu.parentName, findMenu.name)
    breadcrumb = breadcrumb.filter(v => v)
    this.setState({
      selectedKeys: [item.key],
      breadcrumb
    }, () => {
      history.push(item.key)
    })
  }

  render() {
    const { route } = this.props
    const { collapsed, title, selectedKeys, userInfo, defaultOpenKeys, breadcrumb } = this.state

    const userDropdownMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="basic-info">基本资料</Menu.Item>
        <Menu.Item key="modify-password">修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    )
    return (
      <HashRouter>
        <Layout className={style['layout-container']}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className={style['logo']}>
                <CodepenCircleOutlined className={style['icon']} />
                <span>{title}</span>
              </div>
              <Menu theme="dark" mode="inline"
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                onClick={this.handleRouter}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  首页
                </Menu.Item>
                <Menu.SubMenu
                  key="user-menu"
                  title={
                    <span>
                      <UserOutlined />
                      <span>用户管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="user">用户列表</Menu.Item>
                  <Menu.Item key="roles">角色管理</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="article-menu"
                  title={
                    <span>
                      <FileTextOutlined />
                      <span>文章管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="articles">文章列表</Menu.Item>
                  <Menu.Item key="category">文章分类</Menu.Item>
                  <Menu.Item key="comments">文章评论</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="community"
                  title={
                    <span>
                      <ReadOutlined />
                      <span>社区管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="message">消息中心</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="setting-menu"
                  title={
                    <span>
                      <SettingOutlined />
                      <span>设置管理</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key="system-setting" title="系统设置">
                    <Menu.Item key="website-setting">网站设置</Menu.Item>
                    <Menu.Item key="email-service">邮件服务</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="user-setting" title="我的设置">
                    <Menu.Item key="basic-info">基本资料</Menu.Item>
                    <Menu.Item key="modify-password">修改密码</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </Sider>
            <Layout className={style['site-layout']}>
              <Header className={`${style['layout-header']} bg-white`}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: style['trigger'],
                  onClick: this.toggle,
                })}
                <div className={style['header-right']}>
                  <div className="info mr-20">
                    <Avatar src={userInfo.avatar} />
                    <Dropdown overlay={userDropdownMenu}
                      trigger="['click']"
                      getPopupContainer={() => document.getElementsByClassName('info')[0]}>
                      <Button type="link" className={style['btn-user']}>
                        {userInfo.username}<DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              </Header>
              <Content className={style['layout-content']}>
                <Breadcrumb className={style['layout-nav']}>
                  {breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                </Breadcrumb>
                <div className={`${style['layout-content--info']}`}>
                {renderRoutes(route.routes)}
                </div>
              </Content>
            </Layout>
        </Layout>
      </HashRouter>
    )
  }
}

export default LayoutContainer

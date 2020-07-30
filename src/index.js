import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from "react-router-config"

import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import http from '@/utils/http'
import routes from '@/routes'
import '@/style/index.scss'

import configureStore from '@/store'
import rootSaga from '@/store/sagas'

const store = configureStore()
rootSaga.map(saga => store.runSaga(saga))

React.$http = http

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

import React from 'react'
import { Button } from 'antd'
import style from './style.module.scss'

const NotFound = () => (
  <div className={`${style['page-404']} h-100`}>
    <div className="wrap h-100">
			<div className={style['lost']}>
				<img className="img" src="https://imgkr.cn-bj.ufileos.com/12a4100a-0300-4203-a7e0-970dccc34489.png" alt="404" width="605"
				height="368" />
				<p className="text my-15">
					您访问的页面走失了
				</p>
        <Button className={style['back']} href="#/home" shape="round">返回首页</Button>
			</div>
		</div>
  </div>
)

export default NotFound
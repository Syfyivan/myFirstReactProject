import React from 'react'
import { Menu } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

  const menusData = [
    {
        key: '/home',
        icon: <UserOutlined />,
        label: <Link to="/home">首页</Link>,
    },
    {
        key: '/users',
        icon: <UserOutlined />,
        label: <Link to = "/users">用户管理</Link>,
    },
    {
        key: '/roles',
        icon: <UserOutlined />,
        label: <Link to="/roles">角色管理</Link>,

    },
    {
        key: '/products',   
        icon: <UserOutlined />,
        label: '商品管理',
        children:[
            {
                key: '/products/category',
                label: <Link to="/products/category">分类管理</Link>,
            },
            {
                key: '/products/list',
                label: <Link to="/products/list">商品列表</Link>,
            },
        ]
    },
    {
        key: '5',
        icon: <UserOutlined />,
        label: '销售统计',
        children:[
            {
                key: '5-1',
                label: '订单统计',
            },
            {
                key: '5-2',
                label: '销售流水',
            }
        ]
    }
  ]

const SideMemu = () => {
    const {pathname} = useLocation()
    console.log(pathname.split('/')[1])


  return (
    <Menu
                mode="inline"
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={['/' + pathname.split('/')[1]]}
                theme='dark'
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={menusData}
              />
  )
}

export default SideMemu
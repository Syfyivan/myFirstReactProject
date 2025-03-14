import React, { useState } from 'react'
import { useEffect } from 'react'
import { deleteUserApi, getUSersApi, postUserApi, updateUserApi } from '../../../api/users';
// import { getRolesApi } from '../../../api/roles';
import { Popconfirm, Space, Table, Tag,  Button, Divider, Modal, Form, Input, Select, message } from 'antd';
// import { data } from 'react-router-dom';

const UsersPage = () => {
    const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '角色',
          dataIndex: 'role',
          render: (text) => {
              if (text === 'admin') {
                  return <Tag color="red">{text}</Tag>
              } else {
              
                  return <Tag color="green">{text}</Tag>
              }   
          }
        },
      
        {
          title: '操作',
          key: 'action',
          render: (_, record) => {
            // console.log('record', record);
              return (
                  <Space size="middle">
                      <a onClick = {() => {getUpdateUser(record)}}>编辑</a>
                      <Popconfirm 
                        title="确定删除吗？" 
                        onConfirm={()=>
                            deleteUser(record.id)
                            }
                        okText="确定"
                        cancelText="取消"
                      >
                        <a>删除</a>
                      </Popconfirm>
                      
                  </Space>
              )
          }
        },
      ];
    const [usersData, setUsersData] = useState([]);
    // 控制添加用户弹窗的显示与隐藏
    const [addOpen, setAddOpen] = useState(false);
    // const [roles, setRoles] = useState([]);

    const [addData, setAddData] = useState({}); // 使用对象来存储表单数据
    //控制修改用户的弹窗状态
    const [editOpen, setEditOpen] = useState(false);
    // 控制修改用户的数据
    const [updateData, setUpdateData] = useState([]);
    const [form] = Form.useForm(); // 使用form来获取表单数据

    useEffect(() => {
        getUsers();    
        // getRoles();
    }, []);

    // 获取用户数据
    const getUsers = async () => {
        const res = await getUSersApi();
        console.log('res.data(getUsersApi)',res.data);
        setUsersData(res.data);
    }
    // 删除用户
    const deleteUser = async (id) => {
        console.log('删除用户id:', id);
        const res = await deleteUserApi(id);
        console.log('删除用户:' ,res);
        // 删除成功后重新获取用户数据
        getUsers();
    }
    // // 获取角色
    // const getRoles = async (id) => {
    //     const res = await getRolesApi();
    //     console.log('res(getRolesApi)', res);
    //     console.log('角色', res.data);
    //     if (res.status === 200) {
    //         console.log('res.data.name', res.data.name);
    //         console.log('roles', roles);
    //         const role = res.data.roles[id];
    //         console.log('role', role);
    //     setRoles(res.data);
        
    //     }
    // }
    // 确认添加用户
    const addUser = async () => {
        console.log('addData1', addData);
        const res =  await postUserApi(addData); // 发送请求添加用户
        // console.log('res.status', res.status);
        console.log('res(addUser)', res);
        if (res.status === 201) {
            message.success('添加用户成功');
            setAddOpen(false);
            getUsers();  
        }
        
    }
    // // 角色改变
    // const roleChange = (value) => {
        // 有onValuesChange就不需要这个了
    // }

    // 表单值改变
    const onAddChange = (changedValues, allValues) => {
        console.log('changedValues', changedValues, 'allValues', allValues);
        setAddData(allValues);
        console.log('addData(onAddChange)', addData);
   
    }
    
   
    // 点击修改, 打开弹窗, 获取并渲染修改用户数据
    const getUpdateUser = (updateData) => {
        console.log('updateData(getUpdateUser)', updateData);
        setUpdateData(updateData); // 获取修改用户数据, 只是改变了数据, 表单的默认值不会更新
        form.setFieldsValue(
            {
                username: updateData.username,
                password: updateData.password,
                email: updateData.email,
                role: updateData.role,
                id: updateData.id
            }
        ); // 设置表单的默认值
        setEditOpen(true);
    }
     // 用户在操作修改表单的过程中触发
     const onValuesChange = (changedValues, allValues) => {
        console.log('changedValues(Update)', changedValues, 'allValues(Update)', allValues);
        console.log('id(update)', updateData.id);
        setUpdateData({...updateData,...allValues});
        console.log('updateData(onValuesChange)', updateData);
    }
    // 确认修改用户
    const editUser = async () => {
        console.log('updateData(editUser)', updateData);
        const res = await updateUserApi(updateData.id, updateData);
        console.log('updateData2', updateData);
        console.log('updateres', res);
        if (res.status === 200) {
            getUsers();
            setEditOpen(false);
        }
        
        
    }

  return (
    <div>
        <Button type="primary" onClick={() => setAddOpen(true)}>添加用户</Button>
        <Modal title="新增用户" open={addOpen} onOk={addUser} onCancel={() => setAddOpen(false)}>
            <Form labelCol={{span: 6,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}}
                onValuesChange={onAddChange}
            >

            <Form.Item label="账号" name="username">
            <Input />
            </Form.Item>

            <Form.Item
            label="密码"
            name="password"
            >
            <Input.Password />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
            <Input />
            </Form.Item>
            <Form.Item label="角色" name="role">
                <Select
                    // onChange={roleChange}
                    options={usersData}
                    fieldNames={{
                    label: 'role',
                    value: 'role',
                }}
                />                                                                                                                                  
            </Form.Item>
            
        </Form>
      </Modal>
        <Divider />
        <Table columns={columns} dataSource={usersData}  rowKey={data => data.id}/>
        <Modal  title="修改用户" open={editOpen} onOk={editUser} onCancel={() => setEditOpen(false)}>
            <Form form={form} labelCol={{span: 6,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,}}
                onValuesChange={onValuesChange}
            >

            <Form.Item label="账号" name="username">
            <Input />
            </Form.Item>

            <Form.Item
            label="密码"
            name="password"
            >
            <Input.Password />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
            <Input />
            </Form.Item>
            <Form.Item label="角色" name="role">
                <Select
                    // onChange={roleChange}
                    options={usersData}
                    fieldNames={{
                    label: 'role',
                    value: 'role',
                }}
                />                                                                                                                                  
            </Form.Item>
            
        </Form> 
      </Modal>
    </div>
    
  )
}

export default UsersPage
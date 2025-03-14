import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Radio, Divider, Space} from 'antd'
import { getProductsApi, deleteProductApi} from '../../../api/products';
import { Link } from 'react-router-dom'




const ProductsList = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        // console.log('record.id', record.id);
        return (
          <Space>
            {/* 动态路由传参 */}
            <Link to={"/products/update/"+ record.id}>Edit</Link>

            {/* state 传参 */}
            {/* <Link to="products/update" state={{id: record.id}}>Edit</Link> */}
            <Divider type="vertical" />
            <a onClick={() => deleleProduct(record.id)}>Delete</a>
          </Space>
        )
      }
  
    }
  ];
  
  
  // rowSlection是一个对象，表示需要进行选择
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
   
  };
  // 初始数据
  const [productsData, setProductsData] = useState([])
  // const [deleteProductData, setDeleteProductData] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const res = await getProductsApi()
    console.log('res.data(getProducts)', res.data);
    // res.data.forEach(item => {
    //   console.log('item', item.category);
    // }); // data里面有category字段

    if (res.status === 200) {
      setProductsData(res.data);
    }
  }

  // 删除商品
  const deleleProduct = async (id) => {
    const res = await deleteProductApi(id)
    console.log('res(deleteProduct', res);
    if (res.status === 200) {
      getProducts();
    }
  }
  

  
  // const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={productsData} 
        rowKey={'id'}
      />
    </div>
  );
}

export default ProductsList
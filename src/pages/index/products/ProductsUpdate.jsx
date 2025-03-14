import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getProductUpdateApi } from '../../../api/products'
import { Form, Input, Button } from 'antd'

const ProductsUpdate = () => {
  const [productData, setProductData] = useState({})
  const [form] = Form.useForm();

   const params =  useParams();
  //  console.log('params(ProductsUpdate)',params)
   const location = useLocation();
   console.log('location', location);

   // 2. 调用函数，获取当前商品的信息
  useEffect(() => {
    getProductById()
  }, []);

   // 1. 定义一个函数，用来获取当前商品的信息
   const getProductById = async () => {
     const res = await getProductUpdateApi(params)
     console.log('params.id', params.productId);
     console.log('res.data(getProductById)', res.data[params.productId-1]);
    console.log('productData', productData );
      setProductData(res.data[params.productId-1]);
      console.log('productData1', productData);
      // console.log('productData.name', productData.name);
      // //  设置表单的默认值(状态更新是异步的，所以要等状态更新完毕后再设置表单的默认值，不能在这里设置)
      // form.setFieldsValue({
      //   name: productData.name,
      //   price: productData.price,
      //   category: productData.category
      // })
   }

  // 3. 设置表单的默认值
  useEffect(() => {
    if (productData) {
      setProductDefaltValue(productData)  
    }
  }, [productData]);

   const setProductDefaltValue = (productData) => {
    console.log('productData(setProductDefaltValue)', productData);
    console.log('category', productData.category);
    // const temp = productData.category; 
    // console.log('temp.name', temp.id);
    // console.log('temp', temp);  
     // console.log('name', productData.category.name);
    form.setFieldsValue({
      name: productData.name,
      price: productData.price,
      category: productData.category
    })
  }



   console.log('productData2', productData);
   console.log('form.getFieldValue()',form.getFieldValue()); // 获取表单的值
  return (
    <div>
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        // defaultValue={{ remember: true }}
        
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>

        <Form.Item label=" Category" name="category">
          <Input />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>         
  )
}

export default ProductsUpdate
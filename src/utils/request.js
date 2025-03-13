import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});
// // 响应拦截器, 用于处理响应数据
// request.interceptors.response.use((res) => {
//   return res.data;
// });

export default request;

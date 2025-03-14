import request from "../utils/request";

export const getProductsApi = () => request.get("/products/list");
// export const getProductUpdateApi = (id) => request.get(`/products/${id}`);
export const getProductUpdateApi = () => request.get("/products");

export const deleteProductApi = (id) => request.delete(`/products/${id}`);

import request from "../utils/request"

export const getUSersApi = () => {
    return request.get('/users')
}
export const deleteUserApi = (id) => {
    return request.delete(`/users/${id}`)
}

export const postUserApi = (data) => {
    return request.post('/users', data)
}


export const updateUserApi = (id, data) => {
    return request.put(`/users/${id}`, data)
}
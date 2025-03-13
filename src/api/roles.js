import request from "../utils/request";

export const getRolesApi = () => {
    return request.get('/roles')
}


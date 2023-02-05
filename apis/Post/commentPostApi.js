import axiosClient from "../axiosClient";

export const commentPostApi = {
    create: (data, id, token) => {
        const url = `/postComment/create/${id}`
        return axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    list: (id, token) => {
        const url = `/postComment/list/${id}`
        return axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })        
    }
}
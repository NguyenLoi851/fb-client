import axiosClient from "../axiosClient"

export const editPostApi = {
    edit: (data, token, id, params) => {
        const url = `/posts/edit/${id}`
        return axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            },
            ...params
        })
    }
}
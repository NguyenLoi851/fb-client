import axiosClient from "../axiosClient";

export const deletePostApi = {
    delete: (id, token) => {
        const url = `/posts/delete/${id}`
        return axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}
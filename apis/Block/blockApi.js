import axiosClient from "../axiosClient";

export const blockApi = {
    block: (token, body) => {
        const url = '/blocks/block'
        return axiosClient.post(url, body, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    unblock: (token, body) => {
        const url = '/blocks/unblock'
        return axiosClient.post(url, body, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    show: (token, id) => {
        const url = `/blocks/show/${id}`
        return axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    getListBlockMe: (token) => {
        const url = '/blocks/getListBlockMe'
        return axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
}
import axiosClient from "../axiosClient"

// export const editPostApi = {
//     edit: (data, token, id, params) => {
//         const url = `/posts/edit/${id}`
//         return axiosClient.post(url, data, {
//             headers: {
//                 Authorization: "Bearer " + token
//             },
//             ...params
//         })
//     }
// }

export const friendApi = {
    addFriend: async (data, token)=>{
        const url = '/friends/set-request-friend'
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    getRequestFriend: async (token) => {
        const url = '/friends/get-requested-friend'
        return await axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    acceptFriend: async(data, token) => {
        const url = '/friends/set-accept'
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    getFriendStatus: async(token, id) => {
        const url = `/friends/status/${id}`
        return await axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },

    notAcceptFriend: async(data, token) => {
        const url = '/friends/set-accept'
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    getListFriends: async(token) => {
        const url = '/friends/list'
        return await axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    unFriend: async(data, token)=> {
        const url = '/friends/set-remove'
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    cancelRequest: async(data, token) =>{
        const url = '/friends/cancel-request'
        return await axiosClient.post(url, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    },
    getListNot: async(token) => {
        const url = '/friends/listnot'
        return await axiosClient.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}
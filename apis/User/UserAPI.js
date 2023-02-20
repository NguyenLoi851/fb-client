import axiosClient from "../axiosClient";

export const UserAPI = {
  get: async (userInfo) => {
    const url = `/document/${documentID}`
    // "/document/"+documentID;
    return await axiosClient.get(url);
  },
  list: async () => {
    const url = '/users/list'
    return await axiosClient.get(url)
  },
  edit: async(data, token) => {
    const url = '/users/edit'
    return await axiosClient.post(url, data, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  },
  show: async(token) => {
    const url = '/users/show'
    return await axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  },
  showByUserId: async(token, userId) => {
    const url = `/users/show/${userId}`
    return await axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  },
};

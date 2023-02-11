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
  }
};

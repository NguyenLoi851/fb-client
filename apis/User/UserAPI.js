import axiosClient from "../axiosClient";

export const UserAPI = {
   get: async (userInfo) => {
    const url = `/document/${documentID}`
    // "/document/"+documentID;
    return await axiosClient.get(url);
  },
};

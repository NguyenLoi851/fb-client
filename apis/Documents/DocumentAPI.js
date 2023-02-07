import axiosClient from "../axiosClient";

export const DocumentAPI = {
   get: async (documentID) => {
    const url = `/document/${documentID}`
    // "/document/"+documentID;
    return await axiosClient.get(url);
  },
};

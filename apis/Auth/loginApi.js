import axiosClient from "../axiosClient";

export const loginApi = {
  login: async (data) => {
    const url = "/users/login";
    return await axiosClient.post(url, data);
  },
};

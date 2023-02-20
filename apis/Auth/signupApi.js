import axiosClient from "../axiosClient";

export const signupApi = {
  post: async (data) => {
    // console.log("api", data);
    const url = "/users/register";
    return await axiosClient.post(url, data);
  },
};

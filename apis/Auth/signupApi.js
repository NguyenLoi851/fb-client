import axiosClient from "../axiosClient";

export const signupApi = {
  post: (data) => {
    console.log("api", data);
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
};

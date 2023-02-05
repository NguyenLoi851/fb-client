import axiosClient from "../axiosClient";

export const changePasswordApi = {
  changePassword: async (data, token) => {
    const url = "/users/change-password";
    return await axiosClient.post(url, data, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
  },
};

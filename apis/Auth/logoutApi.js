import axiosClient from "../axiosClient";

// export const logoutApi = {
//   logout: () => {
//     const url = "/users/logout";
//     return axiosClient.post(url);
//   },
// };

export const logoutApi = {
  logout: async (data) => {
    const url = "/users/logout";
    return await axiosClient.post(url, data);
  },
};

import axiosClient from "../axiosClient";
import axios from "axios";

const BaseURL = "http://192.168.1.6:3001/api/v1";

export const upPostApi = {
  post: (data, token) => {
    const url = "/posts/create";
    // console.log("api");
    console.log("data", data)
    return axiosClient.post(url, data, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      },
    });
  },

  createPost: (token, described, images, videos, onSend) => {
    return axios({
      method: "post",
      url: `${BaseURL}/posts/create`,
      data: {
        described,
        images,
        videos,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      onUploadProgress: onSend,
    });
  },

  get: async(token) => {
    const url = "/posts/list";
    return await axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  },

  like: async(token, postId) => {
    console.log("postId",postId)
    const url = "/postLike/action/"+{postId};
    return await axiosClient.post(url,{}, {
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        authorization: "Bearer " + token
      },
      params: {
        postId
      }
    })
  }
};

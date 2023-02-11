import axiosClient from "../axiosClient";
import axios from "axios";
import { baseUrl } from "../../common/baseUrl";

const BaseURL = baseUrl;

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

  editPost: (token, described, images, videos, onSend, id) => {
    return axios({
      method: "post",
      url: `${BaseURL}/posts/edit/${id}`,
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

  get: async(token, params) => {
    const url = "/posts/list";
    console.log("paramsget",params)
    return await axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token
      },
      params: {...params}
    })
  },

  show: async(token, id)=>{
    const url = `/posts/show/${id}`
    return await axiosClient.get(url, {
      headers: {
        Authorization: "Bearer " + token
      },
    })
  },

  // deletePost: async(token, postId) => {
  //   const url = "/posts/delete/"
  // }

  like: async(token, postId) => {
    console.log("postId",postId)
    // const url = "/postLike/action/"+{postId};
    const url = `/postLike/action/${postId}`;
    // const url = "/postLike/action"+postId
    return await axiosClient.post(url,{}, {
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        authorization: "Bearer " + token
      },
      // params: {
      //   postId,
      //   a:0
      // },
    })
  }
};

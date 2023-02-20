import axiosClient from "../axiosClient";

export const messageApi = {
    getMessagesByFriendId: async (token, friendId) => {
    const url = `/chats/getMessagesbyfriendId/${friendId}`;
    return await axiosClient.get(url, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
  },
};

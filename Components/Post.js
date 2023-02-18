import {
  StyleSheet,
  Text,
  View,
  FlatList,
  LogBox,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Icon, Image, Input } from "react-native-elements";
import { useEffect } from "react";
// import ScaleImage from "./Image";
import DefaultAvatar from "../assets/imgs/default_avatar.png"
import { useDispatch, useSelector } from "react-redux";
import { upPostApi } from "../apis/Post/upPostApi";
import { deletePostApi } from "../apis/Post/delelePostApi";
import { editPostApi } from "../apis/Post/editPostApi";
import { commentPostApi } from "../apis/Post/commentPostApi";
import { Button } from "react-native";
import { baseUrl, fileURL } from "../common/baseUrl";
import PostComment from "./Comment"
import { DocumentAPI } from "../apis/Documents/DocumentAPI";
import { navigation } from "../rootNavigation";
import { editPost } from "../store/user";
import { Video } from 'expo-av';

const Post = (prop) => {
  const dispatch = useDispatch()
  const [BASE_URI, setBaseURI] = useState([])
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  console.log("prop", JSON.stringify(prop.prop, 0, 2))
  const store = useSelector((state) => state)
  console.log("Store in post", JSON.stringify(store, 0, 2))
  const token = store.user.user.token;
  console.log("token", token)
  const [liked, setLiked] = useState(false)
  const [option, setOption] = useState(false)
  // const [reload, setReload] = useState(0)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [full, setFull] = useState(false);
  const [profileIMGURI, setProfileIMGURI] = useState("")
  // const avatarId = store.user.user.data.avatar
  const avatarId = prop.prop.author.avatar._id
  const [videoUrl, setVideoUrl] = useState(null)

  console.log("store.user.user.data.id == prop.prop.author._id", store.user.user.data.id, prop.prop.author._id)
  const getAvatar = async () => {
    try {
      const coverRes = await DocumentAPI.get(avatarId)
      setProfileIMGURI(fileURL + coverRes.data.data.fileName)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setLikes(prop.prop.like.length)
    setLiked(prop.prop.isLike)
    setComments(prop.prop.countComments)

    if (prop.prop.images.length > 0) {
      var newURI = []
      prop.prop.images.map(item => newURI.push(fileURL + item.fileName))
      setBaseURI(newURI)
      console.log("newURI", newURI)
      console.log(baseUrl);
    }

    if (prop.prop.videos.length > 0) {
      setVideoUrl(fileURL + prop.prop.videos[0].fileName)
    }

    getAvatar()
    // const res = await commentPostApi.list(prop.prop._id, token)
    // console.log("commentList ",JSON.stringify(res.data,0,2))
    // setCommentList(res.data)
  }, []);
  const [newComment, setNewComment] = useState("")
  // const handleDelete = () => {
  //   await 
  // }
  // const [refreshing, setRefreshing] = useState(false)

  const handleDelete = async () => {
    try {
      setOption(false)
      const res = await deletePostApi.delete(prop.prop._id, token)
      console.log(res.data)
      // setReload(reload + 1)
      // setRefreshing(true)
      // prop.fc.onRefresh()
      setDeleteSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {

  // }, [refreshing])


  // const handleEdit = async () => {
  //   try {
  //     // setOption(false)
  //     // const postId = prop.prop._id

  //     // const res = await editPostApi.edit()

  //   } catch (error) {

  //   }
  // }

  const [commentOption, setCommentOption] = useState(false)
  const handleCommentOption = () => {
    setCommentOption(!commentOption)
  }

  const handleLike = async () => {
    try {
      // console.log("HelloLike")
      console.log("Hello token", token)
      await upPostApi.like(token, prop.prop._id)
      if (liked == false) {
        setLikes(likes + 1)
        setLiked(true)
      } else {
        setLikes(likes - 1)
        setLiked(false)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const isLiked = () => {
    return liked == true;
  }

  const handleCreateNewComment = async () => {
    try {
      if (newComment == "") {
        return
      }
      const data = {
        content: newComment
      }
      const res = await commentPostApi.create(data, prop.prop._id, token)
      console.log(res.data)

      // commentList.push({
      //   user: {
      //     username: store.user.user.data.username,
      //     avatar: store.user.user.data.avatar
      //   },
      //   content: newComment
      // })
      setNewComment("")
      setCommentList([])
      await handleComment()
    } catch (error) {
      console.log(error)
    }
  }


  const handleComment = async () => {
    handleCommentOption()
    try {
      const res = await commentPostApi.list(prop.prop._id, token)
      console.log("commentList ", JSON.stringify(res.data, 0, 2))
      setCommentList(res.data.data)
    } catch (error) {
      console.log(error)
    }

  }

  const isAuthor = store.user.user.data.id === prop.prop.author._id

  const handleOption = () => {
    setOption(!option);
  }

  const handleEdit = () => {
    dispatch(editPost(prop.prop._id))
    navigation.navigate("edit-post")
  }
  return (
    // <RefreshControl onRefresh={refreshing}>
    <View style={styles.container}>
      {deleteSuccess && (<>
        <Text style={{ textAlign: "center", color: "red", fontSize: 16, margin: 10 }}>
          Đã xóa thành công, kéo xuống để tải lại trang
        </Text>
      </>)}
      <View style={styles.header}>
        <View style={styles.avatar}>

          {
            profileIMGURI != "" ?

              <Image
                source={{ uri: profileIMGURI }}
                containerStyle={styles.avatar_img} >

              </Image>
              :

              <Image
                source={DefaultAvatar}
              // containerStyle={styles.avatar_img}
              ></Image>
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "500" }}>{prop.prop.author.username}</Text>
        </View>
        {isAuthor == false
          ? <></> : <View style={{ marginLeft: "auto" }}>
            <TouchableOpacity onPress={handleOption}>
              {(option == true) ? (
                <TouchableOpacity onPress={() => { setOption(false) }}>
                  <TouchableOpacity style={{ margin: 10 }} onPress={handleDelete}>
                    <Text>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ margin: 10 }}
                    onPress={handleEdit}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )

                : <Icon name="ellipsis-horizontal" type="ionicon">

                </Icon>
              }

            </TouchableOpacity>
          </View>
        }
      </View>

      <View style={styles.content}>
        <View style={full ? styles.desc_full : styles.desc_short}>
          <Text>
            {prop.prop.described}
          </Text>
        </View>
      </View>

      {/* <Image source={{uri: BASE_URI[0]}} 
        style={{
          width: 150,
          height: 150,
          marginRight: 10,
      }}>

      </Image> */}
      <SafeAreaView>
        <FlatList
          data={BASE_URI}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1
              }}>
              <Image
                // style={styles.imageThumbnail}
                source={{ uri: item }}
                style={{ justifyContent: 'center', alignItems: 'center', height: 200, }}
              />
              {/* <Text>
        {item}
      </Text> */}
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>

      {
        videoUrl ? <>
          <View>
            <Video
              source={{ uri: videoUrl }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              useNativeControls
              // usePoster
              // isLooping
              style={{ width: '100%', height: 500 }}
            />
          </View>
        </> : <></>
      }


      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "500" }}>{likes} likes</Text>
          <Text style={{ fontWeight: "500" }}>{comments} Bình luận</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Icon name={liked ? "thumbs-up" : "thumbs-o-up"} type="font-awesome"></Icon>
            {/* {(({liked} == true) ? <Icon name="thumbs-up" type="font-awesome"></Icon> : <Icon name="thumbs-down" type="font-awesome"></Icon>)} */}
            {/* <Icon name="thumbs-down" type="font-awesome"></Icon> */}
            <Text style={{ marginLeft: 10 }}>{liked ? "Đã Thích" : "Thích"}</Text>
            {/* {(({liked} == true) ? <Text style={{ marginLeft: 10 }}>Đã Thích</Text> : <Text style={{ marginLeft: 10 }}>Thích</Text>)} */}

          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleComment}>
            <Icon name="comment" type="font-awesome"></Icon>
            <Text style={{ marginLeft: 10 }}>Bình luận</Text>
          </TouchableOpacity>

        </View>
        {commentOption && (<>
          <Input placeholder="Your new comment"
            value={newComment}
            onChangeText={setNewComment}
            style={{ marginTop: 10 }}>
          </Input>
          <TouchableOpacity onPress={handleCreateNewComment}>
            <Text style={{ backgroundColor: "green", marginLeft: 250, textAlign: "center" }}>Comment</Text>
          </TouchableOpacity>

        </>)}
        {commentList.length > 0 && commentList.reverse().map(item => (<PostComment key={item}>{item}</PostComment>))}
      </View>
    </View>
    // </RefreshControl>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar_img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#bababa",
  },
});

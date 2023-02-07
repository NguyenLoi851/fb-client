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
import { useSelector } from "react-redux";
import { upPostApi } from "../apis/Post/upPostApi";
import { deletePostApi } from "../apis/Post/delelePostApi";
import { editPostApi } from "../apis/Post/editPostApi";
import { commentPostApi } from "../apis/Post/commentPostApi";
import { Button } from "react-native";
import { baseUrl, fileURL } from "../common/baseUrl";

const Post = (prop) => {
  const [BASE_URI,setBaseURI] = useState("")
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  console.log("prop", JSON.stringify(prop.prop))
  const store = useSelector((state) => state)
  const token = store.user.user.token;
  console.log("token", token)
  const [liked, setLiked] = useState(false)
  const [option, setOption] = useState(false)
  // const [reload, setReload] = useState(0)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const [full, setFull] = useState(false);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    setLikes(prop.prop.like.length)
    setLiked(prop.prop.isLike)

    if(prop.prop.images.length>0){
      var newURI= fileURL+ prop.prop.images[0].fileName
      setBaseURI(newURI)
      console.log(baseUrl);

    }
  
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
      if(newComment == "") {
        return
      }
      const data = {
        content: newComment
      }
      const res = await commentPostApi.create(data, prop.prop._id, token)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const [commentList, setCommentList] = useState([])
  const handleComment = async () => {
    handleCommentOption()
    try {
      const res = await commentPostApi.list(prop.prop._id, token)
      console.log("commentList ",JSON.stringify(res.data,0,2))
      setCommentList(res.data.data)
    } catch (error) {
      console.log(error)
    }

  }

  const handleOption = () => {
    setOption(!option);
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
          <Image
            source={DefaultAvatar}
            containerStyle={styles.avatar_img}
          ></Image>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "500" }}>{prop.prop.author.username}</Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <TouchableOpacity onPress={handleOption}>
            {(option == true) ? (
              <TouchableOpacity onPress={() => { setOption(false) }}>
                <TouchableOpacity style={{ margin: 10 }} onPress={handleDelete}>
                  <Text>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ margin: 10 }}
                // onPress={handleEdit}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )

              : <Icon name="ellipsis-horizontal" type="ionicon">

              </Icon>}

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={full ? styles.desc_full : styles.desc_short}>
          <Text>
            {prop.prop.described}
          </Text>
        </View>
        <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
          {/* <FlatList
            data={[...new Array(4)].map((_, i) => i.toString())}
            // style={}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={(e) => e}
            renderItem={({ item }) => (
              <Image
                source={{ uri: BASE_URI + item }}
                containerStyle={{
                  aspectRatio: 1,
                  width: "100%",
                  height: 150,
                  flex: 1,
                }}
              />
            )}
          /> */}
          {
            BASE_URI.length>10?
            <Image
            source={{ uri: BASE_URI}}
            containerStyle={{
              aspectRatio: 1,
              width: "100%",
              height: 150,
              flex: 1,
            }}
            />:<></>
            // <Image
            // source={{ uri: BASE_URI}}
            // containerStyle={{
            //   aspectRatio: 1,
            //   width: "100%",
            //   height: 150,
            //   flex: 1,
            // }}
            // />
          }
          
        </SafeAreaView>
      </View>
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
          style={{marginTop: 10}}>
          </Input>
          <TouchableOpacity onPress={handleCreateNewComment}>
          <Text style={{backgroundColor:"green", marginLeft: 250, textAlign: "center"}}>Comment</Text>
          </TouchableOpacity>

          </>)}
          {commentList.length > 0 && commentList.map(item => (<Text key={item}>{item.content}</Text>))}
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

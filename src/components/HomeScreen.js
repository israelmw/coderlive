import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { decode } from "html-entities";
import { fetchApiData } from "../lib/api";

const Post = ({ item, navigation }) => {
  let thumbnail = null;
  if (item.jetpack_featured_media_url) {
    thumbnail = item.jetpack_featured_media_url;
  }
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { item: item })}
      style={{
        marginBottom: 25,
      }}
    >
      <View>
        <View style={{ position: "relative" }}>
          <Image
            style={{ width: "100%", height: 200 }}
            source={{
              uri: thumbnail,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              borderBottomColor: "white",
              borderBottomWidth: 25,
              borderRightColor: "transparent",
              borderRightWidth: width,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 18,
            fontWeight: "700",
            paddingHorizontal: 20,
            paddingTop: 10,
            textTransform: "uppercase",
            // fontFamily: "Anton_400Regular",
          }}
        >
          {decode(item.title.rendered)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const route = `posts?per_page=10&page=${page}`;
    fetchApiData(route).then((res) => {
      if (res.code !== "rest_post_invalid_page_number") {
        setPosts((prevPosts) => [...prevPosts, ...res]);
      } else {
        setLastPage(true);
      }
      setLoading(false);
    });
    // Analytics.logEvent("load more", page);
  }, [page]);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 5, backgroundColor: "white" }}>
      <StatusBar barStyle="ligth-content" />

      {posts.length > 0 ? (
        <FlatList
          onEndReached={() => {
            if (!loading && !lastPage) {
              console.log("end reached, load:", page + 1);
              setPage((page) => page + 1);
            }
          }}
          onEndReachedThreshold={5}
          keyExtractor={(item) => item.id.toString()}
          data={posts}
          renderItem={({ item }) => (
            <Post item={item} navigation={navigation} />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"#d20000"} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;

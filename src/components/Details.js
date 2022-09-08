import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import RenderHTML from "react-native-render-html";
import WebView from "react-native-webview";
import { decode } from "html-entities";
// import { useFonts, Anton_400Regular } from "@expo-google-fonts/anton";
// import * as Analytics from "expo-firebase-analytics";

function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  let thumbnail = null;
  if (item.jetpack_featured_media_url) {
    thumbnail = item.jetpack_featured_media_url;
  }
  const { width } = useWindowDimensions();

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
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
      <View style={{ paddingHorizontal: 20 }}>
        <RenderHTML
          contentWidth={width - 40}
          source={{ html: item.content.rendered }}
          renderers={renderers}
          WebView={WebView}
          customHTMLElementModels={customHTMLElementModels}
          renderersProps={{
            iframe: {
              scalesPageToFit: true,
              webViewProps: {
                /* Any prop you want to pass to iframe WebViews */
              },
            },
          }}
        />
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;

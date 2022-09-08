import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/HomeScreen";
import DetailsScreen from "./src/components/Details";
const HomeStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#f00",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: (props) => (
            <Image
              source={require("./assets/logo.png")}
              style={{ width: 200, height: 40, resizeMode: "contain" }}
            />
          ),
          headerBackTitleVisible: false,
        }}
      >
        <HomeStack.Screen name="Details">
          {(props) => <DetailsScreen {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

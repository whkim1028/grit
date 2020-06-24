import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { Scene, Router } from "react-native-router-flux";
import HomeScreen from "./screens/HomeScreen";
import LinksScreen from "./screens/LinksScreen";
import ListScreen from "./screens/ListScreen";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="HomeScreen"
            component={HomeScreen}
            title="Page 1"
            initial={true}
          />
          <Scene key="LinksScreen" component={LinksScreen} title="Page 2" />
          <Scene key="ListScreen" component={ListScreen} title="Page 3" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { Divider, IconButton, Colors } from "react-native-paper";
import { Actions } from "react-native-router-flux";

function RouteBottom() {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 5,
        flex: 0.25,
      }}
    >
      <IconButton
        onPress={() => Actions.HomeScreen()}
        icon="calendar-today"
        color={Colors.green400}
        size={20}
      ></IconButton>
      <IconButton
        onPress={() => Actions.LinksScreen()}
        icon="heart"
        color={Colors.red500}
        size={20}
      ></IconButton>
      <IconButton
        onPress={() => Actions.ListScreen()}
        icon="view-list"
        color={Colors.blue500}
        size={20}
      ></IconButton>
    </View>
  );
}

export default RouteBottom;

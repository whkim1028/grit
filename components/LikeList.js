import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function LikeList(props) {
  useEffect(() => {
    console.log("hello");
  });
  return (
    <View>
      <Text>{props.favoratePerson}</Text>
      <Text>{props.favoratePersonSay}</Text>
    </View>
  );
}

export default LikeList;

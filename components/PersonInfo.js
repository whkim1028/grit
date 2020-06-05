import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
function PersonInfo(props) {
  function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
      <RectButton
        style={[styles.option, isLastOption && styles.lastOption]}
        onPress={onPress}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText2}>{label}</Text>
          </View>
        </View>
      </RectButton>
    );
  }

  return (
    <View style={{ marginTop: 1 }}>
      <OptionButton
        icon="md-school"
        label="인물의 격언 더 보기"
        onPress={() =>
          WebBrowser.openBrowserAsync(
            `https://google.com/search?q=${props.encodeName}${props.encodeSay}`
          )
        }
      />
      <Divider></Divider>
      <OptionButton
        icon="md-compass"
        label="인물에 대해 더 알아보기"
        onPress={() =>
          WebBrowser.openBrowserAsync(`https://namu.wiki/w/${props.encodeName}`)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionIconContainer: {
    marginRight: 12,
  },
  optionText2: {
    fontSize: 15,
    marginTop: 1,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "grey",
  },
  option: {
    backgroundColor: "#f5f4f0",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default PersonInfo;

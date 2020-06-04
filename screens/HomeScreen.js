import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from "react-native-paper";

import { MonoText } from "../components/StyledText";

import {dataArr} from '../contents/Person'

export default function HomeScreen() {
  let today = new Date();

  function pad(num) {
    num = num + "";
    return num.length < 2 ? "0" + num : num;
  }
  let todayResult =
    today.getFullYear() +
    "-" +
    pad(today.getMonth() + 1) +
    "-" +
    pad(today.getDay());

  let name = encodeURI(dataArr[0].name);
  let msg = dataArr[0].massege; 

  

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
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </View>
      </RectButton>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text>{todayResult}</Text>
      <Card style={styles.cardStyle}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Title>{dataArr[0].massege}</Title>
          <Paragraph>{dataArr[0].name}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="cards-heart"
            color="#1276b8"
            style={{ marginBottom: 15, marginTop: 5 }}
          >
            My 격언에 추가
          </Button>
        </Card.Actions>
      </Card>
      <Divider></Divider>

      <View style={{ marginTop: 1 }}>
        <OptionButton
          icon="md-school"
          label="인물의 격언 더 보기"
          onPress={() => WebBrowser.openBrowserAsync("https://docs.expo.io")}
        />
        <Divider></Divider>
        <OptionButton
          icon="md-compass"
          label="인물에 대해 더 알아보기"
          onPress={() => WebBrowser.openBrowserAsync(`https://namu.wiki/w/${name}`)}
        />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe6ed",
  },
  cardStyle: {
    flex: 0.5,
  },
  optionIconContainer: {
    marginRight: 12,
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
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
});

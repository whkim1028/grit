import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import LikeList from "../components/LikeList";

export default function LinksScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [favoratePerson, setFavoratePerson] = useState([]);

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let list = [];
      setIsLoaded(false);

      result.map((value, index) => {
        list = list.concat([JSON.parse(value[1])]);
      })
      
      setFavoratePerson(list);
      setIsLoaded(true);

      console.log(favoratePerson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
  }, [favoratePerson]);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {isLoaded &&
        favoratePerson.map((data, index) => (
          <LikeList
            favoratePerson={data != null ? data.person : ''}
            favoratePersonSay={data != null ? data.personSay : ''}
            key={index}
          />
        ))}

      <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync("https://docs.expo.io")}
      />
      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() =>
          WebBrowser.openBrowserAsync("https://reactnavigation.org")
        }
      />
      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync("https://forums.expo.io")}
        isLastOption
      />
      <OptionButton
        icon="ios-chatboxes"
        label="즐겨찾기 모두 지우기"
        onPress={() => AsyncStorage.clear(() => alert("삭제 완료"))}
        isLastOption
      />
    </ScrollView>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
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

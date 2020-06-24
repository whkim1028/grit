import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { List, Divider } from "react-native-paper";

import LikeList from "../components/LikeList";
import RouteBottom from "../components/RouteBottom";

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
      });

      setFavoratePerson(list);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
  }, [favoratePerson]);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {favoratePerson.map((data, index) => (
          <LikeListButton
            icon="ios-checkbox-outline"
            personSay={data != null ? data.personSay : ""}
            person={data != null ? data.person : ""}
            key={index}
          />
        ))}
        <OptionButton
          icon="ios-trash"
          label="모두 지우기"
          onPress={() => AsyncStorage.clear(() => alert("삭제되었습니다."))}
          isLastOption
        />
      </ScrollView>
      <RouteBottom></RouteBottom>
    </View>
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

function LikeListButton({ icon, personSay, person, onPress, isLastOption }) {
  return (
    <View>
      <List.Item
        title={person}
        description={personSay}
        left={(props) => <List.Icon {...props} icon="heart" />}
        onPress={() => alert("hello")}
      />
      <Divider></Divider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionIconContainer1: {
    marginLeft: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0,
    borderColor: "#ededed",
    width: Dimensions.get("window").width,
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
    marginRight: 20,
  },
});

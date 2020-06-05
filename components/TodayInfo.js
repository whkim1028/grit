import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, ImageBackground, AsyncStorage } from "react-native";
import { TouchableRipple } from "react-native-paper";

function TodayInfo(props) {
  const [isFavorateYn, setIsFavorate] = useState(false);

  const setFavorate = (personSay, Person) => {
    let dataArr = {
      person: Person,
      personSay: personSay,
    };

    AsyncStorage.getItem(personSay, (err, value) => {
      if (err == null) {
        let json = JSON.parse(value);
        if (json == null) {
          AsyncStorage.setItem(personSay, JSON.stringify(dataArr), () => {
            alert("Like!");
            setIsFavorate(true);
          });
        } else {
          AsyncStorage.removeItem(personSay, (err, value) => {
            if (err == null) {
              alert("Unlike!");
              setIsFavorate(false);
            }
          });
        }
      } else {
        alert(err);
      }
    });
  };

  const setIcon = (data) => {
    if (data) {
      return "heart";
    } else {
      return "heart-outline";
    }
  };
  const getFavorate = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let isFavorate = keys.map(function (value, index) {
      if (value == props.personSay) {
        setIsFavorate(true);
      }
    });
  };

  useEffect(() => {
    getFavorate();
  });

  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/700" }}
      style={styles.image}
    >
      <Text style={styles.optionText}>"{props.personSay}"</Text>
      <Text style={styles.personText}>
        -{props.person}({props.personBirth})-
      </Text>
      <TouchableRipple
        onPress={() => setFavorate(props.personSay, props.person)}
        rippleColor="red"
      >
        <MaterialCommunityIcons
          color="red"
          size={30}
          name={setIcon(isFavorateYn)}
          style={{ marginTop: 10 }}
        ></MaterialCommunityIcons>
      </TouchableRipple>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  optionText: {
    fontSize: 25,
    marginTop: 1,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#e4eced",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  image: {
    flex: 0.7,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  personText: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "normal",
    color: "#ced5d6",
    marginTop: 5,
  },
});

export default TodayInfo;

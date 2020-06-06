import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  ImageBackground,
  AsyncStorage,
  View,
} from "react-native";
import {
  TouchableRipple,
  Card,
  Title,
  Paragraph,
  Divider,
} from "react-native-paper";

function TodayInfo(props) {
  const [isFavorateYn, setIsFavorate] = useState(false);

  const setFavorate = (say, per) => {
    let dataArr = {
      person: per,
      personSay: say,
    };

    AsyncStorage.getItem(say, (err, value) => {
      if (err == null) {
        let json = JSON.parse(value);
        if (json == null) {
          AsyncStorage.setItem(say, JSON.stringify(dataArr), () => {
            alert("Like!");
            setIsFavorate(true);
          });
        } else {
          AsyncStorage.removeItem(say, (err, value) => {
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

    setIsFavorate(false);

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == props.personSay) {
        setIsFavorate(true);
      }
    }
  };

  useEffect(() => {
    getFavorate();
  }, [props.personSay]);

  return (
    <Card>
      <Card.Cover
        source={{
          uri: `https://picsum.photos/id/${props.backgrounSeq}/600/400`,
        }}
        style={{ height: 400 }}
      />
      <Card.Content
        style={{
          backgroundColor: "#ededed",
        }}
      >
        <Text style={styles.optionText}>"{props.personSay}"</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={styles.personText}>
            -{props.person}({props.personBirth})-
          </Text>
          <TouchableRipple
            onPress={() => setFavorate(props.personSay, props.person)}
            rippleColor="red"
            style={{ bottom: 25, marginLeft: 20 }}
          >
            <MaterialCommunityIcons
              color="red"
              size={30}
              name={setIcon(isFavorateYn)}
            ></MaterialCommunityIcons>
          </TouchableRipple>
        </View>
      </Card.Content>
      <Divider></Divider>
    </Card>
  );
}

const styles = StyleSheet.create({
  optionText: {
    fontSize: 25,
    marginTop: 20,
    fontStyle: "normal",
    fontWeight: "900",
    color: "#708090",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    alignSelf: "center",
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
    color: "#708090",
    paddingBottom: 10,
    bottom: 20,
  },
});

export default TodayInfo;

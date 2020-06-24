import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  TouchableRipple,
  Card,
  Title,
  Paragraph,
  Divider,
} from "react-native-paper";
import { dataArr } from "../contents/Person";
import PersonInfo from "../components/PersonInfo";
import TodayInfo from "../components/TodayInfo";
import { backGroundSeq } from "../contents/Background";
import RouteBottom from "../components/RouteBottom";

function ListScreen() {
  const [person, setPerson] = useState(""); //인물
  const [personSay, setPersonSay] = useState(""); //명언
  const [personBirth, setPersonBirth] = useState(""); //생일
  const [backgrounSeq, setBackgroundSeq] = useState("");
  const [arr, setArr] = useState([]);
  const [cnt, setCnt] = useState(0);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  const fetchList = () => {};

  useEffect(() => {});

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 0.9 }}>
        {dataArr.map((value, index) => (
          <List
            massege={value.massege}
            name={value.name}
            birth={value.birth}
            cnt={getRandomInt(0, backGroundSeq.length)}
            key={index}
          />
        ))}
      </ScrollView>
      <RouteBottom></RouteBottom>
    </View>
  );
}

function List({ massege, name, birth, cnt }) {
  return (
    <View style={{ borderBottomWidth: 3, marginTop: 30 }}>
      <Card>
        <Card.Cover
          source={{
            uri: `https://picsum.photos/id/${cnt}/600/400`,
          }}
          style={{ height: 400 }}
        />
        <Card.Content
          style={{
            backgroundColor: "#ededed",
          }}
        >
          <Text style={styles.optionText}>"{massege}"</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.personText}>
              -{name}({birth})-
            </Text>
          </View>
        </Card.Content>
        <Divider></Divider>
      </Card>
    </View>
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

export default ListScreen;

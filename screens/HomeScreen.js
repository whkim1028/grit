import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { dataArr } from "../contents/Person";
import PersonInfo from "../components/PersonInfo";
import TodayInfo from "../components/TodayInfo";

export default function HomeScreen() {
  const [person, setPerson] = useState(""); //인물
  const [personSay, setPersonSay] = useState(""); //명언
  const [personBirth, setPersonBirth] = useState(""); //생일
  const [encodeName, setEncodeName] = useState("");
  const [encodeSay, setEncodeSay] = useState("");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  function pad(num) {
    num = num + "";
    return num.length < 2 ? "0" + num : num;
  }

  useEffect(() => {
    let cnt = getRandomInt(0, dataArr.length);

    setPerson(dataArr[cnt].name);
    setPersonSay(dataArr[cnt].massege);
    setPersonBirth(dataArr[cnt].birth);

    let today = new Date();
    let todayResult =
      today.getFullYear() +
      "-" +
      pad(today.getMonth() + 1) +
      "-" +
      pad(today.getDay());

    setEncodeName(encodeURI(person));
    setEncodeSay(encodeURI(" 명언"));
  });

  return (
    <View style={styles.container}>
      <TodayInfo
        personSay={personSay}
        person={person}
        personBirth={personBirth}
      ></TodayInfo>
      <Divider></Divider>
      <PersonInfo encodeName={encodeName} encodeSay={encodeSay}></PersonInfo>
    </View>
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
});

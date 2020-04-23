import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useOfflineMutation } from "react-offix-hooks";
import { addFamilyMutation } from "../Queries/queries";

const SurveyCompletedScreen = (props) => {
  const [addFamily, state] = useOfflineMutation(addFamilyMutation);

  const answers = props.route.params.surveyAnswers;
  const fullSurvey = props.route.params.fullSurvey;
  const familyName = props.route.params.familyName;
  const personName = props.route.params.personName;
  const type = props.route.params.type;

  const handleSubmit = async (props) => {
    console.log("Submitting Answers....", fullSurvey);

    await answers.forEach((answer, index) => {
      console.log("answer being mutated", answer.value);
      console.log("answers backendID", fullSurvey[index].backend_id);
      try {
        addAnswers({
          variables: {
            answer: answer.value.value
              ? answer.value.value.toString()
              : answer.value.toString(),
            questionId: fullSurvey[index].backend_id,
            familyId: "ck9a3uqh384530874p5ws4zo8",
            surveyId: "ck98pnlc17hmd0874rfdsxug0",
          },
        });
      } catch (error) {
        if (error.offline) {
          error
            .watchOfflineChange()
            .then((res) => console.log("Offline result", res));
        }
        console.log(error);
      }
    });

    props.navigation.navigate("Family", {
      survey: answers,
      familyName: familyName,
    });
  };

  // Creates two different buttons depending on the survey taken
  let button;
  let text;

  if (type === "Family") {
    button = (
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit(props)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    );
    text = <Text style={styles.title}>{familyName} Family</Text>;
  } else if (type === "Person") {
    button = (
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          props.navigation.navigate("FamilyMembers", {
            survey: answers,
            familyName: familyName,
            personName: personName,
          })
        }
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    );
    text = <Text style={styles.title}>{personName}</Text>;
  }
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {text}
        <ScrollView style={styles.scrollContainer}>
          {answers.map((el, index) => (
            <TouchableOpacity
              onPress={() => Alert.alert("Edit function here")}
              style={styles.answerContainer}
              key={el.questionId}
            >
              <Text style={styles.question}>
                {fullSurvey[index].questionText}
              </Text>
              <Text style={styles.answer}>
                {el.value.value ? el.value.value : el.value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {button}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 20,
    height: "90%",
  },
  scrollContainer: {
    // width: "95%",
    // borderRadius: 5,
    // borderWidth: 3,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    fontSize: 30,
    width: "100%",
    backgroundColor: "black",
    color: "white",
  },
  answerContainer: {
    width: "100%",
    marginVertical: 5,
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  question: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  answer: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    color: "green",
  },
  button: {
    width: "100%",
    backgroundColor: "deepskyblue",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SurveyCompletedScreen;

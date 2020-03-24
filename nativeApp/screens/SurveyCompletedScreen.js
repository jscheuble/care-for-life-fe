import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';

export default class SurveyCompletedScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: "black",
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Survey Results',
      headerTitleStyle: {
        flex: 1,
      }
    };
  }

  render() {
    const answers = this.props.route.params.surveyAnswers;
    console.log(answers)
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            {answers.map(el => (
              <Text>{el.questionId.replace(/_/g, ' ')}: {el.value.value ? el.value.value : el.value}</Text>
            ))}
            {/* <Text>Raw JSON: {JSON.stringify(this.props.route.params.surveyAnswers)}</Text> */}
          </ScrollView>
          <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate('SurveyHome', { survey: answers })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        maxHeight: '80%',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20
    },
});
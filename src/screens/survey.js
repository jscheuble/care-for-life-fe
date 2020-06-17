import React, { useEffect, useState } from "react";
import axios from "axios"
import { View, Text, Button, AsyncStorage, ScrollView, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import styles from "../styles";
import { connect } from "react-redux";
import { fetchSurvey, addResponse, stageResponses, createCompletedSurvey, resetResponses } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    return {
        survey_questions: state.surveyReducer.survey_questions,
        user_id: state.userReducer.user_id,
        currentFamily: state.surveyReducer.currentFamily,
        currentCompSurvey: state.surveyReducer.currentCompSurvey,
        currentIndividual: state.surveyReducer.currentIndividual
    };
};

function Survey({ navigation, fetchSurvey, survey_questions, stageResponses, createCompletedSurvey, user_id, currentFamily, currentCompSurvey, currentIndividual, resetResponses }) {

    const [responses, setResponses] = useState([])

    useEffect(() => {
        console.log("current individual", currentIndividual)
        let resp = [];


        createCompletedSurvey({
            survey_id: 1,
            supervisor_id: user_id,
            family_id: currentFamily.id
        })
            .then(res => {
                fetchSurvey()
                    .then(async res => {
                        console.log("in the .then")
                        survey_questions && survey_questions.map(async i => {
                            // console.log("survey_question", i)
                            console.log("adding response")
                            // console.log(resp)
                            return resp.push(
                                {
                                    question_id: i.id,
                                    response: "",
                                    completed_survey_id: currentCompSurvey.id,
                                    family_id: currentFamily.id,
                                    individual_id: currentIndividual ? currentIndividual.id : null
                                })

                        })

                    })
                    .then(res => {
                        setResponses(resp)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const submit = async (e) => {
        stageResponses(responses)
        navigation.navigate('Chosen Families')
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    {survey_questions ? survey_questions.map((i, index) => {
                        return (
                            <View key={i.id}>
                                <Text>{i.question}?</Text>
                                <TextInput style={styles.textInput} onChangeText={(e) => {
                                    console.log("target: ", responses[index])
                                    setResponses([
                                        ...responses,
                                        responses[index].response = e
                                    ])
                                }} />
                            </View>
                        )
                    }) : null}
                    <CustomButton onPress={() => {
                        submit()
                    }} title={"Submit"} />
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { fetchSurvey, addResponse, stageResponses, createCompletedSurvey, resetResponses })(Survey);

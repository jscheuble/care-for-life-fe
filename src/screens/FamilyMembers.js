import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import CustomButton from "../components/Button";
import { setCurrentIndividual, resetResponses } from "../actions/surveyActions";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        chosenFamilies: state.familyReducer.chosenFamilies,
        stagedResponses: state.surveyReducer.stagedResponses,
        currentFam: state.surveyReducer.currentFamily,
        responses: state.surveyReducer.responses
    };
};

function FamilyMembers({ navigation, route, setCurrentIndividual, responses, currentFam, stagedResponses, resetResponses }) {

    const { members } = route.params;
    const { name } = route.params;

    useEffect(() => {
        resetResponses()
        console.log("staged responses:", stagedResponses.length);
    }, [])

    useEffect(() => {
        console.log("responses:", responses.length)
    }, [responses])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <Text>{name} Family Members:</Text>
                    {members.map(i => {
                        return (
                            <CustomButton key={i.id} onPress={() => {
                                setCurrentIndividual(i)
                                navigation.navigate("Survey")
                            }} title={`${i.first_name} ${i.last_name}`} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { setCurrentIndividual, resetResponses })(FamilyMembers);

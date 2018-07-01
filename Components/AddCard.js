import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView, Animated} from 'react-native'
import {gray, green, lightBlue, red} from "../utils/colors";
import {addCard} from "../actions";
import { connect } from 'react-redux'
import {addCardStorage} from '../utils/api'
import {NavigationActions} from "react-navigation";

const maxCharacterLength = 150;
class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        notifierOpacity: new Animated.Value(0)
    }

    navigateBackAction = NavigationActions.navigate({
        routeName: 'DeckOptions',

        params: {
            name: this.props.navigation.getParam('name', 'Deck')
        },

        action: NavigationActions.back({ routeName: 'DeckOptions' }),
    });

    updateQuestionInput = (input) => {
        this.setState({question: input})
    }

    updateAnswerInput = (input) => {
        this.setState({answer: input})
    }

    //This method will return true or false depending if the input is too long
    //or if the value is equal to null
    validate = () => {
        if(this.state.answer.length === 0 ||
           this.state.answer.length > maxCharacterLength ||
           this.state.question.length === 0 ||
           this.state.question.length > maxCharacterLength ) {
            return false
        }
        return true
    }

    addNewCard = () => {
        const { question, answer, notifierOpacity } = this.state
        const { dispatch } = this.props
        const {navigation} = this.props

        if(this.validate()) {

            let dispatchObject = {
                deckKey: this.props.navigation.getParam('name', 'Deck'),
                question: question,
                answer: answer
            }
            dispatch(addCard(dispatchObject))

            let saveObject = {
                key: this.props.navigation.getParam('name', 'Deck'),
                question: question,
                answer: answer
            }
            addCardStorage(saveObject)
                .then((res) => {
                    this.props.navigation.state.params.onNavigateBack()
                    navigation.dispatch(this.navigateBackAction);
                })
        } else {
            Animated.sequence([
                Animated.spring(notifierOpacity, {toValue: 1, speed: 5}),
                Animated.timing(notifierOpacity, {toValue: 0, duration: 3000})
            ]).start()
        }

    }

    render() {
        const { question, answer, notifierOpacity } = this.state
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={this.updateQuestionInput}
                    value={question}
                    placeholder={'What is the question for this card?'}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={this.updateAnswerInput}
                    value={answer}
                    placeholder={'What is the answer for this cards question?'}
                />
                <TouchableOpacity
                    style={styles.submit}
                    onPress={this.addNewCard}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
                <Animated.View style={[styles.newMessageNotifyer, {opacity: notifierOpacity}]}>
                    <Text  style={styles.errorMessage}>
                        Both your question and answer must be between 1 and {maxCharacterLength} characters long.
                    </Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    },
    input: {
        alignSelf: 'stretch',
        borderColor: green,
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 25,
        padding: 10,
        borderRadius: 5,
        backgroundColor: gray,
    },
    submit: {
        marginTop: 25,
        padding: 10,
        backgroundColor: green,
        height: 45,
        borderRadius: 2,
        alignSelf: 'stretch',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    errorMessage: {
        marginTop: 20,
        backgroundColor: red,
        padding: 25,
        alignSelf: 'stretch',
        borderRadius: 5
    }
})

function mapDispatchToProps (dispatch) {
    return {
        addCard: (data) => dispatch(addCard(data))
    }
}

export default connect(mapDispatchToProps)(AddCard)
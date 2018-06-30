import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import {gray, green, red} from "../utils/colors";
import {addCard} from "../actions";
import { connect } from 'react-redux'
import {addCardStorage} from '../utils/api'
import {NavigationActions} from "react-navigation";

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
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

    addNewCard = () => {
        const { question, answer } = this.state
        const { dispatch } = this.props
        const {navigation} = this.props

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

    }

    render() {
        const { question, answer } = this.state
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
    }
})

function mapDispatchToProps (dispatch) {
    return {
        addCard: (data) => dispatch(addCard(data))
    }
}

export default connect(mapDispatchToProps)(AddCard)
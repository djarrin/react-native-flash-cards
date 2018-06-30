import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { getDeck } from "../utils/api";
import { green, red, lightBlue } from "../utils/colors";
import {NavigationActions} from "react-navigation";


class DeckOptions extends Component {
    state = {
        title: null,
        questions: []
    }
    componentDidMount() {
        this.refreshData()
    }
    handleOnNavigationback = () => {
        // this.refreshData()
        const {navigation} = this.props
        const deckTitle = navigation.getParam('name', 'Deck');

        getDeck({key: deckTitle}).then((deck) => {
            this.setState({
                title: deck.title,
                questions: deck.questions
            })
        })
    }

    refreshData() {
        const {navigation} = this.props
        const deckTitle = navigation.getParam('name', 'Deck');

        getDeck({key: deckTitle}).then((deck) => {
            this.setState({
                title: deck.title,
                questions: deck.questions
            })
        })
    }

    navigateAddCardAction = NavigationActions.navigate({
        routeName: 'AddCard',

        params: {
            name: this.props.navigation.getParam('name', 'Deck'),
            onNavigateBack: this.handleOnNavigationback
        },

        action: NavigationActions.navigate({routeName: 'AddCard'}),
    });

    addCardView = () => {
        const {navigation} = this.props
        navigation.dispatch(this.navigateAddCardAction);
    }

    startQuiz = () => {

    }

    render() {
        const {title, questions} = this.state
        return(
            <View style={styles.container}>
                <View style={styles.displayPanel}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.questionCount}>{questions.length} cards</Text>
                </View>
                <View style={styles.controlPanel}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, {backgroundColor: lightBlue}]}
                        onPress={this.addCardView}
                    >
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonContainer, {backgroundColor: green}]}
                        onPress={this.startQuiz}
                    >
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    deckTitle: {
        fontSize: 30
    },
    questionCount: {

    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        padding: 20,
        marginTop: 10,
        borderRadius: 15
    },
    controlPanel: {
        justifyContent: 'center'
    },
    displayPanel: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DeckOptions
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import {getDeck} from "../utils/api";
import FlipCard from 'react-native-flip-card'
import { green, red, teal, purple, gray, white, black, lightBlue } from "../utils/colors";


class Quiz extends Component {
    state = {
        questions: [],
        correct: 0,
        wrong: 0,
        currentQuestionNumber: 0,
        cardFlipped: false
    }

    componentDidMount() {
        const {navigation} = this.props
        const deckTitle = navigation.getParam('name', 'Deck');

        getDeck({key: deckTitle}).then((deck) => {
            this.setState({
                questions: deck.questions
            })
        }).then(() => {
            console.log('questions: ' + JSON.stringify(this.state.questions))
            console.log('questions 1: ' + JSON.stringify(this.state.questions[this.state.currentQuestionNumber - 1].question))
        })
    }

    cardCorrect = () => {
        this.setState({
            correct: this.state.correct + 1,
            currentQuestionNumber: this.state.currentQuestionNumber + 1,
            cardFlipped: false
        })
    }

    cardIncorrect = () => {
        this.setState({
            wrong: this.state.wrong + 1,
            currentQuestionNumber: this.state.currentQuestionNumber + 1,
            cardFlipped: false
        })
    }

    resetQuiz = () => {
        this.setState({
            correct: 0,
            wrong: 0,
            currentQuestionNumber: 0
        })
    }

    returnToHome = () => {

    }

    toggleFlip = () => {
        console.log('flipped: ' + this.state.cardFlipped)
        this.setState({
            cardFlipped: !this.state.cardFlipped
        })
    }

    render() {
        const {questions, currentQuestionNumber, correct, wrong} = this.state
        const numberOfQuestions = questions.length
        console.log('numberOfQuestions: ' + numberOfQuestions)
        console.log('currentQuestionNumber: ' + currentQuestionNumber)
        return(
            <View style={styles.container}>
                {(currentQuestionNumber === numberOfQuestions ? (
                    <View style={styles.flipContainer}>
                        <Text>You got {correct} questions correct</Text>
                        <Text>You got {wrong} questions incorrect</Text>
                        <Text>That is a score of {(correct/numberOfQuestions)*100}%</Text>
                        <TouchableOpacity
                            style={[styles.answerButton, {backgroundColor: purple}]}
                            onPress={this.resetQuiz}
                        >
                            <Text>Take Quiz Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.answerButton, {backgroundColor: gray}]}
                            onPress={this.returnToHome}
                        >
                            <Text>Return Home</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <View>
                        <Text style={styles.questionCount}>{currentQuestionNumber + 1}/{numberOfQuestions}</Text>
                        <FlipCard
                            style={styles.flipContainer}
                            friction={6}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={this.state.cardFlipped}
                            clickable={false}
                            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                        >
                            <View style={[styles.card, {backgroundColor: teal}]}>
                                <Text style={styles.cardText}>{questions[currentQuestionNumber].question}</Text>
                                <Text>Question Side</Text>
                            </View>
                            <View style={[styles.card, {backgroundColor: lightBlue}]}>
                                <Text style={styles.cardText}>{questions[currentQuestionNumber].answer}</Text>
                                <Text>Answer Side</Text>
                            </View>
                        </FlipCard>
                        <View style={{marginTop: 150}}>
                            <TouchableOpacity onPress={this.toggleFlip} style={styles.flip}><Text>Press Here to Flip</Text></TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.answerButton, {backgroundColor: green}]}
                            onPress={this.cardCorrect}
                            >
                                <Text>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={[styles.answerButton, {backgroundColor: red}]}
                            onPress={this.cardIncorrect}
                            >
                                <Text>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center'
    },
    cardContainer: {


    },
    flipContainer: {
        borderWidth: 0,
        flex: 1,
    },
    card: {
        height: 150,
        backgroundColor: green,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 25,
    },
    questionCount: {

    },
    instructions: {
        alignSelf: 'center',
        fontSize: 11
    },
    instructionsContainer: {
        alignItems: 'center'
    },
    answerButton: {
        marginTop: 15,
        alignSelf: 'center',
        padding: 25,
        borderRadius: 5,
    },
    responseButton: {
        color: black
    },
    flip: {
        backgroundColor: teal,
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    }
})

export default Quiz
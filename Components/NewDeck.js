import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Animated,
    Keyboard
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {green, teal, purple, gray, white, black, lightBlue, red} from "../utils/colors";
import LabelText from './LabelText'
import { addDeck } from "../actions";
import { submitDeck, fetchDecks, getDeck } from "../utils/api";

class NewDeck extends Component {
    state = {
        titleText: '',
        notifierOpacity: new Animated.Value(0),
        errorNotifierOpacity: new Animated.Value(0)
    }

    addNewDeck = () => {
        const {titleText, notifierOpacity, errorNotifierOpacity} = this.state
        const {dispatch} = this.props
        this.validate().then((validated) => {
            console.log('validated: ' + validated)
            if(validated) {
                let dispatchObject = {
                    title: titleText
                }
                dispatch(addDeck(dispatchObject))

                let newDeck = {
                    title: titleText,
                    questions: []
                }

                submitDeck({deck:newDeck, key:titleText })

                this.setState({
                    titleText: ''
                })

                Keyboard.dismiss()

                Animated.sequence([
                    Animated.spring(notifierOpacity, {toValue: 1, speed: 5}),
                    Animated.timing(notifierOpacity, {toValue: 0, duration: 3000})
                ]).start()
            } else {
                Animated.sequence([
                    Animated.spring(errorNotifierOpacity, {toValue: 1, speed: 5}),
                    Animated.timing(errorNotifierOpacity, {toValue: 0, duration: 3000})
                ]).start()
            }
        })

    }

    //this method will return true or false depending
    //on if that particular deck name has been taken
    //we do this because the decks name is used as the key
    //and we don't want duplicate keys
    validate = () => {
        return getDeck({key: this.state.titleText}).then((res) => {
            return typeof res === 'undefined'
        })
    }

    updateDeckInput = (input) => {
        this.setState({titleText: input})
    }

    render() {
        const { titleText, notifierOpacity, errorNotifierOpacity } = this.state

        return (
            <View style={styles.container}>
                <LabelText text={"What will be the title of this deck?"}/>
                <TextInput
                    style={styles.input}
                    onChangeText={this.updateDeckInput}
                    value={titleText}
                />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.addNewDeck}
                >
                    <Text>Add Deck</Text>
                </TouchableOpacity>
                <Animated.View
                    style={[styles.newMessageNotifyer, {opacity: notifierOpacity}, {backgroundColor: lightBlue}]}
                >
                    <Text  style={styles.messageStyles}>
                        Your deck has been added check back at the decks view
                    </Text>
                </Animated.View>
                <Animated.View
                    style={[styles.newMessageNotifyer, {opacity: errorNotifierOpacity}, {backgroundColor: red}]}
                >
                    <Text  style={styles.messageStyles}>
                        The deck name you have tried to enter has already been taken, please try another name.
                    </Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: green,
        borderRadius: 5,
        backgroundColor: gray,
        padding: 10,
    },
    submitBtn: {
        backgroundColor: green,
        padding: 10,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    newMessageNotifyer: {
        marginTop: 20,
        padding: 25,
        alignSelf: 'stretch',
        borderRadius: 5
    },
    messageStyles: {
        alignSelf: 'center',
        fontSize: 20
    }
})

function mapDispatchToProps (dispatch) {
    return {
        addDeck: (data) => dispatch(addDeck(data))
    }
}

export default connect(mapDispatchToProps)(NewDeck)
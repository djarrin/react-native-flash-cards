import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import {green, gray, lightBlue, red} from "../utils/colors";
import LabelText from './LabelText'
import { addDeck } from "../actions";
import { submitDeck, getDeck } from "../utils/api";

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
                Keyboard.dismiss()

                Animated.sequence([
                    Animated.spring(errorNotifierOpacity, {toValue: 1, speed: 5}),
                    Animated.timing(errorNotifierOpacity, {toValue: 0, duration: 5000})
                ]).start()
            }
        })

    }

    //this method will return true or false depending
    //on if that particular deck name has been taken
    //we do this because the decks name is used as the key
    //and we don't want duplicate keys
    validate = () => {
        const { titleText } = this.state

        return getDeck({key: titleText}).then((res) => {
            console.log('res: ' + JSON.stringify(res))
            if(titleText.length === 0) {
                return false
            }
            return typeof res === 'undefined'
        })
    }

    updateDeckInput = (input) => {
        this.setState({titleText: input})
    }

    render() {
        const { titleText, notifierOpacity, errorNotifierOpacity } = this.state

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
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
                            The deck name you have tried to enter has already been taken (or you did not enter a deck name), please try another name.
                        </Text>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        marginTop: 2,
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
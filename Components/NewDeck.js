import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { green, teal, purple, gray, white, black } from "../utils/colors";
import LabelText from './LabelText'
import { addDeck } from "../actions";
import { submitDeck, fetchDecks } from "../utils/api";

class NewDeck extends Component {
    state = {
        titleText: ''
    }

    addNewDeck = () => {
        const {titleText} = this.state
        const {dispatch, store} = this.props

        let dispatchObject = {
            title: titleText
        }
        dispatch(addDeck(dispatchObject))

        let newDeck = {
            title: titleText,
            question: []
        }

        submitDeck({deck:newDeck, key:titleText })
    }

    updateDeckInput = (input) => {
        this.setState({titleText: input})
    }

    render() {
        const { titleText } = this.state

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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: green,
        borderRadius: 5,
        backgroundColor: gray,
        padding: 10,
        color: black,
    },
    submitBtn: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: green,
        padding: 10,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }
})

function mapDispatchToProps (dispatch) {
    return {
        addDeck: (data) => dispatch(addDeck(data))
    }
}

export default connect(mapDispatchToProps)(NewDeck)
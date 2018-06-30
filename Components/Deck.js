import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types';
import { green, red } from "../utils/colors";
import { connect } from 'react-redux'
import {addDeck} from "../actions";
import { removeDeck } from "../actions";
import { deleteDeck } from "../utils/api";

class Deck extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
        deckKey: PropTypes.string.isRequired
    }

    removeDeck = () => {
        const {dispatch, deckKey} = this.props
        let dispatchObject = {
            deckKey: deckKey
        }
        dispatch(removeDeck(dispatchObject))

        deleteDeck({key: deckKey});

    }


    render() {
        const {title, questions} = this.props

        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.deckQuestionCount}>{questions.length} cards</Text>
                    <TouchableOpacity
                        style={[styles.deckOptions, {backgroundColor: green}]}
                    >
                        <Text>Select Deck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deckOptions, {backgroundColor: red}]}
                        onPress={this.removeDeck}
                    >
                        <Text>Remove Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        // flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    textContainer: {
        padding: 20,
    },
    deckTitle: {
        fontSize: 25,
        alignSelf: 'center'

    },
    deckQuestionCount: {
        alignSelf: 'center'
    },
    deckOptions: {
        alignItems: 'center',
        padding: 15,
        marginTop: 15,
        borderRadius: 15
    },
})

function mapDispatchToProps (dispatch) {
    return {
        removeDeck: (data) => dispatch(removeDeck(data))
    }
}

export default connect(mapDispatchToProps)(Deck)
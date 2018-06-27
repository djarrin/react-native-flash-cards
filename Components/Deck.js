import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types';

class Deck extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired
    }


    render() {
        const {title, questions} = this.props

        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.deckQuestionCount}>{questions.length} cards</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    textContainer: {
        padding: 20,
    },
    deckTitle: {
        fontSize: 25

    },
    deckQuestionCount: {
        alignSelf: 'center'
    }
})

export default Deck
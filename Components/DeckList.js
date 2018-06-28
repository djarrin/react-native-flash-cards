import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { green, teal, purple, gray, white, black } from "../utils/colors";
import Deck from './Deck'
import {fetchDecks} from "../utils/api";
import {loadDeck} from "../actions";


class DeckList extends Component {

    componentDidMount() {
        // const {dispatch} = this.props
        // fetchDecks().then((res) => {
        //     let decksObject = JSON.parse(res);
        //
        //     Object.keys(decksObject).map(e => {
        //         let dispatchObject = {
        //             key: e,
        //             title: decksObject[e].title,
        //             questions: decksObject[e].questions
        //         }
        //         dispatch(loadDeck(dispatchObject));
        //
        //     });
        // })
    }

    render() {
        const {decks} = this.props;
        console.log('props: ' + JSON.stringify(this.props));


        return (
            <View style={styles.container}>
                {typeof decks !== 'undefined' ? Object.keys(decks).map((key, index) => (
                    <Deck
                        title={decks[key].title}
                        questions={decks[key].questions}
                        key={index}
                        deckKey={key}
                    />
                )):''}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = (state) => {
    if(Object.keys(state.cardDecks).length === 0 && state.cardDecks.constructor === Object) {
        return {}
    } else {
        return {
            decks: state.cardDecks,
        }
    }
}

export default connect(
    mapStateToProps,
)(DeckList)

import React, {Component} from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { green } from '../utils/colors'


class DeckList extends Component {

    render() {
        const {decks} = this.props;

        return (
            <ScrollView style={styles.container}>
                {typeof decks !== 'undefined' ? Object.keys(decks).map((key, index) => (
                    // Need to find out whats going wrong here for android
                    <Deck
                        title={decks[key].title}
                        questions={decks[key].questions}
                        key={index}
                        deckKey={key}
                        navigation={this.props.navigation}
                    />
                )):(
                    <View style={styles.noDeckView}>
                        <Text style={styles.noDeckText}>
                            You have no decks currently created, please go to the add deck tab and add a new flash card deck!
                        </Text>
                    </View>
                )}
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noDeckView: {
        alignItems: 'center',
        backgroundColor: green
    },
    noDeckText: {
        fontSize: 25,
        // color: green,
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

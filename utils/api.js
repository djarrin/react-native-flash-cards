import { AsyncStorage } from 'react-native'

const DECK_KEY  = 'DECK_KEY';

export function submitDeck({ deck, key }) {
    return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
        [key]: deck,
    }))
}

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_KEY)
        .then((res) => {
            return res;
        })
}
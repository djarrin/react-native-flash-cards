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

export function deleteDeck({key}) {
    return AsyncStorage.getItem(DECK_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECK_KEY, JSON.stringify(data))
        })
}

export function getDeck({key}) {
    console.log('key: ' + JSON.stringify(key))
    return AsyncStorage.getItem(DECK_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            console.log('data[key]: ' + JSON.stringify(data[key]));
            return data[key]
    })
}
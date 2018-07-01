import { AsyncStorage } from 'react-native'

const DECK_KEY  = 'DECK_KEY';

export function submitDeck({ deck, key }) {
    console.log('submit deck: ' + JSON.stringify(deck))
    return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
        [key]: deck,
    }))
}

export function addCardStorage({question, answer, key}) {
    return AsyncStorage.getItem(DECK_KEY)
        .then(data => {
            data = JSON.parse(data)
            let copy = data[key]
            copy.questions = copy.questions.concat({question: question, answer: answer});
            submitDeck({deck: copy, key: key});
        })
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
    return AsyncStorage.getItem(DECK_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            console.log('key: ' + JSON.stringify(key))
            console.log('data: ' + JSON.stringify(data))
            if(data !== null) {
                return data[key]
            }
            return undefined
    })
}
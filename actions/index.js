export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_DECK = 'LOAD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export function addDeck({title}) {
    return {
        type: ADD_DECK,
        title
    }
}

export function loadDeck({key, title, questions}) {
    return {
        type: LOAD_DECK,
        title,
        questions,
        key
    }
}

export function removeDeck({deckKey}) {
    return {
        type: REMOVE_DECK,
        deckKey
    }
}

export function addCard({deckKey, question, answer}) {
    return {
        type: ADD_CARD,
        deckKey,
        question,
        answer
    }

}
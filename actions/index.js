export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_DECK = 'LOAD_DECK';

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
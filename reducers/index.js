import { ADD_CARD, ADD_DECK, LOAD_DECK } from "../actions";
import { combineReducers } from 'redux';

function cardDecks(state = {}, action) {
    const {title, questions} = action;

    switch (action.type) {
        case ADD_CARD:
            return {}

        case ADD_DECK:
            return {
                ...state,
                [title]: {
                    title: title,
                    questions: []
                }
            }

        case LOAD_DECK:
            return {
                ...state,
                [title]: {
                    title: title,
                    questions: questions
                }
            }
        default :
            return state
    }
}

export default combineReducers({
    cardDecks,
});
import { ADD_CARD, ADD_DECK } from "../actions";
import { combineReducers } from 'redux';

function cardDecks(state = {}, action) {
    const {title} = action;

    switch (action.type) {
        case ADD_CARD:
            return {}

        case ADD_DECK:
            console.log(action);
            return {
                ...state,
                [title]: {
                    title: title,
                    questions: []
                }
            }

        default :
            return state
    }
}

export default combineReducers({
    cardDecks,
});
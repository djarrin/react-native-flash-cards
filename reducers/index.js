import {ADD_CARD, ADD_DECK, LOAD_DECK, REMOVE_DECK} from "../actions";
import { combineReducers } from 'redux';

function cardDecks(state = {}, action) {
    const {title, questions, deckKey} = action;

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

        case REMOVE_DECK:
            //have to credit Halt001 on this thread for this solution: https://github.com/erikras/react-redux-universal-hot-example/issues/962
            let clone = Object.assign({}, state);
            delete clone[deckKey];
            console.log(clone);
            return clone;

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
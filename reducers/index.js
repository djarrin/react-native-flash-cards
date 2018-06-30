import {ADD_CARD, ADD_DECK, LOAD_DECK, REMOVE_DECK} from "../actions";
import { combineReducers } from 'redux';

function cardDecks(state = {}, action) {
    const {title, questions, deckKey, question, answer} = action;

    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                [deckKey]: {
                    title: deckKey,
                   questions: state[deckKey].questions.concat({question: question, answer: answer})
                }
            }

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
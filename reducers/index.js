import { ADD_CARD, ADD_DECK } from "../actions";

function cardDecks(state = {}, action) {
    switch (action.type) {
        case ADD_CARD:
            return {}

        case ADD_DECK:
            return {}

        default :
            return state
    }
}

export default cardDecks
import { GET_BOOKS, CREATE_BOOK } from '../actions/actionTypes'

const initialState = {
    books: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_BOOKS:   
        return {
            ...state,
            books: action.payload
        }
        case CREATE_BOOK:   
        return {
            ...state,
        }
        default: return state
    }
}
import { LOGIN, LOGOUT } from '../actions/actionTypes'

const initialState = {
    isLoggedIn: false,
    loggedUser: {}
}

export default function(state = initialState, action) {
        switch(action.type) {
            case LOGIN: 
            return {
                ...state,
                isLoggedIn: true,
                loggedUser: action.payload
            }
            case LOGOUT: 
            return {
                ...state,
                isLoggedIn: false,
                loggedUser: {}
            }
            default: return state
        }
}
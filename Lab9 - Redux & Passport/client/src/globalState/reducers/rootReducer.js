import { combineReducers } from 'redux'
import bookReducer from './bookReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'

export default combineReducers({
    books: bookReducer,
    auth: authReducer,
    users: userReducer,
})
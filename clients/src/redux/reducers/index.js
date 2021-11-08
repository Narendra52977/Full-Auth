import {combineReducers} from 'redux'
import token from './tokenReducer'
import auth from './authReducer'
import users from './userReducer'
const rootReducer = combineReducers({
    auth,token,users
});
export default rootReducer
import usersReducer from './reducer';
import {combineReducers} from 'redux';

export default combineReducers({
    usersStore: usersReducer
})
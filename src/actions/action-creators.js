import { ADD_USER, REMOVE_LAST_USER, REMOVE_SELECTED_USER, INCREMENT_AUTO_ID } from './actions';

export const addUser = user => (
    {
        type: ADD_USER,
        payload: user
    }
)

export const removeLastUser = () => (
    {
        type: REMOVE_LAST_USER,
        payload: ''
    }
)

export const removeSelectedUser = id => (
    {
        type: REMOVE_SELECTED_USER,
        payload: id
    }
)

export const incrementAutoId = autoId => (
    {
        type: INCREMENT_AUTO_ID,
        payload: autoId
    }
)
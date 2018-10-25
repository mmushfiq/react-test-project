import { ADD_USER, REMOVE_LAST_USER, REMOVE_SELECTED_USER, INCREMENT_AUTO_ID } from '../actions/actions';

const DEFAULT_STATE = {
    autoId: 1,
    users: []
}

export default function usersReducer(state = DEFAULT_STATE, action) {
    let newUsers = [];
    switch (action.type) {
        case ADD_USER:
            newUsers = [...state.users, action.payload];
            return { ...state, users: newUsers };
        case REMOVE_LAST_USER:
            let lastElement = state.users.length - 1;
            newUsers = state.users.slice(0, lastElement);
            return { ...state, users: newUsers };
        case REMOVE_SELECTED_USER:
            newUsers = state.users.filter(user => {
                return user.id !== action.payload;
            })
            return { ...state, users: newUsers };
        case INCREMENT_AUTO_ID:
            return { ...state, autoId: action.payload };
        default:
            return state;

    }
}
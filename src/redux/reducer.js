import * as types from "./actionType";

const initialState = {
    users: [],
    roles:[],
    role: {},
    user: {},
    loading: true
};

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS: 
        return {
            ...state,
            users: action.payload,
            loading:false,
        };
        case types.GET_ROLES: 
        return {
            ...state,
            roles: action.payload,
            loading:false,
        };
        case types.DELETE_USER:
        case types.ADD_USER:
        case types.UPDATE_USER:
        case types.DELETE_ROLE:
        case types.ADD_ROLE:
        case types.UPDATE_ROLE:                
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case types.GET_SINGLE_ROLE:
            return {
                ...state,
                role: action.payload,
                loading: false,
            };            
        default:
            return state;
    }
};

export default usersReducers;
import {getAuthUser} from "./authReducer";

let INITIALIZATION_ACCESS = 'INITIALIZATION_ACCESS';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    isInitializationAccess: false,
    isFetching: false
};

let initializationReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZATION_ACCESS:
            return {
                ...state,
                isInitializationAccess: true
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
};


export let initializationAccess = () => ({type: INITIALIZATION_ACCESS});
export let toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export let initialization = () => {
    return (dispatch) => {
        dispatch(getAuthUser())
            .then(() => {
                dispatch(initializationAccess())
            })
    }
}

export default initializationReducer;
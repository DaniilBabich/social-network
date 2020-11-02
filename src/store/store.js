import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';
import initializationReducer from './initializationReducer';
import authReducer from './authReducer';

let reducers = combineReducers({
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer,
    initialization: initializationReducer,
    form: formReducer

});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
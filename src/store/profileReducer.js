import {profileAPI} from "../api/api";
import {toggleIsFetching} from "./initializationReducer";
import {stopSubmit} from "redux-form";

let SET_PROFILE = 'SET_PROFILE';
let SET_STATUS = 'SET_STATUS';
let UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
let ADD_POST = 'ADD_POST';
let SET_PHOTO = 'SET_PHOTO';

let initialState = {
    profile: null,
    status: '',
    postText: '',
    posts: []
};

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPDATE_POST_TEXT:
            return {
                ...state,
                postText: action.text
            }
        case ADD_POST:
            let post = {
                text: state.postText
            };
            return {
                ...state,
                posts: [...state.posts, post],
                postText: ''
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
};


export let setProfile = (profile) => ({type: SET_PROFILE, profile});
export let setStatus = (status) => ({type: SET_STATUS, status});
export let updatePostText = (text) => ({type: UPDATE_POST_TEXT, text});
export let addPost = () => ({type: ADD_POST});
export let setPhoto = (photos) => ({type: SET_PHOTO, photos});

export let getProfile = (id) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getProfile(id)
            .then((response) => {
                dispatch(setProfile(response.data))
                dispatch(toggleIsFetching(false));
            })
    }
}

export let getStatus = (id) => {
    return (dispatch) => {
        profileAPI.getStatus(id)
            .then((response) => {
                dispatch(setStatus(response.data))
            })
    }
}

export let updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

export let changePhoto = (photo) => {
    return (dispatch) => {
        profileAPI.changePhoto(photo)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setPhoto(response.data.data.photos))
                }
            })
    }
}

export let changeProfileInfo = (data) => {
    return (dispatch, getState) => {
        profileAPI.changeProfileInfo(data)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(getProfile(getState().auth.id))
                }
                else {
                    dispatch(stopSubmit('profileInfoForm', {_error: response.data.messages}))
                }
            })
    }
}

export default profileReducer;
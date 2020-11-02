import {followAPI, usersAPI} from '../api/api';
import {toggleIsFetching} from "./initializationReducer";

let SET_USERS = 'SET_USERS';
let SET_CURRENT_PORTION = 'SET_CURRENT_PORTION';
let TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
let TOGGLE_FOLLOWINGS_IN_PROGRESS = 'TOGGLE_FOLLOWINGS_IN_PROGRESS';

let initialState = {
    users: [],
    currentPortion: 1,
    portionUsersCount: 30,
    followingsInProgress: []
};

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            if (action.users)
                return {
                    ...state,
                    users: [...state.users, ...action.users]
                }
            else
                return {
                    ...state,
                    users: []
                }
        case SET_CURRENT_PORTION:
            return {
                ...state,
                currentPortion: action.currentPortion + 1
            }
        case TOGGLE_FOLLOWED:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.id) {
                        return {
                            ...user,
                            followed: action.followed
                        }
                    }
                    return user;
                })
            }
        case TOGGLE_FOLLOWINGS_IN_PROGRESS:
            return {
                ...state,
                followingsInProgress: action.isFollowingInProgress
                    ? [...state.followingsInProgress, action.id]
                    : state.followingsInProgress.filter((id) => {return id !== action.id})
            }
        default:
            return state;
    }
};

export let setUsers = (users) => ({type: SET_USERS, users});
export let setCurrentPortion = (currentPortion) => ({type: SET_CURRENT_PORTION, currentPortion});
export let toggleFollowed = (id, followed) => ({type: TOGGLE_FOLLOWED, id, followed});
export let toggleFollowingsInProgress = (id, isFollowingInProgress) => ({type: TOGGLE_FOLLOWINGS_IN_PROGRESS, id, isFollowingInProgress});

export let getUsers = (currentPortion, portionUsersCount) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPortion, portionUsersCount)
            .then((response) => {
                dispatch(setUsers(response.data.items));
                dispatch(toggleIsFetching(false));
            })
    }
}

export let follow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingsInProgress(id, true));
        followAPI.follow(id)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(toggleFollowed(id, true));
                }
                dispatch(toggleFollowingsInProgress(id, false));
            })
    }
}

export let unfollow = (id) => {
    return (dispatch) => {
        dispatch(toggleFollowingsInProgress(id, true));
        followAPI.unfollow(id)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(toggleFollowed(id, false));
                }
                dispatch(toggleFollowingsInProgress(id, false));
            })
    }
}

export default usersReducer;
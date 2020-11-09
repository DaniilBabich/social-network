import {followAPI, usersAPI} from '../api/api';
import {toggleIsFetching} from "./initializationReducer";

let SET_USERS = 'SET_USERS';
let SET_CURRENT_PORTION = 'SET_CURRENT_PORTION';
let TOGGLE_FOLLOWED = 'TOGGLE_FOLLOWED';
let TOGGLE_FOLLOWINGS_IN_PROGRESS = 'TOGGLE_FOLLOWINGS_IN_PROGRESS';
let SET_SEARCH = 'SET_SEARCH';
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
let TOGGLE_IS_SEARCHING = 'TOGGLE_IS_SEARCHING';

let initialState = {
    users: [],
    totalUsersCount: null,
    currentPortion: 1,
    portionUsersCount: 30,
    followingsInProgress: [],
    search: '',
    isSearching: false
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
        case SET_SEARCH:
            return {
                ...state,
                search: action.search
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_SEARCHING:
            return {
                ...state,
                isSearching: action.isSearching
            }
        default:
            return state;
    }
};

export let setUsers = (users) => ({type: SET_USERS, users});
export let setCurrentPortion = (currentPortion) => ({type: SET_CURRENT_PORTION, currentPortion});
export let toggleFollowed = (id, followed) => ({type: TOGGLE_FOLLOWED, id, followed});
export let toggleFollowingsInProgress = (id, isFollowingInProgress) => ({type: TOGGLE_FOLLOWINGS_IN_PROGRESS, id, isFollowingInProgress});
export let setSearch = (search) => ({type: SET_SEARCH, search});
export let setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export let toggleIsSearching = (isSearching) => ({type: TOGGLE_IS_SEARCHING, isSearching});

export let getUsers = (currentPortion, portionUsersCount, isFriend) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPortion, portionUsersCount, isFriend)
            .then((response) => {
                dispatch(setUsers(response.data.items));
                dispatch(setTotalUsersCount(response.data.totalCount));
                dispatch(toggleIsFetching(false));
            })
    }
}

export let getFoundUsers = (currentPortion, portionUsersCount, isFriend, search) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getFoundUsers(currentPortion, portionUsersCount, isFriend, search)
            .then((response) => {
                dispatch(setUsers(response.data.items));
                dispatch(setTotalUsersCount(response.data.totalCount));
                dispatch(toggleIsFetching(false));
                dispatch(toggleIsSearching(false));
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
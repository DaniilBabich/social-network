import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

let SET_AUTH_USER = 'SET_AUTH_USER';
let SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
};


export let setAuthUser = (data, isAuth) => ({type: SET_AUTH_USER, data, isAuth});
export let setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl});

export let getAuthUser = () => {
    return (dispatch) => {
        return authAPI.authMe()
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUser(response.data.data, true));
                }
            })
    }
}

export let login = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, captcha)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUser())
                    if (captcha) {
                        dispatch(setCaptchaUrl(null));
                    }
                }
                else {
                    if (response.data.resultCode === 10) {
                        dispatch(getCaptchaUrl())
                    }
                    dispatch(stopSubmit('loginForm', {_error: response.data.messages}))
                }
            })
    }
}

export let logout = () => {
    return (dispatch) => {
        authAPI.logout()
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUser({id: null, login: null, email: null}, false))
                }
            })
    }
}

export let getCaptchaUrl = () => {
    return (dispatch) => {
        securityAPI.getCaptchaUrl()
            .then((response) => {
                dispatch(setCaptchaUrl(response.data.url))
            })
    }
}

export default authReducer;
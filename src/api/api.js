import * as axios from 'axios';

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'dab56462-26e8-4445-93a1-7244cf2a3fbf'
    }
})

export let usersAPI = {
    getUsers(currentPortion, portionUsersCount, isFriends) {
        return instance.get(`users?page=${currentPortion}&count=${portionUsersCount}&friend=${isFriends}`)
    },
    getFoundUsers(currentPortion, portionUsersCount, isFriends, search) {
        return instance.get(`users?page=${currentPortion}&count=${portionUsersCount}&friend=${isFriends}&term=${search}`)
    }
}

export let followAPI = {
    follow(id) {
        return instance.post(`follow/${id}`)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
    }
}

export let profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
    },
    changePhoto(photo) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {'Content-Type': 'multipart/form-data'})
    },
    changeProfileInfo(data) {
        return instance.put(`profile`, data)
    }
}

export let authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export let securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

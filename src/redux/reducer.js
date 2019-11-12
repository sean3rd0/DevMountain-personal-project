import axios from "axios"

const initialState = {
    user: {
        /* 
        person_id, 
        email, 
        username, 
        firstname, 
        lastname, 
        password, 
        profile_pic 
        */
    }, 
    following: [/*following_id, following_id, following_id, etc.*/], 
    currentPage: {
        /* page_id, 
        person_id, 
        page_title */
    }, 
    postsOnCurrentPage: [
        /* {
        post_id, 
        page_id, 
        post_text, 
        photo_1_id, 
        video_1_id
    }, {
        post_id, 
        page_id, 
        post_text, 
        photo_1_id, 
        video_1_id
    }, etc. */
    ]
}

const LOGIN_USER = "LOGIN_USER"
const CREATE_USER = "CREATE_USER"
const LOGOUT_USER = "LOGOUT_USER"
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE"
const UPDATE_USER_INFO = "UPDATE_USER_INFO"

export function loginUser(userObj){
    return {
        type: LOGIN_USER, 
        payload: userObj
    }
}

export function createUser(userObj){
    return {
        type: CREATE_USER, 
        payload: userObj
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER
    }
}

export function getCurrentPage(username){
    return {
        type: GET_CURRENT_PAGE, 
        payload: username
    }
}

export function updateUserInfo(userObj){
    return {
        type: UPDATE_USER_INFO, 
        payload: userObj
    }
}



export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type) {
        case CREATE_USER: 
            return {
                ...state, 
                user: {
                    ...state.user, 
                    personId: payload.person_id, 
                    username: payload.username, 
                    password: payload.password
                }, 
                currentPage: {
                    ...state.currentPage, 
                    personId: payload.person_id, 
                    pageId: payload.page_id, 
                    pageTitle: payload.page_title
                }
                
            }

        case LOGIN_USER: 
            return {
                ...state, 
                user: {
                    ...state.user, 
                    personId: payload.person_id, 
                    email: payload.email, 
                    username: payload.username, 
                    firstname: payload.firstname, 
                    lastname: payload.lastname, 
                    profilePic: payload.profile_pic
                }, 
                currentPage: {
                    ...state.currentPage, 
                    pageId: payload.page_id, 
                    pageTitle: payload.page_title
                }
            }

        case LOGOUT_USER: 
            return {
                ...initialState
            }

        case GET_CURRENT_PAGE: 
        console.log('this is the GET_CURRENT_PAGE payload: ', payload)
            return {
                ...state, 
                currentPage: {
                    ...state.currentPage, 
                    pageId: payload.page_id, 
                    personId: payload.person_id, 
                    pageTitle: payload.page_title
                }
            }

        case UPDATE_USER_INFO: 
        console.log('this is the UPDATE_USER_INFO action.payload: ', action.payload)
            return {
                ...state, 
                user: {
                    ...state.user, 
                    email: payload.email, 
                    firstname: payload.firstname, 
                    lastname: payload.lastname, 
                    profilePic: payload.profilePic
                }
            }
        
        default: 
            return state
    }
}
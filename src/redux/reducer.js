import axios from "axios"
import { get } from "http"

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
    pagesOnCurrentProfile: [],
    currentPage: {
        /* page_id, 
        person_id, 
        page_title */
    }, 
    postsOnCurrentPage: [
        /* {
        post_id, 
        page_id, 
        date, 
        post_text, 
        photo_1_id, 
        video_1_id
    }, {
        post_id, 
        page_id, 
        date, 
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
const GET_POSTS_ON_CURRENT_PAGE = "GET_POSTS_ON_CURRENT_PAGE"
const EDIT_INDIVIDUAL_POST = "EDIT_INDIVIDUAL_POST"
const UPDATE_USER_INFO = "UPDATE_USER_INFO" 
const CREATE_NEW_POST = "CREATE_NEW_POST"

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

export function getPostsOnCurrentPage(postsOnCurrentPage){
    return {
        type: GET_POSTS_ON_CURRENT_PAGE, 
        payload: postsOnCurrentPage
    }
}

export function editIndividualPost(responseData){
    return {
        type: EDIT_INDIVIDUAL_POST, 
        payload: responseData
    }
}

export function updateUserInfo(userObj){
    return {
        type: UPDATE_USER_INFO, 
        payload: userObj
    }
}

export function createNewPost(postObj){
    return {
        type: CREATE_NEW_POST, 
        payload: postObj
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
                pageid: payload.page_id, 
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
                pageid: payload.page_id, 
                pageTitle: payload.page_title
            }
        }
        
        case LOGOUT_USER: 
        return {
            ...initialState
        }
        
        case GET_CURRENT_PAGE: 
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
                pageid: payload.page_id, 
                personId: payload.person_id, 
                pageTitle: payload.page_title
            }
        }
        
        case GET_POSTS_ON_CURRENT_PAGE: 
        return {
            ...state, 
            postsOnCurrentPage: payload
        }
        
        case EDIT_INDIVIDUAL_POST: 
        console.log('this is the EDIT_INDIVIDUAL_POST payload: ', payload)
        return {
            ...state, 
            postsOnCurrentPage: [
                payload, 
                ...state.postsOnCurrentPage
            ]
        }
        
        case UPDATE_USER_INFO: 
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
        
        case CREATE_NEW_POST: 
        return {
            ...state, 
            postsOnCurrentPage: [
                {
                    date: payload.date, 
                        post_text: payload.body
                    }, 
                    ...state.postsOnCurrentPage
                ]
            }
        
        default: 
            return state
    }
}
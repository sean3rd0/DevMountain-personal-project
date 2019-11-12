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
const UPDATE_USER_INFO = "UPDATE_USER_INFO"

export function loginUser(userObj){
    // console.log('this is the argument that was passed into the loginUser function: ', userObj)
    return {
        type: LOGIN_USER, 
        payload: userObj
    }
}

export function createUser(userObj){
    console.log('this is the argument that was passed into the createUser function: ', userObj)
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

export function updateUserInfo(userObj){
    return {
        type: UPDATE_USER_INFO, 
        payload: userObj
    }
}



export default function reducer(state = initialState, action){
    // console.log('this is initialState: ', initialState)
    // console.log('this is state: ', state)
    // console.log('this is action: ', action)
    // console.log('this is action.type: ', action.type)
    // console.log('this is action.payload: ', action.payload)
    const {type, payload} = action
    switch(type) {
        case CREATE_USER: 
        console.log('this is CREATE_USER action.type: ', action.type)
        console.log('this is CREATE_USER action.payload: ', action.payload)
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
        // console.log('this is LOGIN_USER action.type: ', action.type)
        // console.log('this is LOGIN_USER action.payload: ', action.payload)
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
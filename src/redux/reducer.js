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



export default function reducer(state = initialState, action){
    // console.log('this is initialState: ', initialState)
    // console.log('this is state: ', state)
    // console.log('this is action: ', action)
    // console.log('this is action.type: ', action.type)
    // console.log('this is action.payload: ', action.payload)
    const {type, payload} = action
    switch(type) {
        case CREATE_USER + '_FULFILLED': 
        console.log('this is CREATE_USER action.type: ', action.type)
        console.log('this is CREATE_USER action.payload: ', action.payload)
            return {
                ...state, 
                user: {
                    ...state.user, 
                    person_id: payload.person_id, 
                    username: payload.username, 
                    password: payload.password
                }, 
                currentPage: {
                    ...state.currentPage, 
                    page_id: payload.page_id, 
                    page_title: payload.page_title
                }
            }
        case LOGIN_USER: 
        console.log('this is LOGIN_USER action.type: ', action.type)
        console.log('this is LOGIN_USER action.payload: ', action.payload)
            return {
                ...state, 
                //add everything to state that could possibly be needed by this req.session.user. 
                //yeah? or should I only add things that are needed IMMEDIATELY, and then wait for other axios calls to add other stuff?
            }
        default: 
            return state
    }
}
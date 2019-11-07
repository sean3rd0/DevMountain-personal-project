import axios from "axios"

const initialState = {
    users: {
        /* person_id, 
        email, 
        username, 
        firstname, 
        lastname, 
        password, 
        profile_pic */
    }, 
    following: [/*following_id, following_id, following_id, etc.*/], 
    currentPage: {
        /* page_id, 
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

const EXAMPLE_ACTION_TYPE = "EXAMPLE_ACTION_TYPE"

export default function userReducer(state = initialState, action){
    switch (action.type) {
        default: 
            return state
    }
}
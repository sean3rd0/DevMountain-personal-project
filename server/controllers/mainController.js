module.exports = {
    getCurrentPage: async (req, res) => {
        const db = req.app.get('db')
        const {username} = req.params
        
        // let landingPage = await db.get_landing_page(username)
        // landingPage = landingPage[0]

        let userInfo = await db.get_user_info({username})
        userInfo = userInfo[0]

        let response = {...userInfo}
        res.status(200).send(response)
    }, 

    getPostsOnCurrentPage: async (req, res) => {
        const db = req.app.get('db') 
        const {pageid} = req.params; 
        
        let postsOnCurrentPage = await db.get_posts_on_current_page({pageid}) 
        
        let response = [...postsOnCurrentPage] 
        res.status(200).send(response)
    },

    editIndividualPost: async (req, res) => {
        const db = req.app.get('db')
        const {postid} = req.params
        const {pageId, date, body} = req.body

        let editedIndividualPost = await db.edit_individual_post({postid: postid, pageId: pageId, date: date, body: body})
        editedIndividualPost = editedIndividualPost[0]

        res.status(200).send(editedIndividualPost)
    },

    updateUserInfo: async (req, res) => {
        const db = req.app.get('db')
        const {username} = req.params
        const {profilePic, email, firstname, lastname} = req.body
        
        let updatedUserInfo = await db.update_user_info({username, profilePic, email, firstname, lastname})
        updatedUserInfo = updatedUserInfo[0] 

        res.status(200).send(updatedUserInfo)
    }, 

    createNewPost: async (req, res) => {
        const db = req.app.get('db') 
        const {personid, pageid} = req.params 
        const {date, body} = req.body 
        let newPost = await db.create_new_post({personid, pageid, date, body}) 
        newPost = newPost[0]
        
        res.status(200).send(newPost)
        // res.sendStatus(200)
    }
}
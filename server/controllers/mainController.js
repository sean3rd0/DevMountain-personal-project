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
        console.log("HOWHOWHOWHOWHOWHOWHOWHOWHOWHOWHWOHWOHWOWHOWHOWHOWHOWHOWHOWHOWHOWHOWHOWHOWHWOHOWHOWHOWHOWHOWHOWHOWHWOHWOHWOHWOHWOHWHOOHWOWHOWHHOWHWOHOWOHOWHOHWOWHHOWHOWOHOWHOWHOWHOHOWWHWHWOWOHWOWHOWOOWHOWHOWOOWHOHWOHOWHOHWO")
        const db = req.app.get('db') 
        const {pageid} = req.params; 
        console.log('this is the pageid, which is from the req.params: ', pageid)

        let postsOnCurrentPage = await db.get_posts_on_current_page({pageid}) 
        
        console.log('POSTSONCURRENTPAGE: ', postsOnCurrentPage)
        let response = [...postsOnCurrentPage] 
        console.log('RESPONSE: ', response)
        res.status(200).send(response)
    },

    updateUserInfo: async (req, res) => {
        const db = req.app.get('db')
        const {username} = req.params
        const {profilePic, email, firstname, lastname} = req.body
        console.log('info being sent to db: ', username, profilePic, email, firstname, lastname)

        let updatedUserInfo = await db.update_user_info({username, profilePic, email, firstname, lastname})
        updatedUserInfo = updatedUserInfo[0] 

        res.status(200).send(updatedUserInfo)
    }, 

    createNewPost: async (req, res) => {
        const db = req.app.get('db') 
        const {personid, pageid} = req.params 
        const {date, body} = req.body 
        console.log('personid, pageid, date, body: ', personid, pageid, date, body)
        let newPost = await db.create_new_post({personid, pageid, date, body}) 
        newPost = newPost[0]
        console.log('newPost: ', newPost)

        res.status(200).send(newPost)
        // res.sendStatus(200)
    }
}
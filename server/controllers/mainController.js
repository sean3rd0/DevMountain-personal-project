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
        const {username} = req.params 
        const {date, body} = req.body 
        console.log('username date body: ', username, date, body)

        let newPost = await db.create_new_post({username, date, body}) 
        newPost = newPost[0]
        console.log('NEWPOST: ', newPost)

        res.status(200).send(newPost)
    }
}
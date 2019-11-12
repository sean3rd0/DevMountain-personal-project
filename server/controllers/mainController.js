module.exports = {
    getCurrentPage: async (req, res) => {
        const db = req.app.get('db')
        const {username} = req.params
        
        let landingPage = await db.get_landing_page(username)
        landingPage = landingPage[0]

        res.status(200).send(landingPage)
    }, 

    updateUserInfo: (req, res) => {
        const db = req.app.get('db')
        const {username} = req.params
    }
}
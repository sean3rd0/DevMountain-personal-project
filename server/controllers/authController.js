const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        
        let getUserInfo = await db.get_user_info(username); 
        getUserInfo = getUserInfo[0]
        
        if (!getUserInfo){
            res.status(401).send('There is no account with this username. Are you sure you typed it in correctly? If you did, and you are still receiving this error message, please create an account :)')
        } 

        let getLandingPage = await db.get_landing_page(username)
        getLandingPage = getLandingPage[0]
                
        const authenticated = bcrypt.compareSync(password, getUserInfo.password)
    
        if(authenticated){
            delete getUserInfo.password
            req.session.user = {...getUserInfo, ...getLandingPage};//creating a user property on our session equal to getUserInfo^
            res.status(202).send(req.session.user);
        } else {
            res.status(401).send('Password is incorrect')
        }
    }, 

    createAccount: async (req, res) => {
        const db = req.app.get('db')

        /* Destructuring username, password, and confirmPassword off of the req.body, 
        which was sent from the CreateAccount.js component's state values. */
        const {username, password, confirmPassword} = req.body 

        // Now we send the submitted username to the database to check if it's already taken.  
        let usernameExists = await db.check_username(username) 
        
        //Our database requests come back as an object inside of an array. So, we'll grab the first item in the array. 
        usernameExists = usernameExists[0] 

        if (usernameExists){ /* If ANYTHING was returned from our db request, we know that the username has already been taken... 
            otherwise the db would've had nothing to select because there was no row that matched the username parameter we gave it. 
            We would've received back an array with an object in it, which is truthy. 
            So if we receive back an EMPTY array, which is falsy, we can respond with the following status code and message. */
            res.status(409).send("Someone is already using this username. If it's you, click login instead :)")
        } else {
            if ( password === confirmPassword ) { // If their password and confirmPassword matched each other, then perform the following code: 

                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                let newlyCreatedAccount = await db.create_account({username: username, password: hash}); // Send an object with this db request containing username and password properties. 
                newlyCreatedAccount = newlyCreatedAccount[0]; //again, access the first (and only) object in the returned array. (see line 14)

                let usersFirstPage = await db.create_page({
                    personId: newlyCreatedAccount.person_id, 
                    pageTitle: 'LandingPage'
                }); 
                usersFirstPage = usersFirstPage[0]; // (see lines 14 and 29)

                // console.log('this is usersFirstPage:', usersFirstPage)

                req.session.user = {...newlyCreatedAccount, ...usersFirstPage} // Now we create a user object on our req.session. Uncomment the line below to see that object.
                console.log('this is the req.session.user: ', req.session.user)
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send(`The passwords didn't match; please type them in again.`)
            }
        }
    }, 

    logout: (req, res) => {
        req.session.destroy(); 
        res.status(200).send('The user has now been logged out. ')
    }
}
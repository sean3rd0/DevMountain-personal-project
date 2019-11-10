import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {loginUser} from "../redux/reducer"

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            usernameInput: "", 
            passwordInput: ""
        }
    }
    
    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleLoginButtonClick(username, password){
        axios.post('/api/login', {username: `${username}`, password: `${password}`})
        .then(response => {
            console.log('this is the response.data from axios.post to /api/login in the Login component: ', response.data)
            this.setState({
                usernameInput: "", 
                passwordInput: ""
            })
            this.props.loginUser(response.data)
            this.props.history.push('/pages')
        })
    }
    
    render(){
        console.log(this.state)
        return(
            <div className="login-component-wrapping-div">
                <div className="login-component-input-container">
                    <input 
                        name="usernameInput"
                        onChange={event => this.handleInputChange(event)}
                        placeholder="JaneDoe1492"
                    />
                    <input 
                        name="passwordInput"
                        onChange={event => this.handleInputChange(event)}
                        placeholder="3x@mplPassw0rd"
                        type="password"
                    />
                </div>
                <div>
                    <button
                        onClick={() => this.handleLoginButtonClick(this.state.usernameInput, this.state.passwordInput)}
                    >Login</button>
                </div>
                <Link to="/createaccount">Create Account</Link>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const {user, following, currentPage, postsOnCurrentPage} = reduxState;
    return {
        user, 
        following, 
        currentPage, 
        postsOnCurrentPage
    }
}

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
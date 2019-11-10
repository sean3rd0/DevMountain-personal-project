import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {loginUser} from "../redux/reducer"

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "", 
            password: ""
        }
    }

    render(){
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
                    />
                </div>
                <div>
                    <button
                        onClick={this.handleLogin}
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
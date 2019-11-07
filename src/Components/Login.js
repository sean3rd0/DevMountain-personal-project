import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import userReducer from "../redux/userReducer"

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
    const {users, following, currentPage, postsOnCurrentPage} = reduxState;

    return {
        users, 
        following, 
        currentPage, 
        postsOnCurrentPage
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, {/*functions dispatched to props from userReducer*/})(Login)
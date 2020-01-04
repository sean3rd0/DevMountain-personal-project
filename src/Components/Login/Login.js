import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import "./Login.css"
import {loginUser} from "../../redux/reducer"

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
            console.log('this is the password: ', password)
            this.setState({
                usernameInput: "", 
                passwordInput: ""
            })
            this.props.loginUser(response.data)
            this.props.history.push(`/pages/${response.data.username}`)
        })
        .catch(err => console.log('this is the login error that came instead of a response: ', err))
    }
    
    render(){
        return(
            <div className="login-component-wrapping-div">
                <div className="input-container">
                    <input 
                        className="inputs"
                        name="usernameInput"
                        onChange={event => this.handleInputChange(event)}
                        placeholder="JaneDoe1492"
                    />
                    <input 
                        className="inputs"
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

// const mapStateToProps = (reduxState) => {
//     const {user, following, currentPage, postsOnCurrentPage} = reduxState;
//     return {
//         user, 
//         following, 
//         currentPage, 
//         postsOnCurrentPage
//     }
// }

const mapDispatchToProps = {
    loginUser
}

export default connect(/*mapStateToProps*/null, mapDispatchToProps)(Login)
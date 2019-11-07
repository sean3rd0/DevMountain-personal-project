import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import userReducer from "../redux/userReducer"

class CreateAccount extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            usernameInput: "", 
            passwordInput: "", 
            confirmPasswordInput: ""
        }
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateButtonClick(username, password, confirmPassword){
        axios.post('/api/createaccount', {username, password, confirmPassword})
        .then(response => {
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            })
            this.props.updateUser(response.data)
            // this.props.history.push('/')
        })
    }

    render(){
        const {usernameInput, passwordInput, confirmPasswordInput} = this.state
        return(
            <div className="createaccount-component-wrapping-div">
                <div className="createaccount-component-input-container">
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
                <input 
                    name="confirmPasswordInput"
                    onChange={event => this.handleInputChange(event)}
                    placeholder="3x@mplPassw0rd"
                />
                </div>
                <button
                    onClick={this.handleCreateButtonClick(usernameInput, passwordInput, confirmPasswordInput)}
                >Create</button>
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

export default connect(mapStateToProps, {/*functions dispatched to props from userReducer*/})(CreateAccount)
import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {createUser} from "../redux/reducer"

class CreateAccount extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            usernameInput: "", 
            passwordInput: "", 
            confirmPasswordInput: ""
        }
    }

    /* When they type in any of the input box, 
    the property on the local state^ is changed accordingly by this function. */
    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /* When they click the "Create" button, it fires this function, 
    which sends the values on state in the body of an axios.post request to create a new account. */
    handleCreateButtonClick(username, password, confirmPassword){
        axios.post('/api/createaccount', {username, password, confirmPassword})
        .then(response => {
            console.log('this is the response.data from axios.post request to /api/createaccount in the CreateAccount component: ', response.data)
            this.setState({
                usernameInput: "", 
                passwordInput: "", 
                confirmPasswordInput: ""
            })
            this.props.createUser(response.data)
            this.props.history.push('/pages')
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
                    type="password"
                />
                <input 
                    name="confirmPasswordInput"
                    onChange={event => this.handleInputChange(event)}
                    placeholder="3x@mplPassw0rd"
                    type="password"
                />
                </div>
                <button
                    onClick={() => this.handleCreateButtonClick(usernameInput, passwordInput, confirmPasswordInput)}
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
    createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
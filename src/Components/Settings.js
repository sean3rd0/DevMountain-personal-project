import React from "react" 
import UsernameDisplay from "./UsernameDisplay"
import {connect} from "react-redux"
import {updateUserInfo} from "../redux/reducer"

class Settings extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false, 
            profilePicInput: "", 
            emailInput: "", 
            firstnameInput: "", 
            lastnameInput: ""
        }
    }
    
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEditSaveToggle = () => {
        this.setState({
            editing: (!this.state.editing)
        })
    }

    handleSaveButtonClick = (profilePic, email, firstname, lastname) => {
        this.props.updateUserInfo({profilePic, email, firstname, lastname})
        this.setState({
            profilePicInput: "", 
            emailInput: "", 
            firstnameInput: "", 
            lastnameInput: ""
        })
        this.handleEditSaveToggle()
    }

    handleMyProfilePicClick = () => {
        this.props.history.push(`/pages/${this.props.username}`)
    }

    render(){
        if (this.state.editing === false) {
            return(
                <div className="Settings-component-wrapping-div">
                    <div>
                        <div>
                            <h3>Settings</h3>
                        </div>
                        <div 
                            className="Settings-component-profile-pic-container"
                            onClick={this.handleMyProfilePicClick}
                        >
                            <img 
                                src={this.props.profilePic}
                                alt="Profile picture"//What am I supposed to put here?
                                //I know that at least I need to mapStateToProps and have access to the user part of state. Or the user on Session. 
                            />
                        </div>
                        <h4>Username: {this.props.username}</h4>
                        <h5>First Name: {this.props.firstname}</h5>
                        <h5>Last Name: {this.props.lastname}</h5>
                        <h5>Email: {this.props.email}</h5>
                    </div>
                    <button onClick={this.handleEditSaveToggle}>Edit</button>
                </div>
            )
        } else {
            return (
                <div className="Settings-component-wrapping-div">
                    <div>
                        <div>
                            <h3>Settings</h3>
                        </div>
                        <div 
                            className="Settings-component-profile-pic-container"
                        >
                            <input
                                name="profilePicInput"
                                placeholder="Profile Pic url"
                                onChange={event => this.handleInputChange(event)}
                            />
                        </div>
                        <input 
                            name="emailInput"
                            placeholder="Email"
                            onChange={event => this.handleInputChange(event)}
                        />
                        <input 
                            name="firstnameInput"
                            placeholder="First Name"
                            onChange={event => this.handleInputChange(event)}
                        />
                        <input 
                            name="lastnameInput"
                            placeholder="Last Name"
                            onChange={event => this.handleInputChange(event)}
                        />
                    </div>
                    <button onClick={() => this.handleSaveButtonClick(this.state.profilePicInput, this.state.emailInput, this.state.firstnameInput, this.state.lastnameInput)}>Save</button>
                </div>
            )
        }
    }
}

const mapStateToProps = (reduxState) => {
    const {personId, email, username, firstname, lastname,} = reduxState.reducer.user
    const {pageId, pageTitle} = reduxState.reducer.currentPage
    return {
        personId, 
        email, 
        username, 
        firstname, 
        lastname, 
        pageId, 
        pageTitle
    }
}

const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
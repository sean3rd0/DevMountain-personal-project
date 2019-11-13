import React from "react" 
import style from "styled-components"
import UsernameDisplay from "./UsernameDisplay"
import {connect} from "react-redux"
import {updateUserInfo, getCurrentPage} from "../redux/reducer"
import axios from "axios";

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

    componentDidMount = () => {
        axios.get(`/api/currentpage/${this.props.match.params.username}`)
        .then(response => {
            this.props.getCurrentPage(response.data)
        })
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
        axios.put(`/api/userinfo/${this.props.match.params.username}`, {profilePic, email, firstname, lastname})
        .then(response => {
            console.log('this is the Settings handleSaveButtonClick response.data: ', response.data)
            this.props.updateUserInfo(response.data)
            this.setState({
                profilePicInput: "", 
                emailInput: "", 
                firstnameInput: "", 
                lastnameInput: ""
            })
        })
        this.handleEditSaveToggle()
    }

    handleMyProfilePicClick = () => {
        this.props.history.push(`/pages/${this.props.username}`)
    }

    handleDelete = () => {
        axios.delete(`/api/${this.props.match.params.username}/delete`)
        .then(response => {
            alert('This account has been deleted. Goodbye.')
            setTimeout(() => this.props.history.push(`/`), 2000)
        })
    }

    render(){
        const EditAndDeleteDiv = style.div`
            display: flex; 
            flex-direction: column; 
            justify-content: space-between;
            align-items: center;
            height: 56px; 
        `
        const EditAndDeleteButtons = style.button`
            width: 50px; 
        `

        const ProfilePictureImgCircle = style.img`
            height: 70px; 
            width: 70px; 
            border-radius: 50%; 
        `
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
                            <ProfilePictureImgCircle 
                                src={`${this.props.profilePic}`}
                                alt="Profile picture"
                            />
                        </div>
                        <h4>Username: {this.props.username}</h4>
                        <h5>First Name: {this.props.firstname}</h5>
                        <h5>Last Name: {this.props.lastname}</h5>
                        <h5>Email: {this.props.email}</h5>
                    </div>
                    <EditAndDeleteDiv>
                        <EditAndDeleteButtons onClick={this.handleEditSaveToggle}>Edit</EditAndDeleteButtons>
                        <EditAndDeleteButtons onClick={this.handleDelete}>Delete</EditAndDeleteButtons>
                    </EditAndDeleteDiv>
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
    const {personId, email, username, firstname, lastname, profilePic} = reduxState.reducer.user
    const {pageId, pageTitle} = reduxState.reducer.currentPage
    return {
        personId, 
        email, 
        username, 
        firstname, 
        lastname, 
        profilePic,
        pageId, 
        pageTitle
    }
}

const mapDispatchToProps = {
    getCurrentPage, 
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
import React from "react" 
import {connect} from "react-redux"
import style from "styled-components"

class ProfilePageIndividualPost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false, 
            editDateInput: "", 
            editBodyTextArea: ""
        }
    }

    handleEdit = () => {
        this.setState({
            editing: true
        })
    } 

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSave = (postId, pageId, editDateInput, editBodyTextArea) => {
        this.props.handleEditedPostSave(postId, pageId, editDateInput, editBodyTextArea)
        this.setState({
            editing: false
        })
    } 

    render(){
        const ProfilePageComponentWrappingDiv = style.div`
            box-sizing: border-box; 
            border: 2px solid rgba(65, 65, 65, 0.1);
            padding: 20px 5px; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center; 
        `
        const DateDisplay = style.h5`
            height: 1px; 
        `
        const ProfilePageComponentButtonWrappingDiv = style.div`
            display: flex; 
            flex-direction: row; 
            box-sizing: border-box; 
            padding: 14px; 
            width: 175px; 
            justify-content: space-evenly; 
        `
        // const ProfilePageComponentButtons = style.button`

        // `
        if (this.state.editing) {
            return (
                <ProfilePageComponentWrappingDiv className="Edit-ProfilePageIndividualPost-component-wrapping-div">
                    <div>
                        <input
                            name="editDateInput"
                            onChange={event => this.handleInputChange(event)}
                            placeholder={this.props.date}
                        />
                    </div>
                    <div>
                        <input
                            name="editBodyTextArea"
                            onChange={event => this.handleInputChange(event)}
                            placeholder={this.props.body}
                        />
                    </div>
                    <ProfilePageComponentButtonWrappingDiv>
                        <button 
                            className="individual-post-button" 
                            onClick={() => this.handleSave(this.props.postId, this.props.pageId, this.state.editDateInput, this.state.editBodyTextArea)}
                        >Save</button>
                        <button 
                            className="individual-post-button" 
                            onClick={() => this.props.handleDelete(this.props.pageId, this.props.postId)}
                        >Delete</button>
                    </ProfilePageComponentButtonWrappingDiv>
                </ProfilePageComponentWrappingDiv>
            )
        } else { 
            return(
                <ProfilePageComponentWrappingDiv className="ProfilePageIndividualPost-component-wrapping-div">
                    <div>
                        <DateDisplay>{this.props.date}</DateDisplay>
                    </div>
                    <div>
                        <p>{this.props.body}</p>
                    </div>
                    <ProfilePageComponentButtonWrappingDiv>
                        <button 
                            className="individual-post-button"
                            onClick={this.handleEdit}
                        >Edit</button>
                        <button 
                            className="individual-post-button" 
                            onClick={() => this.props.handleDelete(this.props.pageId, this.props.postId)}
                        >Delete</button>
                    </ProfilePageComponentButtonWrappingDiv>
                </ProfilePageComponentWrappingDiv>
            )
        }
    }
}

export default connect()(ProfilePageIndividualPost)
import React from "react" 
import axios from "axios"
import {connect} from "react-redux"

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
        if (this.state.editing) {
            return (
                <div className="Edit-ProfilePageIndividualPost-component-wrapping-div">
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
                    <div>
                        <button 
                            onClick={() => this.handleSave(this.props.postId, this.props.pageId, this.state.editDateInput, this.state.editBodyTextArea)}
                        >Save</button>
                        <button 
                            onClick={() => this.props.handleDelete(this.props.pageId, this.props.postId)}
                        >Delete</button>
                    </div>
                </div>
            )
        } else { 
            return(
                <div className="ProfilePageIndividualPost-component-wrapping-div">
                    <div>
                        <h5>{this.props.date}</h5>
                    </div>
                    <div>
                        <p>{this.props.body}</p>
                    </div>
                    <div>
                        <button
                            onClick={this.handleEdit}
                        >Edit</button>
                        <button 
                            onClick={() => this.props.handleDelete(this.props.pageId, this.props.postId)}
                        >Delete</button>
                    </div>
                </div>
            )
        }
    }
}

export default connect()(ProfilePageIndividualPost)
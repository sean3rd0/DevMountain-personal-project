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

    handleSave = (editDateInput, editBodyTextArea) => {
        console.log('this is this.props: ', this.props)
        axios.put(`/api/posts/${this.props.postId}`, {pageId: this.props.pageId, date: editDateInput, body: editBodyTextArea})
        .then(response => {
            console.log('this is PPIP handleSave response.data: ', response.data)
            this.props.editIndividualPost(response.data)
        })
        .then(response => {
            this.setState({
                editing: false
            })
        })
    } 

    handleDelete = () => {
        alert('You need to finish writing the ProfilePageIndividualPost handleDelete fucntion. ')
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
                            onClick={() => this.handleSave(this.state.editDateInput, this.state.editBodyTextArea)}
                        >Save</button>
                        <button 
                            onClick={this.handleDelete}
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
                            onClick={this.handleDelete}
                        >Delete</button>
                    </div>
                </div>
            )
        }
    }
}

export default (ProfilePageIndividualPost)
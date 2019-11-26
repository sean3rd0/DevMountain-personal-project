import React from "react" 

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
        alert('You need to finish writing the ProfilePageIndividualPost handleSave fucntion. ')
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

export default ProfilePageIndividualPost
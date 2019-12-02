import React from "react" 
import axios from "axios"
import style from "styled-components"

class ProfilePagePostTemplate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dateInput: "", 
            bodyTextarea: ""
        }
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleNewPostSubmit = (dateInput, bodyTextarea) => {
        this.props.handleNewPostSubmit(dateInput, bodyTextarea)
        this.setState({
            dateInput: "", 
            bodyTextarea: ""
        })
    }

    render(){
        return(
            <div className="ProfilePagePostTemplate-component-wrapping-div">
                <div>
                    <input 
                        value={this.state.dateInput}
                        name="dateInput"
                        placeholder="dd/mm/yyyy"
                        onChange={event => this.handleChange(event)}
                    />
                </div>
                <div>
                    <textarea 
                        value={this.state.bodyTextarea}
                        name="bodyTextarea"
                        placeholder="What do you want to remember from today?"
                        onChange={event => this.handleChange(event)}
                    /> 
                </div>
                <button onClick={() => this.handleNewPostSubmit(this.state.dateInput, this.state.bodyTextarea)}
                >Save</button>
            </div>
        )
    }
}


export default ProfilePagePostTemplate
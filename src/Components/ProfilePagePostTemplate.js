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

    render(){
        return(
            <div className="ProfilePagePostTemplate-component-wrapping-div">
                <div>
                    <input 
                        name="dateInput"
                        placeholder="dd/mm/yyyy"
                        onChange={event => this.handleChange(event)}
                    />
                </div>
                <div>
                    <textarea 
                        name="bodyTextarea"
                        placeholder="What do you want to remember from today?"
                        onChange={event => this.handleChange(event)}
                    /> 
                </div>
                <button onClick={() => this.props.handleNewPostSubmit(this.state.dateInput, this.state.bodyTextarea)}
                >Save</button>
            </div>
        )
    }
}


export default ProfilePagePostTemplate
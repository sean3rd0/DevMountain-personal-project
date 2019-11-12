import React from "react" 
import axios from "axios"
import {connect} from "react-redux"

class UsernameDisplay extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="UsernameDisplay-component-wrapping-div">
                <img 
                    src={this.props.profilePic} 
                    alt="Profile Picture"
                    //onClick edit?
                ></img>
                <h3>{this.props.username}</h3>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        profilePic: reduxState.reducer.user.profilePic,
        username: reduxState.reducer.user.username
    }
} 

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernameDisplay)
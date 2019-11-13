import React from "react" 

class ProfilePageIndividualPost extends React.Component {
    render(){
        return(
            <div className="ProfilePageIndividualPost-component-wrapping-div">
                <div>
                    <h5>{this.props.date}</h5>
                </div>
                <div>
                    <p>{this.props.body}</p>
                </div>
            </div>
        )
    }
}

export default ProfilePageIndividualPost
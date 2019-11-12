import React from "react" 
import {Link} from "react-router-dom"
import axios from "axios";
import {connect} from "react-redux"


class Nav extends React.Component {
    constructor(props){
        super(props)
    }

    // handleLogoutButtonClick = () => {
    //     axios.post('/api/logout')
    //     .then(res => {
    //         this.props.logoutUser()
    //         this.props.history.push('/')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }
    //PUT THIS^ IN OTHER COMPONENTS, BECAUSE NAVE IS A CHILD OF OTHER COMPONENTS, 
    // SO, WHEN YOU DO THIS.PROPS.HISTORY.PUSH, 
    //YOU WANT TO BE PUSHING THE PARENT COMPONENT THAT'S BEING VIEWED, NOT JUST THE NAV COMPONENT.

    render(){
        console.log('this is the Nav component this.props: ', this.props)
        return(
            <div className="Nav-component-wrapping-div">
                <Link to="/friends"><div className="Nav-component-friends-button">Friends</div></Link>
                <div>
                    <div className="Nav-component-profile-pic-container">
                        <img 
                            src={this.props.profilePic} 
                            alt="Profile Picture"
                        />
                    </div>
                    <div>
                        <button onClick={this.props.handleLogoutButtonClick}>Logout</button>
                        <button onClick={this.props.handleSettingsButtonClick}>Settings</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        profilePic: reduxState.reducer.user.profilePic
    }
}

export default connect(mapStateToProps)(Nav)
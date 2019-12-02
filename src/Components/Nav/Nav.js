import React from "react" 
import styled from "styled-components"
import {Link} from "react-router-dom"
import axios from "axios";
import {connect} from "react-redux"
import "./Nav.css"


class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showMenu: false
        }
    }

    menuToggle = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
        console.log('this is this.state.showMenu: ', this.state.showMenu)
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
    //PUT THIS^ IN OTHER COMPONENTS, BECAUSE NAV IS A CHILD OF OTHER COMPONENTS, 
    // SO, WHEN YOU DO THIS.PROPS.HISTORY.PUSH, 
    //YOU WANT TO BE PUSHING THE PARENT COMPONENT THAT'S BEING VIEWED, NOT JUST THE NAV COMPONENT.

    render(){
        const NavComponent = styled.div`
            height: 80px;
            display: flex; 
            align-items: center;
            justify-content: space-between; 
            padding: 0 2.5vw;
        ` 
        const ProfilePicAndMenu = styled.div`
            display: flex; 
            width: 50%; 
            height: 100%;
            align-items: center;
            justify-content: space-between;
        `
        // const NavMenuItems = styled.div`
        //     height: 100%;
        //     display: flex; 
        //     flex-direction: column; 
        //     align-items: center; 
        //     justify-content: space-evenly; 
        // `

        const NavProfilePictureSide = styled.div`
            display: flex; 
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
        `

        const ProfilePictureCircle = styled.img`
            background: gray; 
            border-radius: 50%;
            height: 70px; 
            width: 70px;
        `

        const HamburgerMenuItems = styled.button`
            width: 60px;
        `

        return(
            <NavComponent className="Nav-component-wrapping-div">
                <Link to="/friends"><div className="Nav-component-friends-button">Friends</div></Link>
                <ProfilePicAndMenu>
                    <NavProfilePictureSide className="Nav-component-profile-pic-container">
                        <ProfilePictureCircle 
                            src={this.props.profilePic}
                            alt="Profile Picture"
                            width="60"
                            height="60"
                        />
                    </NavProfilePictureSide>
                    <div className="navbar-menu">
                        <button className="navbar-buttons" onClick={this.props.handleSettingsButtonClick}>Settings</button>
                        <button className="navbar-buttons" onClick={this.props.handleLogoutButtonClick}>Logout</button>
                    </div>
                        <div className="navbar-icon" onClick={this.menuToggle}>
                            &#9776;
                        </div>
                    <div className={
                        this.state.showMenu ? 
                        'menu slide' 
                        : 
                        'menu'
                    }>
                        <HamburgerMenuItems onClick={this.props.handleSettingsButtonClick}>Settings</HamburgerMenuItems>
                        <HamburgerMenuItems onClick={this.props.handleLogoutButtonClick}>Logout</HamburgerMenuItems>
                    </div>       
                </ProfilePicAndMenu>
            </NavComponent>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        profilePic: reduxState.reducer.user.profilePic
    }
}

export default connect(mapStateToProps)(Nav)
import React from "react"
import axios from "axios"
import Nav from "./Nav"
import UsernameDisplay from "./UsernameDisplay" 
import ProfilePagesDisplay from "./ProfilePagesDisplay"
import ProfilePagePostTemplate from "./ProfilePagePostTemplate"
import ProfilePageIndividualPost from "./ProfilePageIndividualPost"
import createPostOnThisPage from "../redux/reducer"
import editThisPostOnThisPage from "../redux/reducer"
import {connect} from "react-redux"
import {logoutUser} from "../redux/reducer"

class CurrentlyViewedProfilePage extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        axios.get(`/api/currentpage/${this.props.match.params.username}`)
        .then(response => {
            this.props.getCurrentPage(response.data)
        })
    }

    handleLogoutButtonClick = () => {
        // console.log('this is the this.props on Nav.js: ', this.props)
        axios.post('/api/logout')
        .then(res => {
            this.props.logoutUser()
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleSettingsButtonClick = () => {
        this.props.history.push('/settings')
    }

    render(){
        console.log('this is the CVPP component this.props', this.props)
        let mapOfPostsOnCurrentPage = this.props.postsOnCurrentPage.map((individualPost) => {
            console.log('this is this.props.postsOnCurrentPage: ', this.props.postsOnCurrentPage)
            console.log('this is the map of this.props.postsOnCurrentPage: ', mapOfPostsOnCurrentPage)
            console.log('this is what happens for each iteration: ', individualPost)
            return (
                <ProfilePageIndividualPost 
                key={individualPost.postId}
                postId={individualPost.postId}
                pageId={individualPost.pageId}
                postText={individualPost.postText}
                photo1={individualPost.photo1}
                video1={individualPost.video1}
                />
                )
            });

        if (this.props.postsOnCurrentPage.length > 0 && this.props.currentPage.personId === this.props.user.personId){
            
            /* if there are posts on this page, and the user on session is the owner of this page, 
            include a map of the posts on this page, and the ProfilePagePostTemplate component so they can post to their page. */
            return (
                <div className="CurrentlyViewedProfilePage-component-wrapping-div">
                    <Nav 
                        handleLogoutButtonClick={this.handleLogoutButtonClick} 
                        handleSettingsButtonClick={this.handleSettingsButtonClick}
                        
                    />
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay />
                    <ProfilePagePostTemplate /> 
                    {mapOfPostsOnCurrentPage}
                </div>
            )
        } else if (this.props.postsOnCurrentPage.length > 0 && this.props.currentPage.personId !== this.props.user.personId){
            /* else, if there are posts on this page, but the user on session is NOT the owner of this page, 
            include a map of the posts on this page, but don't include the ProfilePagePostTemplate. */
            return (
                <div className="CurrentlyViewedProfilePage-component-wrapping-div">
                    <Nav 
                        handleLogoutButtonClick={this.handleLogoutButtonClick} 
                        handleSettingsButtonClick={this.handleSettingsButtonClick}
                    />
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay />
                    {mapOfPostsOnCurrentPage} 
                </div>
            )
        } else if (this.props.postsOnCurrentPage.length = 0 && this.props.currentPage.personId === this.props.user.personId){
            /* else, if this page DOES NOT have posts, but the user on session is the owner of this page, 
            DON'T INCLUDE a map of posts on this page (because there are no posts to map over), 
            BUT DO INCLUDE the ProfilePagePostTemplate component so they can post to their page. */
            return (
                <div className="CurrentlyViewedProfilePage-component-wrapping-div">
                    <Nav 
                        handleLogoutButtonClick={this.handleLogoutButtonClick} 
                        handleSettingsButtonClick={this.handleSettingsButtonClick}
                    />
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay />
                    <ProfilePagePostTemplate /> 
                </div>
            )
        } else if (this.props.postsOnCurrentPage.length = 0 && this.props.currentPage.personId !== this.props.user.personId){
            /* else, if this page DOES NOT have posts, AND the user on session IS NOT the owner of this page, 
            DON'T INCLUDE a map of posts on this page (because there are no posts to map over), 
            AND DON'T INCLUDE the ProfilePagePostTemplate component so they can post to their page. */
            return (
                <div className="CurrentlyViewedProfilePage-component-wrapping-div">
                    <Nav 
                        handleLogoutButtonClick={this.handleLogoutButtonClick} 
                        handleSettingsButtonClick={this.handleSettingsButtonClick}
                    />
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay /> 
                </div>
            )
        } else {
            // console.log('this is the this.props on the CurrentlyViewedProfilePage: ', this.props)
            return (
                <div>
                    <Nav 
                        handleLogoutButtonClick={this.handleLogoutButtonClick} 
                        handleSettingsButtonClick={this.handleSettingsButtonClick}
                    />
                    <UsernameDisplay />
                    <ProfilePagesDisplay />
                    <ProfilePagePostTemplate />
                    {mapOfPostsOnCurrentPage} 
                    <div>o</div>
                    <div>o</div>
                    <div>o</div>
                    <div>This is the CurrentlyViewedProfilePage, and none of the if statements matched... so I assume nobody is logged in? Idk why this would show up.</div>
                </div>
            )
        }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.reducer.user,
        currentPage: reduxState.reducer.currentPage, 
        postsOnCurrentPage: reduxState.reducer.postsOnCurrentPage
    }
} 

const mapDispatchToProps = {
    createPostOnThisPage,
    editThisPostOnThisPage, 
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentlyViewedProfilePage)
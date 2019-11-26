import React from "react"
import axios from "axios"
import Nav from "./Nav/Nav"
import UsernameDisplay from "./UsernameDisplay" 
import ProfilePagesDisplay from "./ProfilePagesDisplay"
import ProfilePagePostTemplate from "./ProfilePagePostTemplate"
import ProfilePageIndividualPost from "./ProfilePageIndividualPost"
import {connect} from "react-redux"
// import {createPostOnThisPage} from "../redux/reducer"
// import {editThisPostOnThisPage} from "../redux/reducer"
import {logoutUser, getCurrentPage, getPostsOnCurrentPage, createNewPost} from "../redux/reducer"

class CurrentlyViewedProfilePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        axios.get(`/api/currentpage/${this.props.match.params.username}`)
        .then(response => {
            this.props.getCurrentPage(response.data)
            console.log('this is response.data: ', response.data)
            axios.get(`/api/${response.data.person_id}/${response.data.page_id}/posts`)
            .then(responseTwo => {
            console.log('this is responseTwo.data: ', responseTwo.data)
                this.props.getPostsOnCurrentPage(responseTwo.data)
            })
            .catch(err => console.log('this is the componentDidMount error from the INNER axios request: ', err))
        })
        // .then(() => {
        //     this.props.postsOnCurrentPage.map
        // })
        .catch(err => console.log('this is the componentDidMount error from the OUTER axios request: ', err))
    }

    handleLogoutButtonClick = () => {
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
        this.props.history.push(`/${this.props.match.params.username}/settings`)
    }

    handleNewPostSubmit = (dateInput, bodyTextarea) => {
        axios.post(`/api/${this.props.currentPage.personId}/${this.props.currentPage.pageid}/posts`, {date: dateInput, body: bodyTextarea})
        .then(response => {
            this.props.createNewPost({date: response.data.date, body: response.data.post_text})
        })
        .catch(err => {
            console.log('This is the error that came back from the CVPP handleNewPostSubmit function / axios request: ', err)
        })
    }

    render(){
        console.log('these are the redux state props, consisting of postsOnCurrentPage: ', this.props.postsOnCurrentPage)
        let mapOfPostsOnCurrentPage = this.props.postsOnCurrentPage.map((individualPost, index) => {
            return (
                // individualPost.map((e, i) => {
                //     <div>{i}</div>
                // })
                <ProfilePageIndividualPost 
                // key={individualPost.postId}
                key={index}
                postId={individualPost.postId}
                pageId={individualPost.pageId}
                date={individualPost.date}
                body={individualPost.post_text}
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
                    <div>Posts in array; page.personId === user.personId</div>
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay />
                    <ProfilePagePostTemplate 
                        handleNewPostSubmit={this.handleNewPostSubmit}
                    /> 
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
                    <div>Posts in array; page.personId !== user.personId</div>
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
                    <div>Posts not in array; page.personId === user.personId</div>
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay />
                    <ProfilePagePostTemplate  
                        handleNewPostSubmit={this.handleNewPostSubmit}
                    /> 
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
                    <div>Posts not in array; page.personId !== user.personId</div>
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay /> 
                </div>
            )
        } else {
            return (
                <div>
                    <Nav 
                        handleLogoutButtonClick={this.handleLogoutButtonClick} 
                        handleSettingsButtonClick={this.handleSettingsButtonClick}
                    />
                    <div>Else</div>                    
                    <UsernameDisplay /> 
                    <ProfilePagesDisplay />
                    <ProfilePagePostTemplate  
                        handleNewPostSubmit={this.handleNewPostSubmit}
                    /> 
                    {mapOfPostsOnCurrentPage}
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
    // createPostOnThisPage,
    // editThisPostOnThisPage, 
    logoutUser, 
    getCurrentPage, 
    getPostsOnCurrentPage, 
    createNewPost
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentlyViewedProfilePage)
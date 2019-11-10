import React from "react" 
import {Link} from "react-router-dom"


class Nav extends React.Component {
    render(){
        return(
            <div className="Nav-component-wrapping-div">
                <Link to="/friends"><div className="Nav-component-friends-button">Friends</div></Link>
                <div>Here would be a the req.session.user's face that they could click on to bring them to their own landing-page</div>
            </div>
        )
    }
}

export default Nav
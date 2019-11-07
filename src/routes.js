import React from "react" 
import {Switch, Route} from "react-router-dom"
import Login from "./Components/Login"
import CreateAccount from "./Components/CreateAccount"
// import CurrentlyViewedProfilePage from "./Components/CurrentlyViewedProfilePage"


export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/createaccount" component={CreateAccount} />
        {/* <Route  */}
    </Switch>
)
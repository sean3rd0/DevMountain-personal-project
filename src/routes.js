import React from "react" 
import {Switch, Route} from "react-router-dom"
import Login from "./Components/Login"
import CreateAccount from "./Components/CreateAccount"
import CurrentlyViewedProfilePage from "./Components/CurrentlyViewedProfilePage"
import UserList from "./Components/UserList"
import Settings from "./Components/Settings"


export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/pages/:username" component={CurrentlyViewedProfilePage} />
        <Route path="/friends" component={UserList} />
        <Route path="/settings" component={Settings} />
    </Switch>
)
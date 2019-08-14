import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Comprehensive from "../Components/Comprehensive";
import Study from "../Components/Study";
import Life from "../Components/Life";
import Technology from "../Components/Technology";
import Info from "./Info";
import Friends from "./Friends";
import Notification from "./Notification";

class UserRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/user" component={ () => <Redirect to="/user/comprehensive" /> } />
                <Route path="/user/comprehensive" component={ Comprehensive } />
                <Route path="/user/study" component={ Study } />
                <Route path="/user/life" component={ Life } />
                <Route path="/user/technology" component={ Technology }/>
                <Route path="/user/info" component={ Info } />
                <Route path="/user/friend" component={ Friends } />
                <Route path="/user/notification" component={ Notification } />
            </Switch>
        )
    }
}

export default UserRouter;
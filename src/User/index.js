import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import ShowBoard from "../Components/ShowBoard"
import Info from "./Info"
import Friends from "./Friends"
import Notification from "./Notification"
import ArticleCreate from "./ArticleCreate"
import ArticleProcess from "./ArticleProcess"

class UserRouter extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/user" component={ () => <Redirect to="/user/all" /> } />
                <Route path="/user/all" component={ ShowBoard } />
                <Route path="/user/comprehensive" component={ ShowBoard } />
                <Route path="/user/study" component={ ShowBoard } />
                <Route path="/user/life" component={ ShowBoard } />
                <Route path="/user/technology" component={ ShowBoard }/>
                <Route path="/user/info" component={ props => <Info {...props} getNewInfo={this.props.getNewInfo} /> } />
                <Route path="/user/friend" component={ Friends } />
                <Route path="/user/notification" component={ Notification } />
                <Route path="/user/articleCreate" component={ ArticleCreate } />
                <Route path="/user/articleProcess" component={ ArticleProcess } />
                <Route component={ () => <Redirect to="/user/all" /> } />
            </Switch>
        )
    }
}

export default UserRouter;
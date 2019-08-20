import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import ShowBoard from "../Components/ShowBoard"
import Info from "./Info"
import Friends from "./Friends"
import Notification from "./Notification"
import ArticleCreate from "./ArticleCreate"
import ArticleProcess from "./articleProcess"

class UserRouter extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/user" component={ () => <Redirect to="/user/all" /> } />
                <Route path="/user/all" component={ props => <ShowBoard {...props} articleType={ "all" } /> } />
                <Route path="/user/comprehensive" component={ props => <ShowBoard {...props} articleType={ "comprehensive" } /> } />
                <Route path="/user/study" component={ props => <ShowBoard {...props} articleType={ "study" } /> } />
                <Route path="/user/life" component={ props => <ShowBoard {...props} articleType={ "life" } /> } />
                <Route path="/user/technology" component={ props => <ShowBoard {...props} articleType={ "technology" } /> }/>
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
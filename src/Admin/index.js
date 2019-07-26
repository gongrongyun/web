import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Comperhensive from "../Components/Comprehensive";
import Study from "../Components/Study";
import Life from "../Components/Life";
import Technology from "../Components/Technology";


class AdminRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="admin/" component={ () => <Redirect to="admin/comperhensive" /> } />
                <Route path="admin/comprehensive" component={ Comperhensive } />
                <Route path="admin/study" component={ Study } />
                <Route path="admin/life" component={ Life } />
                <Route path="admin/technology" component={ Technology }/>
            </Switch>
        )
    }
}

export default AdminRouter;
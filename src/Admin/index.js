import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ShowBoard from "../Components/ShowBoard";


class AdminRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="admin/" component={ () => <Redirect to="admin/all" /> } />
                <Route path="admin/comprehensive" component={ ShowBoard } />
                <Route path="admin/study" component={ ShowBoard } />
                <Route path="admin/life" component={ ShowBoard } />
                <Route path="admin/technology" component={ ShowBoard }/>
                <Route path="admin/all" component={ ShowBoard } />
            </Switch>
        )
    }
}

export default AdminRouter;
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ShowBoard from "../Components/ShowBoard";

class TouristRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="tourist/" component={ () => <Redirect to="tourist/comprehensive" /> } />
                <Route path="tourist/comprehensive" component={ ShowBoard } />
                <Route path="tourist/study" component={ ShowBoard } />
                <Route path="tourist/life" component={ ShowBoard } />
                <Route path="tourist/technology" component={ ShowBoard }/>
                <Route path="tourist/all" component={ ShowBoard } />
            </Switch>
        )
    }
}

export default TouristRouter;
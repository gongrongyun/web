import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Comprehensive from "../Components/Comprehensive";
import Study from "../Components/Study";
import Life from "../Components/Life";
import Technology from "../Components/Technology";

class TouristRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="tourist/" component={ () => <Redirect to="tourist/comprehensive" /> } />
                <Route path="tourist/comprehensive" component={ Comprehensive } />
                <Route path="tourist/study" component={ Study } />
                <Route path="tourist/life" component={ Life } />
                <Route path="tourist/technology" component={ Technology }/>
            </Switch>
        )
    }
}

export default TouristRouter;
import React from "react";
import HeadMenu from "./HeadMenu";
import Footer from "./Footer";
import TouristRouter from "../Tourist";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";

class AppUnLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div style={{ width:"100%", height:"100vh" }}>
                    <Layout className="mainContainer">
                        <HeadMenu /> 
                        <Layout.Content>
                            <Switch>
                                <Route exact path="/" component={ () => <Redirect to="tourist/" /> } />
                                <Route path="/tourist" component={ TouristRouter } />
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer>
                            <Footer/>
                        </Layout.Footer>
                    </Layout>
                </div>
            </Router>
        );
    }
}

export default AppUnLogin;
import React from 'react';
import './App.css';
import SiderMenu from './SiderMenu';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserRouter from "../User";
import AdminRouter from "../Admin";
import Store from "store";
import Footer from "./Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    return (
      <Router>
          <Layout className="mainContainer">
            <SiderMenu />
            <Layout>
                <Layout.Content>
                  <Switch>
                    <Route exact path="/" component={ () => <Redirect to={ window.auth.role.alias} /> } />
                    <Route path="/user" component={ UserRouter } />
                    <Route path="/admin" component={ AdminRouter } />
                  </Switch>
                </Layout.Content>
                <Layout.Footer>
                  <Footer/>
                </Layout.Footer>
            </Layout>
          </Layout>
        </Router>
    )
  }
}

export default App;

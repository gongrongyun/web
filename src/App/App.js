import React from 'react';
import './App.css';
import SiderMenu from './SiderMenu';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserRouter from "../User";
import AdminRouter from "../Admin";
import Footer from "./Footer";
import server from '../server';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      username: window.auth.username,
      avatar: window.auth.avatar,
    }
  }

  getNewInfo = () => {
    server.get("/auth/auth").then(response => {
      window.auth = response.data;this.setState({
        username: window.auth.username,
        avatar: window.auth.avatar,
      })
    })
  }

  render() {
  
    return (
      <Router>
          <Layout className="mainContainer">
            <SiderMenu username={this.state.username} avatar={this.state.avatar} />
            <Layout>
                <Layout.Content>
                  <Switch>
                    <Route exact path="/" component={ () => <Redirect to={ window.auth.role.alias} /> } />
                    <Route path="/user" component={props => <UserRouter {...props } getNewInfo={ this.getNewInfo }/> } />
                    <Route path="/admin" component={ AdminRouter } />
                    <Route component={ () => <Redirect to={ window.auth.role.alias }/> } />
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

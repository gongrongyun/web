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
        <div style={{ width:"100%", height:"100vh" }}>
            <Layout className="mainContainer">
              { Store.get('logined') ? <SiderMenu /> : null }
              <Layout>
                  <Layout.Content>
                    <Switch>
                      <Route exact path="/" component={ () => <Redirect to={ Store.get('auth').role.alias} /> } />
                      <Route path="/user" component={ UserRouter } />
                      <Route path="/admin" component={ AdminRouter } />
                    </Switch>
                  </Layout.Content>
                  <Layout.Footer>
                    <Footer/>
                  </Layout.Footer>
              </Layout>
            </Layout>
        </div>
        </Router>
    )
  }
}

export default App;

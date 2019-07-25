import React from 'react';
import './App.css';
import SiderMenu from './SiderMenu';
import { Layout } from 'antd';
import HeadMenu from './HeadMenu';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "store";
import Life from "../Components/Life";
import Study from "../Components/Study";
import Technology from "../Components/Technology";
import Comprehensive from "../Components/Comprehensive";
import Info from "../Components/Info";
import Friends from "../Components/Friends";
import Notification from "../Components/Notification";
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
              { Store.get("auth").logined ? <SiderMenu /> : null }
              <Layout>
                  { Store.get("auth").logined ? null : <HeadMenu /> }
                  <Layout.Content>
                    <Switch>
                      <Route exact path="/" component={ Comprehensive } />
                      <Route path="/life" component={ Life } />
                      <Route path="/technology" component={ Technology } />
                      <Route path="/study" component={ Study } />
                      <Route path="/info" component={ Info } />
                      <Route path="/friends" component={ Friends } />
                      <Route path="/notification" component={ Notification } />
                    </Switch>
                  </Layout.Content>
                  <Layout.Footer><Footer/></Layout.Footer>
              </Layout>
            </Layout>
        </div>
        </Router>
    )
  }
}

export default App;

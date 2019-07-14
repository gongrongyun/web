import React from 'react';
import './App.css';
import server from '../server';
import Sider from './Sider';
import { Layout } from 'antd';
import HeadMenu from './HeadMenu';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.changeName = this.changeName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.httpRequest = this.httpRequest.bind(this);
  }

  changeName(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  httpRequest() {
    server.post('auth/login', {
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log(response.status)
    }, error => {
      console.log(error.status);
    });
  }

  render() {
    const { Content, Footer } = Layout;

    return (
      <div style={{ width:"100%", height:"100vh" }}>
        <Layout className="mainContainer">
          { this.props.logined ? <Sider /> : null }
          <Layout>
              { this.props.logined ? null : <HeadMenu /> }
              <Content>Content</Content>
              <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App;

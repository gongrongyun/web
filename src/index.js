import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import server from "./server"; 
import App from './App/App';
import { Spin } from 'antd';
import Store from "store";

ReactDOM.render((
    <Spin size="large">
        <div style={{ width:"100%", height:"100vh" }}/>
    </Spin>
), document.getElementById("root"));

// const loginRole = ['admin', 'user', 'tourist'];

function ready() {
    return new Promise((resolve, reject) => {
        server.get("/auth/auth", {
            headers: { "Api_Token": Store.get('auth').Api_Token}
        }).then(response => {
            Store.set('user', { 
                username: response.data.username,
                avatar: response.data.avatar,
                email: response.data.email,
                gender: response.data.gender,
                roleId: response.data.roleId,
                introduction: response.data.introduction,
            });
            Store.set('auth', {
                logined: true,
            })
            resolve();
        }).catch(error => {
            reject();
        });
    })
}

ready().then(() => { 
    ReactDOM.render(<App />, document.getElementById("root"))
}).catch(()=>{
    ReactDOM.render(<App />, document.getElementById("root"))
    Store.set('auth', {
        logined: false,
    })
});
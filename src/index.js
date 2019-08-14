import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import server from "./server"; 
import App from './App/App';
import { Spin } from 'antd';
import Store from "store";
import AppUnLogin from './App/AppUnLogin';

ReactDOM.render((
    <Spin size="large">
        <div style={{ width:"100%", height:"100vh" }}/>
    </Spin>
), document.getElementById("root"));

const ready = () => {
    return new Promise((resolve, reject) => {
        server.get("/auth/auth", {
            headers: { "Api_Token": Store.get('Api_Token')}
        }).then(response => {
            window.auth = response.data;
            resolve();
        }).catch(error => {
            reject();
        });
    })
}

ready().then(() => { 
    ReactDOM.render(<App />, document.getElementById("root"))
}).catch(()=>{
    ReactDOM.render(<AppUnLogin />, document.getElementById("root"))
});
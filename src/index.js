import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { Spin } from 'antd';

ReactDOM.render((
    <Spin size="large">
        <div style={{ width:"100%", height:"100vh" }}/>
    </Spin>
), document.getElementById("root"));

const loginRole = ['admin', 'user', 'tourist'];


setTimeout(() => ReactDOM.render(<App />, document.getElementById("root")), 500);
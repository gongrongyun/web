import React from "react";
import { Form, Input, Icon, Button, message } from "antd";
import server from "../server";
import CryptoJS from "crypto-js";
import VerifyCode from "./VerifyCode";
import Store from "store";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            code: '',
            repeatPassword: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(!this.verifyAll()) {
            return;
        }
        this.httpRequest();
    }

    httpRequest = () => {
        server.post("auth/register", {
            email: this.state.email,
            code: this.state.code,
            password: CryptoJS.SHA1(this.state.password).toString(),
            username: this.state.username,
        }).then(response => {
            message.success("注册成功");
            Store.set('Api_Token', response.data.token)
            window.location.reload();
        }).catch(error => {
            message.error(error.response.data.message);
        })
    }

    verifyAll = () => {
        if(!this.state.username) {
            message.error("Nickname should be filled in !");
            return false;
        }
        else {
            if(this.state.username.length >= 10 || this.state.username.length < 3) {
                message.error("Length of username should be greater than 3 and less than 10");
                return false;
            }
        }
        if(!this.state.password) {
            message.error("Password should be filled in !");
            return false;
        }
        if(!this.state.email) {
            message.error("Emali should be filled in !"); 
            return false;
        }
        if(this.state.password !== this.state.repeatPassword) {
            message.error("Two passwords are inconsistent !");
            return false;
        }
        if(this.state.code.length !== 6) {
            message.error("The length of verify code is wrong !");
            return false;
        }
        return true;
    }

    render() {
        return (
            <Form>
                <Form.Item>
                    <Input 
                        prefix={ <Icon type="mail" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> } 
                        placeholder="Email-adress" 
                        onChange={ e => {this.setState({email: e.target.value})} }
                    />
                </Form.Item>
                <Form.Item>
                    <VerifyCode
                        email={ this.state.email }
                        onChange={ code => {this.setState({code: code})} }
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        prefix={ <Icon type="lock" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                        placeholder="Password"
                        onChange={ e => {this.setState({password: e.target.value})} }
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password

                        prefix={ <Icon type="lock" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                        placeholder="Repeat Password"
                        onChange={ e => {this.setState({repeatPassword: e.target.value})} }
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={ <Icon type="user" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                        placeholder="Nickname"
                        onChange={ e => {this.setState({username: e.target.value})} }
                    />
                </Form.Item>
                <Form.Item>
                    <Button 
                        htmlType="submit" 
                        type="primary" 
                        style={{ width:"100%" }}
                        onClick={ this.handleSubmit }
                    >Register</Button>
                </Form.Item>
                
            </Form>
        )
    }
}

export default Register;
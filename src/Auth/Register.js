import React from "react";
import { Form, Input, Icon, Col, Button, Row, message } from "antd";
import server from "../server";
import CryptoJS from "crypto-js";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            code: '',
            repeatPassword: '',
            disabled: true,
            loading: false,
            time : 60,
        }
        this.pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(!this.verifyAll()) {
            console.log("ont");
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

    verifyEmail = (e) => {
        this.setState({email: e.target.value});
        if(this.pattern.test(e.target.value)) {
            this.setState({disabled: false});
        } else {
            this.setState({disabled: true});
        }
    }

    getCode = () => {
        this.setState({loading: true});
        const currentTime = new Date().getTime();
        this.timeId = setInterval(() => {
            if(this.state.time > 0) {
                this.setState({time: 60 - Math.floor((new Date().getTime() - currentTime)/1000)});
            } 
            else {
                clearInterval(this.timeId);
                this.setState({loading: false});
                this.setState({time: 60});
            }
        }, 1000);
        server.post("/auth/code", {
            email: this.state.email
        }).then(response => {
            message.success("Code has been sent to your email !");
        }).catch(error => {
            message.error("There is something wrong !");
        })
    }

    render() {
        return (
            <Form>
                <Form.Item>
                    <Input 
                        prefix={ <Icon type="mail" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> } 
                        placeholder="Email-adress" 
                        onChange={ this.verifyEmail }
                    />
                </Form.Item>
                <Form.Item>
                    <Row gutter={8}>
                        <Col span={14}>
                            <Input
                                prefix={ <Icon type="safety" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                                placeholder="Verifiy code"
                                onChange={ e => {this.setState({code: e.target.value})} }
                            />
                        </Col>
                        <Col span={8}>
                            <Button 
                                type="primary" 
                                disabled={ this.state.disabled }
                                loading={ this.state.loading }
                                onClick={ this.getCode }
                            >{this.state.loading ? "Try after "+this.state.time + "s" : "Get Code"}</Button>
                        </Col>   
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Input 
                        prefix={ <Icon type="lock" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                        placeholder="Password"
                        onChange={ e => {this.setState({password: e.target.value})} }
                    />
                </Form.Item>
                <Form.Item>
                    <Input
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
import React from "react";
import { Form, Input, Icon, Button, message, Row, Col } from "antd";
import { Link } from "react-router-dom";
import server from "../server";
import CryptoJS from "crypto-js";

class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            code: '',
            disable: true,
            loading: false,
            time: 60,
        }
        this.parrent = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
    }

    handleSubmit = () => {
        if(!this.verifyAll) {
            return;
        }
        server.put("auth/forgot", {
            email: this.state.email,
            password: CryptoJS.SHA1(this.state.password).toString(),
            code: this.state.code,
        }).then(response => {
            message.success("Password reset complete");
        }).catch(error => {
            message.error(error.response.data.message);
        })
    }

    verifyAll = () => {
        if(!this.parrent.test(this.state.email)) {
            message.error("Incorrect mailbox format");
            return false;
        }
        if(this.state.password.length < 3 || this.state.password.length > 10) {
            message.error("Length of username should be greater than 3 and less than 10");
            return false;
        }
        if(this.state.password !== this.state.repeatPassword) {            
            message.error("Two passwords are inconsistent !");
            return false;
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
        // server.post("/auth/code", {
        //     email: this.state.email
        // }).then(response => {
        //     message.success("Code has been sent to your email !");
        // }).catch(error => {
        //     message.error("There is something wrong !");
        // })
    }

    verifyEmail = (e) => {
        this.setState({email: e.target.value});
        if(this.parrent.test(e.target.value)) {
            this.setState({disable: false});
        } else {
            this.setState({disable: true});
        }
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
                                prefix={ <Icon type="safty" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                                placeholder="Verify code"
                                onChange={ e => {this.setState({code: e.target.value})} }
                            />
                        </Col>
                        <Col span={8}>
                            <Button
                                type="primary"
                                disabled={ this.state.disable }
                                loading={ this.state.loading }
                                onClick={ this.getCode }
                            >{this.state.loading ? "Try after " + this.state.time + "s" : "Get Code"}</Button>
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
                    <Button
                        style={{ width:"100%" }}
                        htmlType="button"
                        type="primary"
                        onClick={ this.handleSubmit }
                    >Submit</Button>
                    <Link to="/auth/login" onClick={ this.login } >Login now</Link>
                </Form.Item>
            </Form>
        )
    }
}

export default Forgot;
import React from "react";
import { Form, Input, Icon, Button, message, Row, Col } from "antd";
import { Link } from "react-router-dom";
import server from "../server";
import CryptoJS from "crypto-js";
import VerifyCode from "./VerifyCode";

class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            code: '',
        }
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
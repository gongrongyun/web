import React from "react";
import { Form, Input, Icon, Checkbox, Button, message } from "antd";
import { Link } from "react-router-dom";
import server from "../server";
import CryptoJs from "crypto-js";
import Store from "store";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    handleSubmit= (e) => {
        e.preventDefault()
        this.setState({
            loading: true,
        })
        server.post("auth/login", {
            username: this.props.form.getFieldValue("username"),
            password: CryptoJs.SHA1(this.props.form.getFieldValue("password")).toString(),
            remember: this.props.form.getFieldValue("remember"),
        }).then(response => {
            if(response.status === 200) {
                message.success("登陆成功");
            }
            this.setState({
                loading: false,
            })
            Store.set('logined', true);
            Store.set('Api_Token', response.data.token);

            window.location.href = "/";
        }).catch(error => {
            message.error((error.response && error.response.data.message) || "出错了哦");
            this.setState({
                loading: false,
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={ this.handleSubmit } style={{ maxWidth:"300px" }}>
                    <Form.Item>
                        { getFieldDecorator('username', {
                            rules: [{required: true, message:'Please input your username!'}],
                        }) (
                            <Input
                                prefix={ <Icon type="user" style={{ color:'rgba(0, 0, 0, 0.25)' }} /> }
                                placeholder="Username"
                            />
                        ) }
                    </Form.Item>
                    <Form.Item>
                        { getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password' }],
                        }) (
                            <Input.Password
                                prefix={ <Icon type="lock" style={{ color:'rgba(0, 0, 0, 0.25)' }} /> }
                                type="password"
                                placeholder="Password"
                            />
                        ) }
                    </Form.Item>
                    <Form.Item>
                        { getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>) }
                        <a style={{ float:"right" }} onClick={ this.props.forgot }>
                            Forgot password
                        </a>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width:"100%" }}
                            loading={ this.state.loading }
                            onClick={ this.handleSubmit }
                        >Login in</Button>
                        <a onClick={ this.props.register }>register now!</a>
                    </Form.Item>
                </Form>
        )
    }
}

export default Form.create()(Login);
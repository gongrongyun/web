import React from  "react";
import { Modal } from "antd";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Forgot from "./Forgot";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "Login",
        }
    }

    handleCancel = () => {
        this.props.cancel();
        let href = window.location.href.split("/");
        href.splice(href.indexOf("auth"));
        window.location.href = href.join("/");
    }

    switchToLogin = () => {
        this.setState({label: "Login"});
    }

    switchToForgot = () => {
        this.setState({label: "Forgot"});
    }

    switchToRegister = () => {
        this.setState({label: "Register"});
    }

    render() {
        return (
            <Modal
                title={ this.state.label }
                visible={ this.props.visible }
                onCancel={ this.handleCancel }
                style={{ maxWidth:"350px" }}
                footer=""
            >
                <Switch>
                    <Route path="/auth/login" render={ props => <Login {...props} register={ this.switchToRegister } forgot={ this.switchToForgot } /> } />
                    <Route path="/auth/register" component={ Register } />
                    <Route path="/auth/forgot" render={ props => <Forgot {...props} login={ this.switchToLogin } /> } />
                </Switch>
            </Modal>
        )
    }
}

export default LoginModal;
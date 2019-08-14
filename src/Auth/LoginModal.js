import React from  "react";
import { Modal } from "antd";
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
        setTimeout(() => {
            this.setState({label:"Login"})
        }, 1000);
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
                { this.state.label === "Login" ? <Login register={ this.switchToRegister } forgot={ this.switchToForgot } /> : null }
                { this.state.label === "Register" ? <Register /> : null }
                { this.state.label === "Forgot" ? <Forgot login={ this.switchToLogin } /> : null }
            </Modal>
        )
    }
}

export default LoginModal;
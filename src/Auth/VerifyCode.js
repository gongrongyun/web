import React from "react";
import { Row, Col, Input, Icon, Button, message } from "antd";
import server from "../server";

class VerifyCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            loading: false,
            time: 60,
        }
        this.pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
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
            email: this.props.email
        }).then(response => {
            message.success("Code has been sent to your email !");
        }).catch(error => {
            message.error("There is something wrong !");
        })
    }

    render() {
        return (
            <Row gutter={8}>
                <Col span={14}>
                    <Input
                        prefix={ <Icon type="safety" style={{ color:"rgba(0, 0, 0, 0.25)" }} /> }
                        placeholder="Verifiy code"
                        onChange={ e => { this.props.onChange(e.target.value) } }
                    />
                </Col>
                <Col span={8}>
                    <Button 
                        type="primary" 
                        disabled={ !this.pattern.test(this.props.email) }
                        loading={ this.state.loading }
                        onClick={ this.getCode }
                    >{this.state.loading ? "Try after "+this.state.time + "s" : "Get Code"}</Button>
                </Col>   
            </Row>
        )
    }
}

export default VerifyCode;
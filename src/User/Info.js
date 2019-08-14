import React from "react";
import { Button, Card, Input, Radio, message } from "antd";
import Store from "store";
import Image from "../Components/Image";
import server from "../server";
import CryptoJs from "crypto-js";
import "./main.css";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: window.auth.username,
            gender: window.auth.gender,
            introduction: window.auth.introduction,
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
        }
    }

    logout = () => {
        Store.set('Api_Token', null);
        window.location.href = "/";
    }

    changePassword = () => {
        if(this.state.newPassword !== this.state.repeatPassword ) {
            message.error("两次密码不一致哦");
            return;
        }
        server.put("user/security", {
            password_old: CryptoJs.SHA1(this.state.oldPassword).toString(),
            password_new: CryptoJs.SHA1(this.state.newPassword).toString(),
        }).then(response => {
            message.success("密码修改成功了哦");
        }).catch(error => {
            message.error(error.response.data.message || "出错了哦");
        })
    }

    changeProfile = () => {
        const username = this.state.username.trim();
        if(username.length < 3 || username.length > 10) {
            message.error("用户名长度必须在3~10个单位内哦");
            return;
        }
        if(this.state.introduction.trim().length > 50) {
            message.error("简介不能超过50个单位哦");
            return
        }
        server.put("user/profile", {
            username: this.state.username.trim(),
            gender: this.state.gender,
            introduction: this.state.introduction.trim(),
        }).then(response => {
            message.success("信息修改成功哦");
            this.props.getNewInfo();
        }).catch(error => {
            message.error(error.response.data.message || "出错了哦");
        })
    }

    render() {
        return (
            <div className="info-container" >
                <div className="info-header">
                    <p>个人中心</p>
                    <Button 
                        type="danger" 
                        onClick={ this.logout } 
                        className="info-button"
                        size="large"
                    >安全登出</Button>
                </div>
                <Card
                    title="头像"
                    className="info-card"
                >
                    <div style={{ display:'flex', justifyContent:"center", width:"100%" }}>
                        <Image src={ window.auth.avatar } getNewInfo={ this.props.getNewInfo } />
                    </div>
                </Card>
                <Card
                    title="基本信息"
                    className="info-card"
                    extra={ <Button size="small" type="primary" onClick={ this.changeProfile }>保存</Button> }
                >
                    <div className="info-basic-message">
                        <div style={{ width:"50%" }}>
                            <p><strong>用户名</strong></p>
                            <Input
                                value={ this.state.username }
                                size="large"
                                onChange={ e => { this.setState({username: e.target.value})} }
                            />
                        </div>
                        <div style={{ marginTop:"40px", width:"50%" }}>
                            <Radio.Group 
                                defaultValue={this.state.gender+""} 
                                buttonStyle="solid" 
                                size="large" 
                                onChange={ e => {this.setState({gender: parseInt(e.target.value)})} }
                            >
                                <Radio.Button value="2">男</Radio.Button>
                                <Radio.Button value="1">女</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{ width:"50%", marginTop:"40px" }}>
                            <p><strong>自我介绍</strong></p>
                            <Input.TextArea
                                rows={6}
                                cols={12}
                                defaultValue={ this.state.introduction || "" }
                                placeholder={ this.state.introduction ? "" : "快来写点什么吧" }
                                onChange={ e => {this.setState({introduction: e.target.value})} }
                            >
                            </Input.TextArea>
                        </div>
                    </div>
                </Card>
                <Card
                    title="修改密码"
                    className="info-card"
                    extra={ <Button type="danger" size="small" onClick={ this.changePassword } >确定修改</Button> }
                >
                    <div className="info-password">
                        <div style={{ marginTop: "40px", width:"50%" }} >
                            <p><strong>旧密码</strong></p>
                            <Input.Password
                                type="password"
                                size="large"
                                onChange={ e => {this.setState({oldPassword: e.target.value})} }
                            />
                        </div>
                        <div style={{ marginTop: "40px", width:"50%" }} >
                            <p><strong>新密码</strong></p>
                            <Input.Password
                                type="password"
                                size="large"
                                onChange={ e => {this.setState({newPassword: e.target.value})} }
                            />
                        </div>
                        <div style={{ marginTop: "40px", width:"50%" }} >
                            <p><strong>重复密码</strong></p>
                            <Input.Password
                                type="password"
                                size="large"
                                onChange={ e => {this.setState({repeatPassword: e.target.value})} }
                            />
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Info;
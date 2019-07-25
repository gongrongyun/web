import React from 'react';
import img from '../resources/qkteam.png';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import Store from "store";

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    render() {
        const MentItems = [
            { key: 1, icon: "user", description: "个人中心", url: "/info" },
            { key: 2, icon: "team", description: "我的好友", url: "/friends" },
            { key: 3, icon: "notification", description: "消息中心", url: "/notification" },
        ];

        return (
            <Layout.Sider theme="dark" collapsible collapsed={ this.state.collapsed } onCollapse={ this.onCollapse }>
                <div className="sider-logo">
                    <img alt={ "avatar" } src={ this.props.avatar || img } className="sider-avatar"/>
                    <span>{ this.state.collapsed ? "" : Store.get('user').username }</span>
                </div>
                <Menu mode="inline" theme="dark">
                    { MentItems.map((item) => (
                        <Menu.Item key={ item.key }>
                            <Link to={ item.url }>
                                <Icon type={ item.icon }></Icon>
                                <span>{ item.description }</span>
                            </Link>
                        </Menu.Item>
                    )) }
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sider;
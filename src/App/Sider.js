import React from 'react';
import img from '../resources/qkteam.png';
import { Layout, Menu, Icon } from 'antd';

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
            { key: 1, icon: "user", description: "个人中心" },
            { key: 2, icon: "team", description: "我的好友" },
            { key: 3, icon: "notification", description: "消息中心" },
        ];

        return (
            <Layout.Sider theme="dark" collapsible collapsed={ this.state.collapsed } onCollapse={ this.onCollapse }>
                <div className="sider-logo">
                    <img alt={ "avatar" } src={ this.props.avatar || img } className="sider-avatar"/>
                    <span>{ this.state.collapsed ? "" : this.props.username || "test" }</span>
                </div>
                <Menu mode="inline" theme="dark">
                    { MentItems.map((item) => (
                        <Menu.Item key={ item.key }>
                        <Icon type={ item.icon }></Icon>
                        <span>{ item.description }</span>
                    </Menu.Item>
                    )) }
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sider;
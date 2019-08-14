import React from 'react';
import img from '../resources/qkteam.png';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from "react-router-dom";
import Store from "store";

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
        this.menuItems = [
            { key: `${window.auth.role.alias}/info`, icon: "user", description: "个人中心" },
            { key: `${window.auth.role.alias}/friend`, icon: "team", description: "我的好友" },
            { key: `${window.auth.role.alias}/notification`, icon: "notification", description: "消息中心" },
        ];
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    redirect = ({key}) => {
        window.location.href = `/${key}`;
    }

    defaultSelectedKey = () => {
        if(window.location.href === `/${window.auth.role.alias}`) {
            return `${window.auth.role.alias}/comprehensive`;
        }
        const menu = this.menuItems.find(o => window.location.href.match(o.key)) || {};
        if (!this.isVisibleForCurrentRoute(menu)) {
        window.location.href = `/${window.auth.role.alias}`;
        }
        return menu.key;
    }

    isVisibleForCurrentRoute = (o) => {
        const visibility = o.visibility || [];
        if (visibility.length === 0) {
            return true;
        }
        return visibility.indexOf(window.auth.role.alias) !== -1;
    }

    render() {
        const imgUrl = window.auth.avatar;

        return (
            <Layout.Sider theme="dark" collapsible collapsed={ this.state.collapsed } onCollapse={ this.onCollapse }>
                <div className="sider-logo" >
                    <Avatar alt={ "avatar" } src={ imgUrl ? `http://localhost:8000/static/${imgUrl}` : img } className="sider-avatar"/>
                    <span>{ this.state.collapsed ? "" : window.auth.username }</span>
                </div>
                <Menu 
                    mode="inline" 
                    theme="dark"
                    defaultSelectedKeys={ [this.defaultSelectedKey() ]}
                    onClick={ this.redirect }
                >
                    { this.menuItems.map((item) => (
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
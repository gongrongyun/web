import React from 'react';
import img from '../resources/qkteam.png';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from "react-router-dom";

class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
        this.menuItems = [
            { key: `/${window.auth.role.alias}/info`, icon: "user", description: "个人中心" },
            { key: `/${window.auth.role.alias}/friend`, icon: "team", description: "我的好友" },
            { key: `/${window.auth.role.alias}/notification`, icon: "notification", description: "消息中心" },
        ];
        this.articleSubMenuItems = [
            { key: `/${window.auth.role.alias}/articleCreate`, description: "创作文章", visibility: "user"},
            { key: `/${window.auth.role.alias}/articleProcess`, description: "审核进程", visibility: "user"},
        ];
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    defaultSelectedKey = () => {
        if(window.location.href === `/${window.auth.role.alias}`) {
            return `/${window.auth.role.alias}/comprehensive`;
        }
        let menu = this.menuItems.find(o => window.location.href.match(o.key));
        if(!menu) {
            menu = this.articleSubMenuItems.find(o => window.location.href.match(o.key));
        }
        if (!this.isVisibleForCurrentRoute(menu)) {
            window.location.href = `/${window.auth.role.alias}`;
        }
        return menu ? menu.key : null;
    }

    isVisibleForCurrentRoute = (o) => {
        const visibility = "visibility" in o ? o.visibility : null;
        if (visibility === null) {
            return true;
        }
        return visibility.indexOf(window.auth.role.alias) !== -1;
    }

    render() {
        return (
            <Layout.Sider theme="dark" collapsible collapsed={ this.state.collapsed } onCollapse={ this.onCollapse }>
                <div className="sider-logo" >
                    <Avatar alt={ "avatar" } src={ this.props.avatar ? `http://localhost:8000/static/${this.props.avatar}` : img } className="sider-avatar"/>
                    <span className="sider-username">{ this.state.collapsed ? "" : this.props.username }</span>
                </div>
                <Menu 
                    mode="inline" 
                    theme="dark"
                    defaultSelectedKeys={ [this.defaultSelectedKey() ]}
                >
                    <Menu.SubMenu
                        key="article"
                        title={
                            <span>
                                <Icon type="edit" />
                                <span>创作中心</span>
                            </span>
                        }
                    >
                        { this.articleSubMenuItems.map((item) => (
                            <Menu.Item key={ item.key }>
                                <Link to={ item.key } >
                                    <span>{ item.description }</span>
                                </Link>
                            </Menu.Item>
                        )) }
                    </Menu.SubMenu>
                    { this.menuItems.map((item) => (
                        <Menu.Item key={ item.key }>
                             <Link to={ item.key }>
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
import React from 'react';
import logo from '../resources/qkteam.png';
import { Icon, Menu, Input } from 'antd';

class HeadMenu extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search(value) {
        console.log(value);
    }

    render() {
        const MenuItems = [
            { key: 1, descritipn: "综合" },
            { key: 2, descritipn: "生活" },
            { key: 3, descritipn: "科技" },
            { key: 4, descritipn: "学习" },
        ];

        return (
            <div className="headmenu-container">
                <div className="headmenu-nav">
                    <div className="headmenu-logo">
                        <img alt="logo" src={logo} height="40" width="40" />
                        <span>Bustling</span>
                    </div>
                    {/* <div className="headmenu-menu"> */}
                        <Menu theme="dark" mode="horizontal" style={{ fontSize: "18px", display:"flex", alignItems: "center", flexGrow:1  }}>
                            { MenuItems.map(item => (
                                <Menu.Item key={ item.key } style={{ height:"80px", display:"flex", alignItems: "center" }}>
                                    <span>{ item.descritipn }</span>
                                </Menu.Item>
                            )) }
                        </Menu>
                    {/* </div> */}
                    <div className="search">
                        <Input.Search placeholder="input search text" onSearch={ this.search } style={{ height:"80px", width:"100%" }}/>
                    </div>
                    <div  className="headmenu-login">
                        <Icon type="login" />
                        <Icon type="logout" />
                    </div>
                </div>
            </div>
        )
    }
}

export default HeadMenu;
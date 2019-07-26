import React from "react";
import { Layout, Button } from "antd";
import Store from "store";

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        Store.set('Api_Token', null);
        Store.set('logined', false);
        window.location.href = "/";
    }

    render() {
        return (
            <Layout>
                <Button 
                    type="danger"
                    onClick={ this.logout }
                >Logout</Button>
            </Layout>
        )
    }
}

export default Info;
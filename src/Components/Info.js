import React from "react";
import { Layout, Button } from "antd";
import Store from "store";

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Button 
                    type="danger"
                    onClick={ () => {Store.set('auth', {Api_Token: null}, window.location.href = "/")} }
                >Logout</Button>
            </Layout>
        )
    }
}

export default Info;
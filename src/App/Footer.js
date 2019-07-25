import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <hr/>
                <div className="footer">
                <div className="footer-a">
                    {/* <a></a>
                    <a></a> */}
                </div>
                <p>熙熙论坛Bustling ©2019</p>
                <p>Powered by QKTEAM</p>
            </div>
            </div>
            
        )
    }
}

export default Footer;
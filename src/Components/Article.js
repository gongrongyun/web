import React from "react";
import { Card, Tag, Popover, Avatar, Icon, Tooltip } from "antd";
import { Link } from "react-router-dom";
import server from "../server";
import img from "../resources/qkteam.png";

class Article extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			author: {},
			loading: true,
		}
	}

	componentWillMount() {
        if(!this.props.visibilty) {
            server.get(`user/profile/${this.props.article.user_id}`).then(response => {
                this.setState({
                    author: response.data,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
        }
	}

	render() {
		const tags = this.props.article.tags.split("/");

        const content = (
            <div style={{ maxWidth:"200px" }} >
                <p>{ "邮箱: " + this.state.author.email }</p>
                <p>{ "签名: " + (this.state.author.introduction || "暂无") }</p>
            </div>
        );

        const title = (
            <div>
                <span style={{ fontSize:"20px", marginRight:"10px" }} >{ this.state.author.username }</span>
                <span>{ this.state.author.gender === 1 ? <Icon type="woman" /> : <Icon type="man" /> }</span>
            </div>
        )

		return (
			<Card style={{ width:"750px", marginTop:"16px" }} >
                <Card.Meta
                    avatar={ this.props.visibilty ? null :
                        <Popover
                            title={ title }
                            content={ content }
                        >
                            <Avatar 
                                alt="avatar" 
                                src={this.state.loading ? img : `http://localhost:8000/static/images/${ this.state.author.avatar }`}
                                style={{ cursor:"pointer" }}
                            />
                        </Popover>
                    }
                    title={
                        <div>
                            <Link to={ `articleDetail/${this.props.article.id}` }>{ this.props.article.title }</Link>
                            { this.props.visibilty ? ( 
                                this.props.article.reviewed ? <Tag color="green" style={{ float:"right" }} >审核已通过</Tag> : 
                                    <Tag color="orange" style={{ float:"right" }} >审核中</Tag>
                            ) : null}
                        </div>
                    }
                    description={ tags.map((value)  => (
                        <Tag color="blue" key={value} >{ value }</Tag>
                    )) }
                >
                </Card.Meta>
                <div style={{ marginTop:"20px" }}>
                    <span style={{ marginLeft:this.props.visibilty ? "0px" : "45px" }} >
                        创建于: &nbsp;
                        { new Date(this.props.article.created_at).toDateString() }
                    </span>
                    <span style={{ float:"right" }} >
                        <Tooltip title="观看数">
                            <Icon type="eye" style={{ marginRight:"5px" }} />
                        </Tooltip>
                        { this.props.article.views }
                    </span>
                </div>
            </Card>
		)
	}
}

export default Article;
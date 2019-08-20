import React from "react"
import server from "../server";
import { Card, Avatar, Button, Icon, Tag } from "antd";
import img from "../resources/qkteam.png"

class ArticleDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            article: null,
            author: null,
            loading: true,
        }
    }

    componentWillMount() {
        server.get(`article/detail/${this.props.match.params.article_id}`).then(response => {
            this.setState({article: response.data}, function() {
                server.get(`user/profile/${this.state.article.user_id}`).then(response => {
                    this.setState({
                        author: response.data,
                        loading: false,
                    });
                })
            });
        })
        
    }

    render() {
        const InfoTitle = (
            <div>
                <span style={{ fontSize:"20px" }} > { this.state.loading ? null :  this.state.author.username } </span>
                { this.state.loading ? null : <span>{ this.state.author.gender === 1 ? <Icon type="woman" /> : <Icon type="man" /> }</span> } 
                <Button type="primary" style={{ float:"right" }} >加好友</Button>
            </div>
        )

        const InfoDescription = (
            <div style={{ color:"black", marginTop:"10px" }} >
                <div className="articleDetail-infoDescription">
                    <div><p>好友数</p><p><strong>23</strong></p></div>
                    <div style={{ border:"1px solid gray", width:"1px", height:"60px" }} ></div>
                    <div><p>作品数</p><p><strong>223</strong></p></div>
                </div>
                <p>邮箱:{ this.state.loading ? null : this.state.author.email }</p>
                <p>个性签名:{ this.state.loading ? null : (this.state.author.introduction || "暂无") }</p>
            </div>
        )

        const articleType = {
            "comprehensive" : "综合",
            "technology" : "科技",
            "study": "学习",
            "life": "生活",
        };

        return(
            <div className="articleDetail-container" >
                <Card className="articleDetail-authorInfo">
                    <Card.Meta
                        avatar={ <Avatar src={this.state.loading ? img : `http://localhost:8000/static/images/${this.state.author.avatar}`} /> }
                        title={ InfoTitle }
                        description={ InfoDescription }
                    >
                    </Card.Meta>
                </Card>
                <Card className="articleDetail-article">
                    <Card.Meta
                        title={ 
                            <div>
                                { this.state.loading ? null : <span style={{ fontSize:"25px" }} >{this.state.article.title}</span> }
                                { this.state.loading ? null : <Tag color="cyan" style={{ float:"right" }} >{articleType[this.state.article.article_type]}</Tag>}
                            </div>
                        }
                        description={ this.state.loading ? null : this.state.article.tags.split("/").map((value)  => (
                            <Tag color="blue" key={value} >{ value }</Tag>
                        )) }
                    >
                    </Card.Meta>
                    <div style={{ padding:"20px" }} >{ this.state.loading ? null : this.state.article.html_content }</div>
                </Card>
            </div>
        )
    }
}

export default ArticleDetail;
import React from "react"
import server from "../server"
import { Card, Radio, Pagination, Empty } from "antd"
import Article from "../Components/Article"

class ArticleProcess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles : [],
            currentPage: 1,
            total: 0,
            reviewed: false,
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData = () => {
        const params = {
            offset: (this.state.currentPage - 1) * 7,
            limit: 7,
            reviewed: this.state.reviewed,
        }
        server.get(`article/self_list/${window.auth.id}`,{ params }).then(response => {
            this.setState({
                articles: response.data.data || [],
                total: response.data.total,
            })
        }).catch(error => {
            console.log(error)
        })
    }

    changePage = (pageNum) => {
        this.setState({currentPage: pageNum}, function() {
            this.getData();
        })
    }

    render() {
        return(
            <div className="articleProcess-container">
                <Card 
                    title="文章审核概览"
                    className="articleProcess-card"
                >
                    <Radio.Group 
                        defaultValue={0}
                        buttonStyle="solid" 
                        onChange={ e => { this.setState({reviewed:e.target.value}, function(){this.getData()}) } } >
                        <Radio.Button value={0} >审核中</Radio.Button>
                        <Radio.Button value={1} >已通过</Radio.Button>
                        <Radio.Button value={-1} >未通过</Radio.Button>
                    </Radio.Group>
                    { this.state.articles.length == 0 ? <Empty style={{ marginTop:"30px", width:"735px" }} /> : 
                        this.state.articles.map((article) => (
                            <Article article={ article } key={article.id} visibilty={true} />
                    )) }
                    { this.state.articles.length == 0 ? null :
                        <Pagination 
                            className="pagination" 
                            defaultCurrent={1}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            onChange={ this.changePage }
                            pageSize={ 7 }
                            total={ this.state.total }
                            style={{ float:"right" }}
                        />
                    }
                </Card>
            </div>
        )
    }
}

export default ArticleProcess;
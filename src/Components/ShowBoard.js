import React from "react"
import server from "../server";
import Article from "./Article";
import "./index.css";
import { Card, Pagination, Empty } from "antd";

class ShowBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            total: 0,
            currentPage: 1,
            loading: true,
        }
    }

    componentWillMount() {
        this.getData();
    }

    componentWillReceiveProps() {
        this.getData();
    }

    getData = () => {
        const params = {
            offset: (this.state.currentPage - 1) * 7,
            limit: 7,
        };
        server.get(`article/list/${this.props.articleType}`, {params}).then(response => {
            this.setState({
                articles: response.data.articles || [],
                total: response.data.total,
                loading: response.data.articles ? false : true,
            });
        })
    }

    changePage = (pageNum) => {
        this.setState({currentPage: pageNum}, function() {
            this.getData();
        })
    }

    render() {
        const map = {
            "all": "全部",
            "comprehensive": "综合",
            "study": "学习",
            "life": "生活",
            "technology": "科技",
        }

        return(
            <div className="showBoard-container">
                <Card 
                    className="showBoard-board"
                    title={ map[this.props.articleType] }
                >
                    { this.state.loading ? <Empty/>  : this.state.articles.map((article) => (
                        <Article key={ article.id } article={ article } visibilty={false} />
                    ))}
                    { this.state.articles.length == 0 ? null : 
                        <Pagination 
                            className="pagination" 
                            defaultCurrent={1} 
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            onChange={ this.changePage }
                            pageSize={ 7 }
                            total={ this.state.total } 
                        />
                    }
                    
                </Card>
            </div>
        )
    }
}

export default ShowBoard;
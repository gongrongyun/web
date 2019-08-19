import React from "react"
import server from "../server"
import { Card } from "antd"
import Article from "../Components/Article"

class ArticleProcess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles : [],
            currentPages: 1,
        };
    }

    componentWillMount() {
        const params = {
            offset: (this.state.currentPages - 1) * 7,
            limit: 7
        }
        server.get(`article/self_list/${window.auth.id}`,{ params }).then(response => {
            this.setState({articles: response.data || []})
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return(
            <div>
                <Card>
                    { this.state.articles.map((article) => (
                        <Article article={ article } key={article.id} visibilty={true} />
                    )) }
                </Card>
            </div>
        )
    }
}

export default ArticleProcess;
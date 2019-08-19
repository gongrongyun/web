import React from "react"
import server from "../server";
import Article from "./Article";

class ShowBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
        }
    }

    componentWillMount() {
        const articleType = this.getArticleType();
        const params = {
            offset: 0,
            limit: 7,
        };
        server.get(`article/list/${articleType}`, {params}).then(response => {
            this.setState({articles: response.data || []});
        })
    }

    getArticleType = () => {
        return window.location.href.split("/")[4];
    }

    render() {
        return(
            <div className="showBoard-container">
                { this.state.articles.map((article) => (
                    <Article key={ article.id } article={ article } visibilty={false} />
                )) }
            </div>
        )
    }
}

export default ShowBoard;
import React from "react"
import BraftEditor from "braft-editor"
import 'braft-editor/dist/index.css'
import { Card, Button, message } from "antd"
import server from "../server"
import Store from "store"

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: undefined,
            header: "",
            tags: "",
        }
    }

    componentDidMount() {
        this.setState({
            editorState: BraftEditor.createEditorState(Store.get("editorState") || null),
            header: Store.get("header") || null,
            tags: Store.get("tags") || null,
        });
    }

    handle = () => {
        if(this.state.header.length > 30) {
            message.error("标题过长咯");
            return
        }
        const tags = this.state.tags.split("/");
        if(tags.length > 7) {
            message.error("标签数太多咯");
            return
        }
        server.post("/article/create", {
            header: this.state.header,
            tags: this.state.tags,
            htmlContent: this.state.editorState.toHTML(),
            rawContent: this.state.editorState.toRAW(),
        }).then(response => {
            Store.remove("editorState");
            Store.remove("header");
            Store.remove("tags");
        })
        
    }

    handleEditorChange = (editorState) => {
        this.setState({editorState})
    }

    saveContent = () => {
        Store.set("editorState", this.state.editorState.toRAW());
        Store.set("header", this.state.header);
        Store.set("tags", this.state.tags);
        message.success("保存成功咯");
    }

    render() {
        return(
            <div className="articleCreate">
                <Card
                    title="写作"
                    className="articleCreate-card"
                    extra={ <Button size="large" type="primary" onClick={ this.handle }>发表</Button>  }
                >
                    <div>
                        <div>
                            <span style={{ fontSize:"25px" }} >标题:</span>
                            <input
                                defaultValue={ this.state.header }
                                placeholder="UC练习场"
                                className="articleCreate-input"
                                onChange={ e => this.setState({header: e.target.value}) }
                            />
                        </div>
                        <div>
                            <span style={{ fontSize:"25px" }} >标签:</span>
                            <input
                                defaultValue={ this.state.tags }
                                placeholder="用些简短的词汇来描述你的文章吧"
                                className="articleCreate-input"
                                onChange={ e => this.setState({tags: e.target.value}) }
                            />
                        </div>
                    </div>
                    <div style={{ marginTop:"30px" }}>
                        <span style={{ fontSize:"24px" }} >正文:</span>
                        <BraftEditor
                            placeholder="开始你的创作吧。。。"
                            value={ this.state.editorState }
                            onChange={ this.handleEditorChange }
                            onSave={ this.saveContent }
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

export default ArticleCreate;
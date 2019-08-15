import React from "react"
import BraftEditor from "braft-editor"
import 'braft-editor/dist/index.css'
import { Card, Button, message, Modal, Select, Popover } from "antd"
import server from "../server"
import Store from "store"

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: undefined,
            articleType: "",
            header: "",
            tags: "",
        }
    }

    componentDidMount() {
        this.setState({
            editorState: BraftEditor.createEditorState(Store.get("editorState") || null),
            header: Store.get("header") || null,
            tags: Store.get("tags") || null,
            articleType: Store.get("articleType") || null,
        });
    }

    handle = () => {
        if(this.state.header.length > 30) {
            message.error("标题过长咯");
            return
        }
        if(this.state.tags.length > 7) {
            message.error("标签数太多咯");
            return
        }
        server.post("/article/create", {
            header: this.state.header,
            tags: this.state.tags.join("/"),
            articleType: this.state.articleType,
            htmlContent: this.state.editorState.toHTML(),
            rawContent: this.state.editorState.toRAW(),
        }).then(response => {
            Store.remove("editorState");
            Store.remove("header");
            Store.remove("articleType");
            Store.remove("tags");
        })
    }

    confirm = () => {
        Modal.confirm({
            title: "温馨提示",
            content:"文章马上就要发表咯，请确认",
            okText: "确定",
            cancelText: "取消",
            onOk: this.handle
        })
    }

    handleEditorChange = (editorState) => {
        this.setState({editorState})
    }

    saveContent = () => {
        Store.set("editorState", this.state.editorState.toRAW());
        Store.set("articleType", this.state.articleType);
        Store.set("header", this.state.header);
        Store.set("tags", this.state.tags);
        message.success("保存成功咯");
    }

    render() {
        const tags = Store.get("tags");
        const children = [];
        if(tags) {
            tags.forEach(value => {
                children.push(<Select.Option key={value+Math.random()} value={ value } >{value}</Select.Option>)
            });
        }
        return(
            <div className="articleCreate">
                <div className="articleCreate-header">
                    <Popover placement="bottom" content={ "保存一下，方便下一次编辑哦" } >
                        <Button className="articleCreate-button" size="large" type="default" onClick={ this.saveContent }>保存</Button>
                    </Popover>
                    <Popover placement="bottom" content={ "赶紧让更多人看到吧" }>
                        <Button className="articleCreate-button" size="large" type="primary" onClick={ this.confirm }>发表</Button>
                    </Popover>
                </div>
                <Card
                    title="写作"
                    className="articleCreate-card"
                >
                    <div>
                        <div>
                            <span style={{ fontSize:"20px" }} >标题:</span>
                            <input
                                defaultValue={ this.state.header }
                                placeholder="UC练习场"
                                className="articleCreate-input"
                                onChange={ e => this.setState({header: e.target.value}) }
                            />
                        </div>
                        <div>
                            <span style={{ fontSize:"20px" }} >标签:</span>
                            <Select
                                defaultValue={ Store.get("articleType") || "综合" } 
                                style={{ width:"100px", marginLeft:"30px" }} 
                                size="large"
                                onChange={ value => this.setState({articleType: value}) }
                            >
                                <Select.Option value="综合">综合</Select.Option>
                                <Select.Option value="学习">学习</Select.Option>
                                <Select.Option value="生活">生活</Select.Option>
                                <Select.Option value="科技">科技</Select.Option>
                                <Select.Option value="disabled" disabled>未开放</Select.Option>
                            </Select>
                            <Select 
                                mode="tags" 
                                style={{ width:"80%" }}
                                defaultValue={ Store.get("tags") }
                                size="large"
                                onChange={ value => this.setState({tags: value}) }
                            >{ children }</Select>
                        </div>
                    </div>
                    <div style={{ marginTop:"30px" }}>
                        <span style={{ fontSize:"20px" }} >正文:</span>
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
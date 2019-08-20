import React from "react"
import BraftEditor from "braft-editor"
import 'braft-editor/dist/index.css'
import { Card, Button, message, Modal, Select, Tooltip } from "antd"
import server from "../server"
import Store from "store"

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: undefined,
            articleType: "",
            title: "",
            tags: "",
        }
    }

    componentDidMount() {
        this.setState({
            editorState: BraftEditor.createEditorState(Store.get("editorState") || null),
            title: Store.get("title") || null,
            tags: Store.get("tags") || null,
            articleType: Store.get("articleType") || "comprehensive",
        });
    }

    handle = () => {
        if(!this.validateAll()) {
            return
        }
        server.post("/article/", {
            title: this.state.title,
            tags: this.state.tags.join("/"),
            article_type: this.state.articleType,
            html_content: this.state.editorState.toHTML(),
            raw_content: this.state.editorState.toRAW(),
        }).then(response => {
            Store.remove("editorState");
            Store.remove("title");
            Store.remove("articleType");
            Store.remove("tags");
            message.success("请耐心等待审核哦")
        }).catch(error => {
            message.error("出错了哦")
        })
    }

    validateAll = () => {
        const title = this.state.title;
        const tags = this.state.tags;
        if(title.length > 30) {
            message.error("标题过长咯");
            return false
        }
        if(!title) {
            message.error("标题不能为空哦");
        }
        if(tags.length > 7) {
            message.error("标签数太多咯");
            return false
        }
        if(tags.length === 0) {
            message.error("要给文章贴上标签才能发表哦");
            return false
        }
        if(this.state.editorState.isEmpty()) {
            message.error("文章内容不能为空哦")
            return false
        }
        return true
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
        Store.set("title", this.state.title);
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
        const articleTypes = [
            { key:"comprehensive", description:"综合" },
            { key:"study", description:"学习" }, 
            { key:"life", description:"生活" }, 
            { key:"technology", description:"科技"}
        ];
        return(
            <div className="articleCreate">
                <Card
                    title={
                        <Tooltip  title="保存一下，方便下一次编辑哦">
                            <Button className="articleCreate-button" size="large" type="default" onClick={ this.saveContent }>保存</Button>
                        </Tooltip>
                    }
                    extra={
                        <Tooltip title="赶紧让更多人看到吧">
                            <Button className="articleCreate-button" size="large" type="primary" onClick={ this.confirm }>发表</Button>
                        </Tooltip>
                    }
                    className="articleCreate-card"
                >
                    <div>
                        <div>
                            <span style={{ fontSize:"20px" }} >标题:</span>
                            <input
                                defaultValue={ this.state.title }
                                placeholder="练习场"
                                className="articleCreate-input"
                                onChange={ e => this.setState({title: e.target.value}) }
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
                                { articleTypes.map(item => (
                                    <Select.Option value={item.key} key={item.key} >
                                        {item.description}
                                    </Select.Option>
                                )) }
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
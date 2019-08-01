import React from "react";
import { Upload, Icon, message } from "antd";
import server from "../server";

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.src,
        }
    }

    beforeUpload = (file) => {
        const isPicture = file.type === 'image/jpeg' || file.type === 'image/png';
        if(!isPicture) {
            message.error("只能上传jpg或png格式的图片哦");
        }
        const is3M = file.size / 1024 / 1024 < 3;
        if(!is3M) {
            message.error("图片不能大于3MB哦")
        }
        return isPicture && is3M;
    }

    handleChange = (info) => {
        const { status, response } = info.file;

        if(status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if(status === 'done') {
            message.success("图片上传成功");
            this.setState({
                loading: false,
                imageUrl: response.filename,
            });
            server.put('user/profile', {
                avatar: response.filename,
            }).then(response => {
                window.location.reload();
            }).catch(error => {
                message.error((error.response && error.response.data.message) || "更改头像出错咯");
            })
        }
        if(status === 'error') {
            this.setState({loading: false});
            message.error("图片上传失败");
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div>上传照片</div>
          </div>
        );

        return (
            <Upload
                name="file"
                action="http://localhost:8000/upload"
                listType="picture-card"
                showUploadList={ false }
                beforeUpload={ this.beforeUpload }
                onChange={ this.handleChange }
                className="upload"
                multiple={ false }
            >
                { this.state.imageUrl ? <img alt="avatar" src={ `http://localhost:8000/storage/${this.state.imageUrl}` } style={{ width:"100%" }} /> : uploadButton }
            </Upload>
        )
    }
}

export default Image;
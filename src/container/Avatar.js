/**
 * Created by LDQ on 2018/7/3
 */
import React, {Component} from 'react';
import { Upload, Icon, message } from 'antd';
import avatarPicUrl from '../Util/AvatarPicUrl';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


class Avatar extends React.Component {
    state = {
        loading: false,
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
        let url = avatarPicUrl.getUrlFromAvatar(info);
        this.props.afterAction(url);
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const name = this.props.name;
        return (
            <Upload
                name={name}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action='/imageserver/uploads'
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}
module.exports = Avatar;

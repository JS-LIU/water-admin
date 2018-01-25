/**
 * Created by LDQ on 2018/1/25
 */
import React, {Component} from 'react'
import { Modal } from 'antd';
class ShowAuditView extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
    }
    handleCancel(e){
        this.setState({
            visible: false,
        });
    }
    showModal(){
        this.setState({
            visible: true,
        });
    }
    render(){
        return (<div>
            <a onClick={this.showModal.bind(this)}>
                <img src={this.props.auditItem.imgUrl} alt="" style={{width:"30px"}}/>
            </a>

            <Modal title={"资质图片"}
                   visible={this.state.visible}
                   onCancel={this.handleCancel.bind(this)}
                   footer={null}>
                <img src={this.props.auditItem.imgUrl} style={{width:"100%"}} alt=""/>
            </Modal>
        </div>)
    }
}
module.exports = ShowAuditView;
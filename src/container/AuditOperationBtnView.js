/**
 * Created by LDQ on 2018/1/24
 */
import React, {Component} from 'react';
import { Input,Modal,Form ,Popconfirm,Switch} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import {observer,inject} from 'mobx-react';
@inject(['openShopContainer'])
@observer class AuditOperationBtnView extends Component{
    constructor(props){
        super(props);
        this.state = { visible: false };
    }
    setRemark(){
        this.showModal();

    }
    showModal(){
        this.setState({
            visible: true,
        });
    }
    setCustomerName(e){
        this.props.openShopContainer.setCustomerName(e.target.value);
    }
    setCustomerCode(e){
        this.props.openShopContainer.setCustomerCode(e.target.value);
    }
    handleOk(){
        this.handleCancel();
        this.props.openShopContainer.allowAudit(this.props.auditItem);
        this.props.openShopContainer.setRemark(this.props.auditItem.id);
    }
    handleCancel(){
        this.setState({
            visible: false,
        });
    }
    setCooperation(checked){
        this.props.openShopContainer.setCooperation(checked);
    }
    render(){
        return (
            <div>
                <Popconfirm title="是通过审核?"
                            onConfirm={this.setRemark.bind(this)}
                            okText="设置备注"
                            cancelText="取消">
                    <a style={{color:"#dd7c1e"}}>{this.props.auditItem.merchantStatus}</a>
                </Popconfirm>
                <Modal
                    title={"商户名："+this.props.auditItem.name}
                    visible={this.state.visible}
                    onCancel={this.handleCancel.bind(this)}
                    onOk={this.handleOk.bind(this)}
                    okText="通过"
                    cancelText="取消">
                    <Form>
                        <FormItem>
                            <span>是否设置为合作商户</span>
                            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.setCooperation.bind(this)}/>
                        </FormItem>
                        <FormItem>
                            <span>自定义商户别名</span>
                            <Input placeholder="设置商户别名" onBlur={this.setCustomerName.bind(this)} />
                        </FormItem>
                        <FormItem>
                            <span>自定义商户编号</span>
                            <Input placeholder="设置商户编号" onBlur={this.setCustomerCode.bind(this)} />
                        </FormItem>

                    </Form>

                </Modal>



            </div>
        )
    }
}
module.exports = AuditOperationBtnView;
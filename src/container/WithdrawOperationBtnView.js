/**
 * Created by LDQ on 2018/1/3
 */
import React, {Component} from 'react'
import { Input, InputNumber , Modal,Form ,Popconfirm} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import {observer,inject} from 'mobx-react';
@inject (['withdrawOrderContainer'])
@observer class WithdrawOperationBtnView extends Component{
    constructor(props){
        super(props);
        this.state = { visible: false };
    }
    showModal(){
        this.setState({
            visible: true,
        });
    }
    operateOrder(action){
        return ()=>{
            this.props.withdrawOrderContainer.clearWithdrawOrder();
            this.props.withdrawOrderContainer.setIsAllow(action);
            this.showModal();
        }
    }
    handleOk(){
        this.handleCancel();
        this.props.withdrawOrderContainer.operateOrder(this.props.orderItem);
    }
    handleCancel(){
        this.setState({
            visible: false,
        });
    }
    inputJournalAccountNum(e){
        this.props.withdrawOrderContainer.setJournalAccountNum(e.target.value);
    }
    inputRemarks(e){
        this.props.withdrawOrderContainer.setRemarks(e.target.value);
    }
    inputRealRmbMount(value){
        this.props.withdrawOrderContainer.setRealRmbMount(value);
    }
    render(){
        return(
            <div>
                {this.props.orderItem.status === "创建提现申请"?<Popconfirm
                    title="是否通过提现?"
                    onConfirm={this.operateOrder('allow').bind(this)}
                    onCancel={this.operateOrder('reject').bind(this)}
                    okText="通过"
                    cancelText="拒绝">
                    <a>{this.props.orderItem.status}</a>
                </Popconfirm>:<a>{this.props.orderItem.status}</a>}


                <Modal
                    title={"订单号："+this.props.orderItem.orderNo}
                    visible={this.state.visible}
                    onCancel={this.handleCancel.bind(this)}
                    onOk={this.handleOk.bind(this)}
                    okText="确定"
                    cancelText="我要后悔（取消）"
                >
                    {this.props.withdrawOrderContainer.isAllow === "allow"?<div>
                            <FormItem label="转账流水号">
                                <Input placeholder="转账流水号" onChange={this.inputJournalAccountNum.bind(this)}/>
                            </FormItem>
                            <FormItem label="转账金额">
                                <InputNumber
                                    defaultValue={this.props.orderItem.cashMount}
                                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                    max={this.props.orderItem.cashMount > this.props.orderItem.currentMount?this.props.orderItem.currentMount:this.props.orderItem.cashMount}
                                    onChange={this.inputRealRmbMount.bind(this)}
                                />
                                <span>账户余额：￥{this.props.orderItem.currentMount}</span>
                            </FormItem>
                    </div> :""}
                    <FormItem label="备注">
                        <TextArea
                            placeholder="备注"
                            autosize={{ minRows: 2, maxRows: 6 }}
                            onChange={this.inputRemarks.bind(this)}
                        />
                    </FormItem>
                </Modal>
            </div>

        )
    }
}
module.exports = WithdrawOperationBtnView;
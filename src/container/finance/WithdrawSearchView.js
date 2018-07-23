/**
 * Created by LDQ on 2018/7/20
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Tooltip , Button , Radio , Input , Cascader ,Form , Row, Col , DatePicker } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
import {data,actions} from '../../store/finance/withdrawSearchInterface';

import withdrawStyle from './css/withdrawStyle.css';
@observer class WithdrawSearchView extends Component{
    state = { queryStrategy: "all" };
    componentWillMount(){
        actions.selectQueryMsg({});
        actions.onLoad();
    }
    onChange(e){
        this.setState({ queryStrategy: e.target.value });
        actions.changeStatus(e.target.value);
        actions.queryByQueryInfo();
    }
    render(){
        const { queryStrategy } = this.state;
        return (
            <div>
                <WithdrawSearchListView />
                <Radio.Group value={queryStrategy} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"all"}>全部</Radio.Button>
                    <Radio.Button value={"waitWithdraw"}>提现申请</Radio.Button>
                    <Radio.Button value={"finish"}>提现完成</Radio.Button>
                </Radio.Group>
                <WithdrawListView />
            </div>

        )
    }
}
@observer class WithdrawSearchListView extends Component{
    render(){
        return (
            <Form>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem label={"账户查询"}>
                            <Search
                                placeholder="请输入用户手机号"
                                onSearch={value => {
                                    actions.selectQueryMsg({phoneNum:value});
                                    actions.queryByQueryInfo();
                                }}
                                enterButton
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={"店铺名称"}>
                            <Search
                                placeholder="请输入用店铺名称"
                                onSearch={value => {
                                    actions.selectQueryMsg({shopName:value});
                                    actions.queryByQueryInfo();
                                }}
                                enterButton
                            />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

@observer class WithdrawListView extends Component{
    changePage(pageNum){
        actions.changePage(pageNum)
    }
    render(){
        const columns = [
            {
                title:"创建时间",
                dataIndex:"createTime",
                key:"createTime",
                width:200
            }, {
                title:"订单号",
                dataIndex:"orderNo",
                key:"orderNo",
                width:200
            },{
                title:"店铺名称",
                dataIndex:"shopName",
                key:"shopName",
                width:150
            },{
                title:"商家电话",
                dataIndex:"shopPhone",
                key:"shopPhone",
                width:150
            },{
                title:"提现金额",
                dataIndex:"cashMount",
                key:"cashMount",
                width:100
            },{
                title:"银行卡号",
                dataIndex:"bankCardNo",
                key:"bankCardNo",
                width:200
            },{
                title:"开户行",
                dataIndex:"openAccountAddress",
                key:"openAccountAddress",
                width:200
            },{
                title:"持卡人姓名",
                dataIndex:"cardholderName",
                key:"cardholderName",
                width:130
            },{
                title:"审核时间",
                dataIndex:"finishTime",
                key:"finishTime",
                width:150
            },{
                title:"备注",
                dataIndex:"remark",
                key:"remark",
                width:130
            }

        ];
        const dataSource = [];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                createTime:item.createTime,
                orderNo:item.orderNo,
                cashMount:item.cashMount,
                currentMount:item.currentMount,
                realRmbMount:item.realRmbMount,
                merchantName:item.merchantName,
                bankName:item.bankName,
                openAccountAddress:item.openAccountAddress,
                bankCardNo:item.bankCardNo,
                status:item.status,
                finishTime:item.finishTime,
                merchantId:item.merchantId,
                orderId:item.orderId,
                accountId:item.accountId,
                shopAlias:item.shopAlias,
                shopName:item.shopName,
                shopPhone:item.shopPhone,
                address:item.address,
                remark:item.remark,
                cardholderName:item.cardholderName,
            })
        }
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{x:1630,y:600}}
                pagination={{current:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

module.exports = WithdrawSearchView;
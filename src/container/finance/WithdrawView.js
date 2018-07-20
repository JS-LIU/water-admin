/**
 * Created by LDQ on 2018/7/20
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Tooltip , Button , Radio , Input , Cascader ,Form , Row, Col , DatePicker } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
import {data,actions} from '../../store/finance/withdrawInterface';

import withdrawStyle from './css/withdrawStyle.css';

@observer class WithdrawView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <WithdrawListContainerView/>
                <WithdrawDetailView />
            </div>
        )
    }
}
@observer class WithdrawListContainerView extends Component{
    render(){
        return (
            <div>
                <WithdrawQueryView />
                <WithdrawListView />
            </div>
        )
    }
}

@observer class WithdrawQueryView extends Component{
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
                width:200
            }, {
                title:"商家电话",
                dataIndex:"shopPhone",
                key:"shopPhone",
                width:100
            },{
                title:"账户余额",
                dataIndex:"currentMount",
                key:"currentMount",
                width:100
            },{
                title:"提现金额",
                dataIndex:"cashMount",
                key:"cashMount",
                width:100
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
                scroll={{x:900,y:600}}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            actions.selectWithdrawItem(record.orderId);
                        },
                    };
                }}
                pagination={{current:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

@observer class WithdrawDetailView extends Component{
    render(){
        return (
            <div>
                <p className="withdraw_detail_title">提现详情</p>
                <div className="withdraw_detail_info">
                    <Form className="withdraw_detail_info_left">
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem label={"店铺名称"}>
                                    <span>{data.activeItem.shopName}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"店铺编号"}>
                                    <span>{data.activeItem.shopArtificialNum}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"联系电话"}>
                                    <span>{data.activeItem.shopPhone}</span>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <Form className="withdraw_detail_info_left">
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem label={"申请提现金额"}>
                                    <span>{data.activeItem.cashMount}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"持卡人"}>
                                    <span>{data.activeItem.cardholderName}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"卡号"}>
                                    <span>{data.activeItem.bankCardNo}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"银行名称"}>
                                    <span>{data.activeItem.bankName}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"开户支行"}>
                                    <span>{data.activeItem.openAccountAddress}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label={"备注"}>
                                    <Input type="text" onBlur={(value)=> actions.setRemark(value)}/>
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=> actions.allow()}>同意</Button>
                            </Col>
                            <Col span={4}>
                                <Button type="danger" onClick={() => actions.reject()}>拒绝</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

        )
    }
}
module.exports = WithdrawView;
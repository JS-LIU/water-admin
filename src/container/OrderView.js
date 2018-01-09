/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import QueryInfoView from './QueryInfoView';

import {observer,inject} from 'mobx-react';

@inject (['orderContainer'])
@inject (['shopOrderCondition'])
@observer class OrderView extends Component{
    componentWillMount(){
        this.props.orderContainer.getOrderInfo();
        this.props.shopOrderCondition.getShopOrderQueryInfo();
    }
    onChange(pageNumber){
        this.props.orderContainer.getOrderInfo(pageNumber,this.props.orderContainer.queryInfoMsg);
    }

    render(){
        return (
            <div>
                <QueryInfoView
                    queryCondition={this.props.shopOrderCondition.queryCondition}
                    searchAction={{search:()=>{
                            this.props.orderContainer.getOrderInfo(1)
                        }}}
                    table={this.props.orderContainer}
                    chineseChart={table}
                />
                <Table
                    columns={this.props.orderContainer.columns}
                    dataSource={this.props.orderContainer.dataSource}
                    bordered
                    pagination={false}
                    scroll={{x:true}}
                    style={{marginTop:30}}
                />
                <Pagination
                    onChange={this.onChange.bind(this)}
                    total={this.props.orderContainer.pagination.total}
                    defaultCurrent={1}
                    style={{marginTop:"10px",display:"flex",justifyContent:"flex-end"}}
                />
            </div>
        )
    }
}

module.exports = OrderView;



const table = {
    create:"未支付",
    waiting_dispatch:"待指派",
    delivery:"配送中",
    finish:"未评价",
    finish_comment:"已评价",
    WeixinPay:"微信客户端支付",
    AlipayClient:"支付宝",
    phoneNum:"用户电话",
    orderNo:"订单号码",
    shopName:"商店名称",
    orderStatus:"订单状态",
    payWay:"支付方式",
    CardTicket:"水票支付",
    WeixinJSPay:"公众号微信支付",
};


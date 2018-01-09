/**
 * Created by LDQ on 2017/1/3
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import QueryInfoView from './QueryInfoView';

import {observer,inject} from 'mobx-react';


@inject (['withdrawOrderContainer'])
@inject (['withdrawOrderCondition'])
@observer class WithdrawInfoView extends Component{
    componentWillMount(){
        this.props.withdrawOrderCondition.getWithdrawOrderQueryInfo();
        this.props.withdrawOrderContainer.getOrderInfo();
    }
    onChange(pageNumber){
        this.props.withdrawOrderContainer.getOrderInfo(pageNumber,this.props.withdrawOrderContainer.queryInfoMsg);
    }
    render(){
        return(
            <div>
                <QueryInfoView
                    queryCondition={this.props.withdrawOrderCondition.queryCondition}
                    searchAction={{search:()=>{
                            this.props.withdrawOrderContainer.getOrderInfo(1)
                        }}}
                    table={this.props.withdrawOrderContainer}
                    chineseChart={table}
                />
                <Table
                    columns={this.props.withdrawOrderContainer.columns}
                    dataSource={this.props.withdrawOrderContainer.dataSource}
                    bordered
                    pagination={false}
                    scroll={{x:true}}
                    style={{marginTop:30}}
                />
                <Pagination
                    onChange={this.onChange.bind(this)}
                    total={this.props.withdrawOrderContainer.pagination.total}
                    defaultCurrent={1}
                    style={{marginTop:"10px",display:"flex",justifyContent:"flex-end"}}
                />
            </div>
        )
    }
}
module.exports = WithdrawInfoView;

const table = {
    create:"未通过提现",
    finish:"已通过提现",
    orderNo:"订单号码",
    orderStatus:"提现状态",
    rejected:"拒绝提现",
    journalAccountNum:"流水账号"
};








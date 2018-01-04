/**
 * Created by LDQ on 2017/1/3
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';

import {observer,inject} from 'mobx-react';


@inject(['withdrawOrderContainer'])
@observer class WithdrawInfoView extends Component{
    componentWillMount(){
        this.props.withdrawOrderContainer.getOrderInfo();
    }
    render(){
        return(
            <Table
                columns={this.props.withdrawOrderContainer.columns}
                dataSource={this.props.withdrawOrderContainer.dataSource}
                bordered
                pagination={false}
                scroll={{x:true}}
                style={{marginTop:30}}
            />
        )
    }
}
module.exports = WithdrawInfoView;

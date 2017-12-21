/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import OrderQueryView from './OrderQueryView';

import {observer,inject} from 'mobx-react';

@inject (['order'])
@inject (['shopOrderCondition'])
@observer class OrderView extends Component{
    componentWillMount(){
        this.props.order.getOrderInfo();
        this.props.shopOrderCondition.getShopOrderQueryInfo();
    }
    onChange(pageNumber){
        this.props.order.getOrderInfo(pageNumber);
    }

    render(){
        return (
            <div>
                <div>
                    <OrderQueryView queryCondition={this.props.shopOrderCondition.queryCondition}/>
                </div>
                <Table
                    columns={this.props.order.columns}
                    dataSource={this.props.order.dataSource}
                    bordered
                    scroll={{x:"200%"}}
                    pagination={false}
                />
                <Pagination
                    onChange={this.onChange.bind(this)}
                    total={this.props.order.pagination.total}
                    defaultCurrent={1}
                />
            </div>
        )
    }
}




module.exports = OrderView;
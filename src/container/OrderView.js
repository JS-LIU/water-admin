/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import OrderQueryView from './OrderQueryView';

import {observer,inject} from 'mobx-react';

@inject (['order'])
@observer class OrderView extends Component{
    componentWillMount(){
        this.props.order.getOrderInfo();
    }
    onChange(pageNumber){
        // this.props.order.pagination.onChange(pageNumber);
        this.props.order.getOrderInfo(pageNumber);
    }

    render(){
        return (
            <div>
                <div>
                    <OrderQueryView />
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
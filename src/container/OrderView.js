/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import {observer,inject} from 'mobx-react';

@inject (['order'])
@observer class OrderView extends Component{
    componentWillMount(){
        this.props.order.getOrderInfo();
    }
    onChange(pageNumber){
        console.log(pageNumber)
    }

    render(){
        return (
            <div>
                <Table
                    columns={this.props.order.columns}
                    dataSource={this.props.order.dataSource}
                    bordered
                    scroll={{x:"200%"}}
                />
                <Pagination onChange={this.onChange.bind(this)} total={50} />
            </div>
        )
    }
}




module.exports = OrderView;
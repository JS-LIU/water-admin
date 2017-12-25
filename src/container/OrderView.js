/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import QueryInfoView from './QueryInfoView';

import {observer,inject} from 'mobx-react';

@inject (['order'])
@inject (['shopOrderCondition'])
@observer class OrderView extends Component{
    componentWillMount(){
        this.props.order.getOrderInfo();
        this.props.shopOrderCondition.getShopOrderQueryInfo();
    }
    onChange(pageNumber){
        this.props.order.getOrderInfo(pageNumber,this.props.order.queryInfoMsg);
    }

    render(){
        return (
            <div>
                <div>
                    <QueryInfoView
                        queryCondition={this.props.shopOrderCondition.queryCondition}
                        searchAction={{search:()=>{
                                this.props.order.getOrderInfo(1)
                            }}}
                        table={this.props.order}
                    />
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
                    style={{marginTop:"10px",display:"flex",justifyContent:"flex-end"}}
                />
            </div>
        )
    }
}




module.exports = OrderView;
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
                <div>
                    <QueryInfoView
                        queryCondition={this.props.shopOrderCondition.queryCondition}
                        searchAction={{search:()=>{
                                this.props.orderContainer.getOrderInfo(1)
                            }}}
                        table={this.props.orderContainer}
                    />
                </div>
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
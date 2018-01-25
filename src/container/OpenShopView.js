/**
 * Created by LDQ on 2018/1/24
 */

import React, {Component} from 'react'
import { Table,Pagination } from 'antd';

import {observer,inject} from 'mobx-react';

@inject (['openShopContainer'])
@observer class OpenShopView extends Component{
    componentWillMount(){
        this.props.openShopContainer.getAuditList(1);
    }
    onChange(pageNumber){
        this.props.orderContainer.getAuditList(pageNumber);
    }

    render(){
        return (
            <div>
                <Table
                    columns={this.props.openShopContainer.columns}
                    dataSource={this.props.openShopContainer.dataSource}
                    bordered
                    pagination={false}
                    scroll={{x:true}}
                    style={{marginTop:30}}
                    loading={this.props.openShopContainer.loading}
                />
                <Pagination
                    onChange={this.onChange.bind(this)}
                    total={this.props.openShopContainer.pagination.total}
                    defaultCurrent={1}
                    style={{marginTop:"10px",display:"flex",justifyContent:"flex-end"}}
                />
            </div>
        )
    }
}

module.exports = OpenShopView;
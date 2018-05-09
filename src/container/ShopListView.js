/**
 * Created by LDQ on 2018/4/23
 */
import React, {Component} from 'react'
import { Table,Pagination } from 'antd';
import QueryInfoView from './QueryInfoView';
import {observer,inject} from 'mobx-react';

@inject (['shopListContainer'])
@observer class ShopListView extends Component{
    componentWillMount(){
        this.props.shopListContainer.getShopList(1);
    }
    onChange(pageNumber){
        this.props.shopListContainer.getAuditList(pageNumber);
    }

    render(){
        return (
            <div>
                商铺列表
            </div>
        )
    }
}

module.exports = ShopListView;
/**
 * Created by LDQ on 2018/1/3
 */
import React, {Component} from 'react'
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import tableBuilder from './tableBuilder';

import Pagination from './Pagination';
import WithdrawOperationBtnView from '../container/WithdrawOperationBtnView';
class WithdrawOrderContainer{
    constructor(){
        let orderAjax = _h.ajax.resource('/admin/withdraw/:action');

        this._getOrderInfo = function (postInfo) {
            return orderAjax.save({action:'list'}, postInfo)
        };

        this._operateOrder = function(postInfo,action){
            return orderAjax.save({action:action},postInfo)
        };

        this._pagination = new Pagination(10);
        this.queryInfoMsg = {};

        this.columnConfig = {
            orderNo:"订单号",
            createTime:"提现时间",
            merchantName: "提现店铺",
            cashMount:"提现金额",
            currentMount:"账户余额",
        };
    }
    @observable _orderInfo = {content:[]};

    @observable _pagination;
    @computed get pagination(){
        return this._pagination;
    }
    @computed get columns (){
        if(this._orderInfo.content.length > 0){
            let title = this._orderInfo.content[0];
            return tableBuilder.convertToColumns(title,this.columnConfig,(list)=>{
                list.push({
                    key: 'operation',
                    title: '状态',
                    dataIndex: "operation",
                    width: 150,
                    fixed:"right"
                })
            });
        }
        return [];
    }
    @computed get dataSource(){
        return tableBuilder.convertToSource(this._orderInfo.content,(item)=>{
            item.operation = (()=>{
                return <WithdrawOperationBtnView orderItem={item}/>
            })()
        });
    }

    /**
     * 获取体现列表
     * @param pageNumber
     */
    @action getOrderInfo(pageNumber = 1){
        this._pagination.setPage(pageNumber);
        let msg = this.queryInfoMsg;
        let postInfo = Object.assign(this.pagination.info);

        this._getOrderInfo(postInfo).then((info)=>{
            this._orderInfo = info;
            this._pagination.setTotal(info.totalElements);
        });
    }
    /**
     * 通过提现申请
     * @param orderItem
     */
    @action operateOrder(action,orderItem){
        this._operateOrder({orderId:parseInt(orderItem.orderId)},action).then(()=>{

            let msg = this.queryInfoMsg;
            let postInfo = Object.assign(this.pagination.info);
            this._getOrderInfo(postInfo).then((info)=>{
                this._orderInfo = info;
                this._pagination.setTotal(info.totalElements);
            });

        }).catch(()=>{
            alert("找你强哥解决一下");
        })
    }
}
module.exports = WithdrawOrderContainer;

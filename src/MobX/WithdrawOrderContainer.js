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
            realRmbMount:"实际打款金额",
            accountId:"账户ID"
        };
    }
    @observable _orderInfo = {content:[]};
    @observable _isAllow;

    @action setIsAllow(action){
        this._isAllow = action;
    }
    @computed get isAllow(){
        return this._isAllow;
    }
    @observable _pagination;
    @observable _loading = false;
    @observable _remarks;
    @observable _journalAccountNum;
    @observable _realRmbMount = 0;
    @computed get pagination(){
        return this._pagination;
    }
    @computed get columns (){
        return tableBuilder.convertToColumns(this.columnConfig,(list)=>{
            list.push({
                key: 'operation',
                title: '状态',
                dataIndex: "operation",
                width: 150,
                fixed:"right"
            })
        });
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
        let postInfo = Object.assign(this.pagination.info,{
            queryInfoMsg:msg
        });
        this._loading = true;
        this._getOrderInfo(postInfo).then((info)=>{
            this._orderInfo = info;
            this._pagination.setTotal(info.totalElements);
            this._loading = false;
        }).catch(()=>{
            this._loading = true;
        });
    }

    /**
     * 通过提现申请
     * @param orderItem
     */
    @action operateOrder(orderItem){
        this._loading = true;
        this._operateOrder({
            orderId:parseInt(orderItem.orderId),
            remarks:this._remarks,
            journalAccountNum:this._journalAccountNum,
            realRmbMount:this._realRmbMount
        },this._isAllow).then(()=>{
            let msg = this.queryInfoMsg;
            let postInfo = Object.assign(this.pagination.info,{
                queryInfoMsg:msg
            });
            this._getOrderInfo(postInfo).then((info)=>{
                this._orderInfo = info;
                this._pagination.setTotal(info.totalElements);
                this._loading = false;
            });

        }).catch(()=>{
            this._loading = false;
            alert("找你强哥解决一下");
        })
    }
    @action setRemarks(remarks){
        this._remarks = remarks;
    }
    @action setRealRmbMount(realRmbMount){
        this._realRmbMount = realRmbMount;
    }
    @action setJournalAccountNum(journalAccountNum){
        this._journalAccountNum = journalAccountNum;
    }
    @action clearWithdrawOrder(){
        this._remarks = null;
        this._journalAccountNum = null;
    }
    @computed get journalAccountNum(){
        return this._journalAccountNum;
    }
    @computed get remarks(){
        return this._remarks;
    }
    @computed get realRmbMount(){
        return this._realRmbMount;
    }
    @computed get loading(){
        return this._loading;
    }

}
module.exports = WithdrawOrderContainer;

/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import tableBuilder from './tableBuilder';

import Pagination from './Pagination';
import DispatchButtonView from '../container/DispatchButtonView';
import OrderNoView from '../container/OrderNoView';



class OrderContainer{
    constructor(){
        let orderAjax = _h.ajax.resource('/admin/order/:action');

        this._getOrderInfo = function (postInfo) {
            return orderAjax.save({action:'list'}, postInfo)
        };

        this._startDelivery = function(postInfo){
            return orderAjax.save({action:"startDelivery"},postInfo)
        };
        this._setToTestOrder = function(postInfo){
            return orderAjax.save({action:"setToTestOrder"},postInfo)
        }.before((postInfo)=>{
            postInfo.password = "123";
        });
        this._pagination = new Pagination(10);
        this.queryInfoMsg = {};
        this.columnConfig = {
            receiver:"收货人姓名",
            userInfo:"用户手机号",
            shopName: "店铺名称",
            shopTelephone:"商家电话",
            shopAddress:"商家地址",
            payChannel:"付款方式",
            createTime:"购买时间",
            ticketUseNum:"水票抵用数量"
        };
    }
    @observable _orderInfo = {content:[]};
    @observable _loading = false;
    @observable _pagination;

    @action startDelivery(orderItem){
        this._loading = true;
        this._startDelivery({orderId:orderItem.orderId}).then(()=>{
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
            alert("派送失败");
        })
    }

    @action setToTestOrder(orderItem){
        this._loading = true;

        this._setToTestOrder({orderId:orderItem.orderId}).then(()=> {
            let msg = this.queryInfoMsg;
            let postInfo = Object.assign(this.pagination.info,{
                queryInfoMsg:msg
            });
            this._getOrderInfo(postInfo).then((info)=>{
                this._orderInfo = info;
                this._pagination.setTotal(info.totalElements);
                this._loading = false;
            })

        }).catch((data)=> {
            console.log("data:",data);
            this._loading = false;
            if(data.responseJSON.message === "没有权限"){
                alert(data.responseJSON.message);
            }else{
                alert("找强哥解决一下");
            }
        })
    }

    @action getOrderInfo(pageNumber = 1,orderSrc){
        this._pagination.setPage(pageNumber);
        let msg = this.queryInfoMsg;
        msg.orderSrc = orderSrc;
        let postInfo = Object.assign(this.pagination.info,{
            queryInfoMsg:msg
        });
        this._loading = true;
        this._getOrderInfo(postInfo).then((info)=>{
            this._orderInfo = info;
            this._pagination.setTotal(info.totalElements);
            this._loading = false;
        }).catch(()=>{
            this._loading = false;
            alert("找强哥解决一下");
        });
    }

    @computed get pagination(){
        return this._pagination;
    }
    @computed get columns () {
        return tableBuilder.convertToColumns(this.columnConfig, (list) => {
            list.push({
                key: 'operation',
                title: '状态',
                dataIndex: "operation",
                width: 100,
                fixed: "right"
            });
            list.unshift({
                key: "orderNo",
                title: "订单号码",
                dataIndex: "showContent",
                width: 185,
                fixed: "left"
            })
        });
    }

    @computed get dataSource(){
        return tableBuilder.convertToSource(this._orderInfo.content,(item)=>{
            item.operation = (()=>{
                return <DispatchButtonView orderItem={item}/>
            })();
            item.showContent = (()=>{
                return <OrderNoView orderItem={item} />
            })()
        });
    }
    @computed get loading(){
        return this._loading;
    }
}
module.exports = OrderContainer;

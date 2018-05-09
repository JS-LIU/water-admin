/**
 * Created by LDQ on 2018/4/23
 */

import React, {Component} from 'react'
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import tableBuilder from './tableBuilder';

import Pagination from './Pagination';
import DispatchButtonView from '../container/DispatchButtonView';
// import OrderNoView from '../container/OrderNoView';

class ShopListContainer{
    constructor(){
        let merchantAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getMerchantList = function (postInfo) {
            return merchantAjax.save({action:'shopList'}, postInfo)
        };
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
    @action getShopList(pageNumber = 1){
        this._pagination.setPage(pageNumber);
        let msg = this.queryInfoMsg;
        let postInfo = Object.assign(this.pagination.info,{
            queryInfoMsg:msg
        });
        this._loading = true;
        this._getMerchantList(postInfo).then((info)=>{
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
    @computed get loading(){
        return this._loading;
    }
}
module.exports = ShopListContainer;
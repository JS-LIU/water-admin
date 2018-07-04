/**
 * Created by LDQ on 2018/5/28
 */

import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';

let auditMerchantData = {
    @observable list:[],
    @observable detail:{serviceTel:[],shopDetailImg:[]},
    @observable pagination:{},
    @observable districtList:[]
};
function auditMerchantListAction(){
    let resetInitShopType = function(){
        changeMerchantType(null);
        merchantListContainer.selectShopType('waittingPermission');
    };
    let refresh = function(){
        merchantListContainer.getMerchantList().then((list)=>{
            auditMerchantData.list = list;
            auditMerchantData.pagination = merchantListContainer.pagination;
            merchantListContainer.setActiveItem(list[0]);
            return merchantListContainer.activeItem.getDetail()
        }).then((merchantDetail)=>{
            auditMerchantData.detail = merchantDetail;
        }).catch((errInfo)=>{
            auditMerchantData.detail = {serviceTel:[],shopDetailImg:[]};
            console.log(errInfo);
        });
    };
    let load = function(){
        merchantListContainer.pagination.setPage(1);
        refresh();
    };

    let changeMerchantType = function(merchantType){
        merchantListContainer.changeMerchantType(merchantType);
    };
    let selectRejectList = function(){
        merchantListContainer.selectShopType('rejectForPermission');
        load();
    };

    let selectAllowList = function(){
        merchantListContainer.selectShopType('waittingPermission');
        load();
    };
    let setQueryInfo = function(queryInfo){
        merchantListContainer.selectQueryMsg(queryInfo);
    };
    let queryByQueryInfo = function(){
        load();
    };
    let allow = function(){
        merchantListContainer.activeItem.allow().then(()=>{
            refresh();
        });
    };
    let notAllow = function(){
        merchantListContainer.activeItem.notAllow().then(()=>{
            refresh();
        });
    };
    let selectMerchant = function(shopId){
        let merchant = merchantListContainer.findItemByItemId(auditMerchantData.list,shopId,"shopId");
        merchantListContainer.setActiveItem(merchant);
        merchantListContainer.activeItem.getDetail().then((merchantDetail)=>{
            auditMerchantData.detail = merchantDetail;
        });
    };
    let changePage = function(pageNum){
        merchantListContainer.pagination.setPage(pageNum);
        refresh();
    };

    let createMerchant = function(merchantInfo){
        merchantListContainer.createMerchant(merchantInfo).then(()=>{
            resetInitShopType();
            load()
        })
    };
    let setShopPic = function(url){
        // merchantListContainer.activeItem.
    };
    let addMerchantShop = function(){
        merchantListContainer.newMerchant();
    };

    return {
        resetInitShopType:resetInitShopType,
        //  初始化页面
        onLoad:load.before(resetInitShopType),
        //  拒绝开店列表
        selectRejectList:selectRejectList,
        //  待审核店铺列表
        selectAllowList:selectAllowList,
        //  设置查询条件
        setQueryInfo:setQueryInfo,
        //  根据设置的查询条件查询
        queryByQueryInfo:queryByQueryInfo,
        //  通过审核
        allow:allow,
        //  拒绝审核
        notAllow:notAllow,
        //  选择店铺
        selectMerchant:selectMerchant,
        changePage:changePage,
        changeMerchantType:changeMerchantType,
        autoComplete:autoComplete,
        //  创建店铺
        createMerchant:createMerchant,
        //  设置店铺图片
        setShopPic:setShopPic,
        addMerchantShop:addMerchantShop,
    }
}
module.exports = {actions:auditMerchantListAction(),data:auditMerchantData};

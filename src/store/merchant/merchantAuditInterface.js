/**
 * Created by LDQ on 2018/5/28
 */

import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';

let auditMerchantData = {
    @observable list:[],
    @observable detail:{serviceTel:[],shopDetailImg:[]},
    @observable pagination:{},
    @observable districtList:[],
    @observable appendingAddress:""
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

    let addMerchantShop = function(){
        merchantListContainer.newMerchant();
    };
    let setShopName = function(name){
        merchantListContainer.activeItem.setShopName(name);
    };
    let setShopDetailImage = function(url){
        merchantListContainer.activeItem.setShopDetailImage([url]);
    };
    let setShopHeaderImg = function(url){
        merchantListContainer.activeItem.setShopHeaderImg(url);
    };
    let setStartTime = function(time){
        merchantListContainer.activeItem.setStartTime(time);
    };
    let setEndTime = function(time){
        merchantListContainer.activeItem.setEndTime(time);
    };
    let setDeliveryRange = function(range){
        merchantListContainer.activeItem.setDeliveryRange(range);
    };
    let setAppendingAddress = function(appendingAddress){
        merchantListContainer.activeItem.setAppendingAddress(appendingAddress);
        console.log(appendingAddress);
        auditMerchantData.appendingAddress = appendingAddress
    };
    let setDeliveryMoney = function(money){
        merchantListContainer.activeItem.setDeliveryMoney(money);
    };
    let setIntroduce = function(introduce){
        merchantListContainer.activeItem.setIntroduce(introduce);
    };
    let setShopType = function(type){
        merchantListContainer.activeItem.setShopType(type);
    };
    let setManagerTel = function(tel){
        merchantListContainer.activeItem.managerTel(tel);
    };
    let setServiceTel = function(telList){
        merchantListContainer.activeItem.setServiceTel([telList]);
    };
    let inputMappingAddress = function(address){
        merchantListContainer.activeItem.inputMappingAddress(address).then((list)=>{
            auditMerchantData.districtList = list;
            console.log(list);
        });
    };
    let selectAddress = function(location){
        _setLatitude(location.lat);
        _setLongitude(location.lng);
        _setMappingAddress(location.district);
        setAppendingAddress(location.name);
    };
    let _setLatitude = function(latitude){
        return merchantListContainer.activeItem.setLatitude(latitude);
    };
    let _setLongitude = function(longitude){
        return merchantListContainer.activeItem.setLongitude(longitude);
    };
    let _setMappingAddress = function(address){
        return merchantListContainer.activeItem.setMappingAddress(address);
    };
    let createMerchant = function(){
        merchantListContainer.createMerchant().then(()=>{
            resetInitShopType();
            load()
        })
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
        //  创建店铺
        createMerchant:createMerchant,
        setShopName:setShopName,
        //  设置店铺图片
        setShopDetailImage:setShopDetailImage,
        setShopHeaderImg:setShopHeaderImg,
        setStartTime:setStartTime,
        setEndTime:setEndTime,
        setDeliveryRange:setDeliveryRange,
        setAppendingAddress:setAppendingAddress,
        setDeliveryMoney:setDeliveryMoney,
        setIntroduce:setIntroduce,
        setShopType:setShopType,
        setManagerTel:setManagerTel,
        setServiceTel:setServiceTel,
        inputMappingAddress:inputMappingAddress,
        addMerchantShop:addMerchantShop,
        selectAddress:selectAddress,
    }
}
module.exports = {actions:auditMerchantListAction(),data:auditMerchantData};

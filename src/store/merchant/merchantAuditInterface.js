/**
 * Created by LDQ on 2018/5/28
 */

import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';

let auditMerchantData = {
    @observable list:[],
    @observable detail:{},
    @observable activeMerchant:{},
};
function auditMerchantListAction(){
    let load = function(){
        merchantListContainer.pagination.setPage(1);
        merchantListContainer.getMerchantList().then((list)=>{
            auditMerchantData.list = list;
            merchantListContainer.selectMerchant(auditMerchantData.list[0]);
            auditMerchantData.activeMerchant = merchantListContainer.activeMerchant;
            merchantListContainer.activeMerchant.getDetail().then((merchantDetail)=>{
                auditMerchantData.detail = merchantDetail;
            });
        })
    };

    let selectRejectList = function(){
        merchantListContainer.selectShopType('rejectForPermission');
        load();
    };

    let selectAllowList = function(){
        merchantListContainer.selectShopType('waittingPermission');
        load();
    };
    let loadMore = function(){
        merchantListContainer.pagination.nextPage();
        merchantListContainer.getMerchantList().then((list)=>{
            auditMerchantData.list.concat(list);
        });
    };
    let setQueryInfo = function(queryInfo){
        merchantListContainer.selectQueryMsg(queryInfo);
    };
    let queryByQueryInfo = function(){
        load();
    };
    let allow = function(){
        merchantListContainer.activeMerchant.allow().then(()=>{
            merchantListContainer.removeMerchant(auditMerchantData.list,merchantListContainer.activeMerchant);
        });
    };
    let notAllow = function(){
        merchantListContainer.activeMerchant.notAllow().then(()=>{
            merchantListContainer.removeMerchant(auditMerchantData.list,merchantListContainer.activeMerchant);
        });
    };
    let selectMerchant = function(merchant){
        merchantListContainer.selectMerchant(merchant);
        auditMerchantData.activeMerchant = merchantListContainer.activeMerchant;
        merchantListContainer.activeMerchant.getDetail().then((merchantDetail)=>{
            auditMerchantData.detail = merchantDetail;
        });
    };
    let changePage = function(pageNum){
        merchantListContainer.pagination.setPage(pageNum);
        merchantListContainer.getMerchantList().then((list)=>{
            auditMerchantData.list = list;
            merchantListContainer.selectMerchant(auditMerchantData.list[0]);
            auditMerchantData.activeMerchant = merchantListContainer.activeMerchant;
            merchantListContainer.activeMerchant.getDetail().then((merchantDetail)=>{
                auditMerchantData.detail = merchantDetail;
            });
        })
    };
    return {
        //  初始化页面
        onLoad:load,
        //  拒绝开店列表
        selectRejectList:selectRejectList,
        //  待审核店铺列表
        selectAllowList:selectAllowList,
        //  加载更多
        loadMore:loadMore,
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
        changePage:changePage
    }
}
module.exports = {actions:auditMerchantListAction(),data:auditMerchantData};

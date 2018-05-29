/**
 * Created by LDQ on 2018/5/28
 */

import {observable, computed, action, autorun} from "mobx";
import auditMerchantListContainer from './AuditMerchantListContainer';

let auditMerchantData = {
    @observable list:[],
    @observable detail:{},
    @observable activeMerchant:{},
};
function auditMerchantListAction(){
    let load = function(){
        auditMerchantListContainer.pagination.setPage(1);
        auditMerchantListContainer.getAuditMerchantList().then(()=>{
            auditMerchantData.list = auditMerchantListContainer.auditMerchantList;

            auditMerchantListContainer.selectMerchant(auditMerchantListContainer.auditMerchantList[0]);
            auditMerchantData.activeMerchant = auditMerchantListContainer.activeAuditMerchant;
            auditMerchantListContainer.activeAuditMerchant.getDetail().then((merchantDetail)=>{
                auditMerchantData.detail = merchantDetail;
            });
        })
    };

    let selectRejectList = function(){
        auditMerchantListContainer.selectShopType('rejectForPermission');
        load();
    };

    let selectAllowList = function(){
        auditMerchantListContainer.selectShopType('waittingPermission');
        load();
    };
    let loadMore = function(){
        auditMerchantListContainer.pagination.nextPage();
        auditMerchantListContainer.getAuditMerchantList().then(()=>{
            auditMerchantData.list = auditMerchantListContainer.auditMerchantList;
        });
    };
    let setQueryInfo = function(queryInfo){
        auditMerchantListContainer.selectQueryMsg(queryInfo);
    };
    let queryByQueryInfo = function(){
        auditMerchantListContainer.pagination.setPage(1);
        auditMerchantListContainer.getAuditMerchantList().then(()=>{
            auditMerchantListContainer.selectMerchant(auditMerchantListContainer.auditMerchantList[0]);
            auditMerchantListContainer.activeAuditMerchant.getDetail();
        })
    };
    let allow = function(){
        auditMerchantListContainer.activeAuditMerchant.allow().then(()=>{
            auditMerchantListContainer.removeActiveMerchant();
            auditMerchantData.list = auditMerchantListContainer.auditMerchantList;
        });
    };
    let notAllow = function(){
        auditMerchantListContainer.activeAuditMerchant.notAllow().then(()=>{
            auditMerchantListContainer.removeActiveMerchant();
            auditMerchantData.list = auditMerchantListContainer.auditMerchantList;
        });
    };
    let selectMerchant = function(merchant){
        auditMerchantListContainer.selectMerchant(merchant);
        auditMerchantData.activeMerchant = auditMerchantListContainer.activeAuditMerchant;
        auditMerchantListContainer.activeAuditMerchant.getDetail();
        auditMerchantData.detail = auditMerchantListContainer.activeAuditMerchant.merchantDetail;
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
        selectMerchant:selectMerchant
    }
}
module.exports = {actions:auditMerchantListAction(),data:auditMerchantData};

/**
 * Created by LDQ on 2018/5/30
 */

import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';
let merchantSearchData = {
    @observable list:[],
    @observable totalPage:0

};

function merchantSearchAction(){
    merchantListContainer.changeMerchantType('personal');
    let load = function(){
        merchantListContainer.selectShopType("passStatus");
        merchantListContainer.pagination.setPage(1);
        merchantListContainer.getMerchantList().then((list)=>{
            merchantSearchData.list = list;
            merchantSearchData.totalPage = merchantListContainer.pagination.total;
        });
    };
    let closeMerchant = function(merchantId){
        let merchant = merchantListContainer.findMerchantById(merchantSearchData.list,merchantId);
        merchant.close().then(()=>{
            merchantSearchData.list = merchantListContainer.removeMerchant(merchantSearchData.list,merchant);
        })

    };
    let toTop = function(merchantId){
        let merchant = merchantListContainer.findMerchantById(merchantSearchData.list,merchantId);
        merchant.toTop().then(()=>{
            merchantSearchData.list = merchantListContainer.reSort(merchantSearchData.list,merchant,'toTop');
        })
    };
    let loadMore = function(){
        merchantListContainer.getMerchantList().then((list)=>{
            merchantSearchData.list.concat(list);
        })
    };
    let updateMerchantNum = function(merchantId,merchantNum){
        let merchant = merchantListContainer.findMerchantById(merchantSearchData.list,merchantId);
        merchant.updateMerchantNum(merchantNum);
    };
    let changePage = function(pageNum){
        merchantListContainer.pagination.setPage(pageNum);
        merchantListContainer.getMerchantList().then((list)=>{
            merchantSearchData.list = list;
        });
    };
    let getPersonalList = function(){
        merchantListContainer.changeMerchantType('personal');
        load();
    };
    let getCorporateList = function(){
        merchantListContainer.changeMerchantType('corporate');
        load();
    };
    let setQueryInfo = function(queryMsg){
        merchantListContainer.selectQueryMsg(queryMsg);
    };
    let queryByQueryInfo = function(){
        load();
    };
    return {
        //  加载列表
        onLoad:load,
        //  关闭店铺
        closeMerchant:closeMerchant,
        //  置顶店铺
        toTop:toTop,
        //  修改商户号
        updateMerchantNum:updateMerchantNum,
        //  换页
        changePage:changePage,
        //  获取公司商铺列表
        getCorporateList:getCorporateList,
        //  获取个人商铺列表
        getPersonalList:getPersonalList,
        setQueryInfo:setQueryInfo,
        queryByQueryInfo:queryByQueryInfo

    }
}
module.exports = {data:merchantSearchData,actions:merchantSearchAction()};

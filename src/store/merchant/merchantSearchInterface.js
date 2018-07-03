/**
 * Created by LDQ on 2018/5/30
 */

import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';
let merchantSearchData = {
    @observable list:[],
    @observable pagination:{}

};

function merchantSearchAction(){
    let _getList = function(){
        merchantListContainer.getMerchantList().then((list)=>{
            merchantSearchData.list = list;
            merchantSearchData.pagination = merchantListContainer.pagination;
        })
    };
    let load = function(){
        merchantListContainer.selectShopType("passStatus");
        merchantListContainer.pagination.setPage(1);
        _getList()
    };
    let closeMerchant = function(shopId){
        let merchant = merchantListContainer.findItemByItemId(merchantSearchData.list,shopId,"shopId");
        merchant.close().then(()=>{
            _getList();
        })

    };
    let toTop = function(shopId){
        let merchant = merchantListContainer.findItemByItemId(merchantSearchData.list,shopId,"shopId");
        merchant.toTop().then(()=>{
            _getList();
        })
    };
    let updateMerchantNum = function(shopId,merchantNum){
        let merchant = merchantListContainer.findItemByItemId(merchantSearchData.list,shopId,"shopId");
        merchant.updateMerchantNum(merchantNum);
    };
    let changePage = function(pageNum){
        merchantListContainer.pagination.setPage(pageNum);
        _getList();
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
    let resetInitQueryInfo = function(){
        merchantListContainer.selectQueryMsg({});
        merchantListContainer.selectShopType("passStatus");
        merchantListContainer.changeMerchantType('personal');
    };
    return {
        //  重置查询条件
        resetInitQueryInfo:resetInitQueryInfo,
        //  加载列表
        onLoad:load.before(resetInitQueryInfo),
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

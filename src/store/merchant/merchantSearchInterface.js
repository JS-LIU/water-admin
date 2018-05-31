/**
 * Created by LDQ on 2018/5/30
 */

import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';
let merchantSearchData = {
    @observable list:[],


};

function merchantSearchAction(){
    let load = function(){
        merchantListContainer.selectShopType("passStatus");
        merchantListContainer.pagination.setPage(1);
        merchantListContainer.getMerchantList().then((list)=>{
            merchantSearchData.list = list;
        });
    };
    let closeMerchant = function(merchant){
        merchant.close().then(()=>{
            merchantListContainer.removeMerchant(merchant);
            merchantSearchData.list = merchantListContainer.merchantList;
        })

    };
    let toTop = function(merchant){
        merchant.toTop().then(()=>{
            merchantListContainer.reSort(merchant,'toTop');
            merchantSearchData.list = merchantListContainer.merchantList;
        })
    };
    let loadMore = function(){
        merchantListContainer.getMerchantList().then((list)=>{
            merchantSearchData.list.concat(list);
        })
    };

    return {
        //  加在列表
        onLoad:load,
        //  关闭店铺
        closeMerchant:closeMerchant,
        //  置顶店铺
        toTop:toTop,
        //  加载更多
        loadMore:loadMore
    }
}
module.exports = {data:merchantSearchData,actions:merchantSearchAction()};

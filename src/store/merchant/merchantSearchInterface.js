/**
 * Created by LDQ on 2018/5/30
 */

import {observable, computed, action, autorun} from "mobx";
import merchantManageShopList from './MerchantManageShopList';
let merchantSearchData = {
    @observable list:[],


};

function merchantSearchAction(){
    let load = function(){
        merchantManageShopList.getMerchantManageList().then((list)=>{
            merchantSearchData.list = list;


        });
    };
    let closeMerchant = function(merchant){
        merchant.close().then(()=>{
            merchantManageShopList.removeMerchant(merchant);
            merchantSearchData.list = merchantManageShopList.merchantManageList;
        })

    };
    let toTop = function(merchant){
        merchant.toTop().then(()=>{
            merchantManageShopList.reSort(merchant,'toTop');
            merchantSearchData.list = merchantManageShopList.merchantManageList;
        })
    };
    let loadMore = function(){
        merchantManageShopList.getMerchantManageList().then((list)=>{
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

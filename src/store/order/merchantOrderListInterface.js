/**
 * Created by LDQ on 2018/6/1
 */

import {observable, computed, action, autorun} from "mobx";
import merchantOrderList from './MerchantOrderList';
import nearStoreList from './NearStoreList';

let merchantOrderListData = {
    @observable list:[],
    @observable detail:{deliveryAddressModel:{address:{},position:{}},
        productItemModels:[]},
    @observable nearStore:[],
    @observable activeOrder:{},
    @observable pagination:{}
};

function merchantOrderListActions(){
    let load = function(){
        merchantOrderList.pagination.setPage(1);
        merchantOrderList.getOrderList().then((list)=>{
            merchantOrderListData.list = list;
            merchantOrderListData.pagination = merchantOrderList.pagination;
            merchantOrderList.setActiveItem(list[0]);
            merchantOrderListData.activeOrder = merchantOrderList.activeItem;
            return merchantOrderList.activeItem.getDetail()


        }).then((detail)=>{
            merchantOrderListData.detail = detail;
            return merchantOrderListData.activeOrder.getNearStore()
        }).then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };
    let selectMerchantOrder = function(orderId){
        let order = merchantOrderList.findItemByItemId(merchantOrderListData.list,orderId,"orderId");
        merchantOrderList.setActiveItem(order);
        merchantOrderList.activeItem.getDetail().then((detail)=>{
            merchantOrderListData.detail = detail;
        });
        merchantOrderListData.activeOrder.getNearStore().then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };
    let dispatchOrder = function(shopId){
        let merchant = nearStoreList.findMerchantById(shopId);
        merchantOrderList.dispatchOrder(merchant).then(()=>{
            return merchantOrderList.getOrderList()
        }).then((list)=>{
            merchantOrderListData.list = list;
            merchantOrderListData.pagination = merchantOrderList.pagination;
            merchantOrderList.setActiveItem(list[0]);
            merchantOrderListData.activeOrder = merchantOrderList.activeItem;
            return merchantOrderList.activeItem.getDetail()
        }).then((detail)=>{
            merchantOrderListData.detail = detail;
            return merchantOrderListData.activeOrder.getNearStore()
        }).then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };
    let queryByQueryInfo = function(){
        load();
    };
    let setQueryInfo = function(queryInfo){
        merchantOrderList.selectQueryMsg(queryInfo);
    };

    let changePagination = function(page){
        merchantOrderList.pagination.setPage(page);
        merchantOrderList.getOrderList().then((list)=>{
            merchantOrderListData.list = list;
            merchantOrderListData.pagination = merchantOrderList.pagination;
            merchantOrderList.setActiveItem(list[0]);
            merchantOrderListData.activeOrder = merchantOrderList.activeItem;
            return merchantOrderList.activeItem.getDetail()


        }).then((detail)=>{
            merchantOrderListData.detail = detail;
            return merchantOrderListData.activeOrder.getNearStore()
        }).then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };

    return {
        onLoad:load,
        selectMerchantOrder:selectMerchantOrder,
        dispatchOrder:dispatchOrder,
        queryByQueryInfo:queryByQueryInfo,
        setQueryInfo:setQueryInfo,
        changePagination:changePagination
    }
}
module.exports = {data:merchantOrderListData,actions:merchantOrderListActions()};